using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Domain;
using Persistence;
using Microsoft.Extensions.Logging;
using Application.Core;
using API.DTOs;

using AutoMapper;
using AutoMapper.QueryableExtensions;
using Application.Interfaces;
using System.Xml.Linq;
namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>> {
            public ActivityParams Params {get;set;}
         }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper; 
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context , IMapper mapper , IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;

            }

            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  _context.Activities.OrderBy(d=>d.Date)
                .Where(d=>d.Date >= request.Params.StartDate)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
          
                new {currentUsername = _userAccessor.GetUsername()})
                .AsQueryable();

                if(request.Params.IsGoing && !request.Params.IsHost){
                    query = query.Where(x=>x.Attendees.Any(a=>a.Username==_userAccessor.GetUsername()));
                }

                if(request.Params.IsHost && !request.Params.IsGoing){
                    query = query.Where(x=>x.HostUsername == _userAccessor.GetUsername());
                }

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query,request.Params.PageNumber,request.Params.PageSize)
                );
            }

        

        }
    }

    

}
