using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain; // Referenca na domen
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> // Vraćamo kreirani objekat
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>{

             public CommandValidator(){

                 RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());

             }

        }

        public class Handler : IRequestHandler<Command, Result<Unit>> // Očekujemo povratni tip Activity
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

          public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
{
    // Ensure that the activity has a unique ID
    request.Activity.Id = Guid.NewGuid(); 

    _context.Activities.Add(request.Activity);

    var result = await _context.SaveChangesAsync(cancellationToken) > 0;

    if (!result) return Result<Unit>.Failure("Failed to create activity");

    return Result<Unit>.Success(Unit.Value);
}

        }
    }
}
