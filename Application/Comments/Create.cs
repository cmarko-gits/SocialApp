using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain; // Pretpostavljam da Comment postoji u Domain
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>> // Ispravljeno: Result<Unit>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>> // Ispravljeno: Result<Unit>
        {

            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context , IMapper mapper , IUserAccessor userAccessor)
            {
                _context =  context;
                _mapper = mapper;
                _userAccessor = userAccessor;
             }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var acitivity = await _context.Activities.FindAsync(request.ActivityId);

                if(acitivity == null) return null;
                var user = await _context.Users
                                .Include(p=>p.Photos)
                                .SingleOrDefaultAsync(u=>u.UserName == _userAccessor.GetUsername());
           

                var comment = new Comment{
                    Author = user ,
                    Activity = acitivity,
                    Body = request.Body
                };

                acitivity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0 ;

                if(success) return Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
           
                return Result<CommentDto>.Failure("Failed to add comment");            }
        }
    }
}
