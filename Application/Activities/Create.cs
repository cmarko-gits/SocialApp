using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Domain; // Referenca na domen
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Activity> // Vraćamo kreirani objekat
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Activity> // Očekujemo povratni tip Activity
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync(cancellationToken);

                return request.Activity; // Vraćamo novu aktivnost
            }
        }
    }
}
