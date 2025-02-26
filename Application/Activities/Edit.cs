using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Load the existing activity along with its attendees and their associated AppUser
                var activity = await _context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(att => att.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Activity.Id, cancellationToken);

                if (activity == null)
                    return Result<Unit>.Failure("Activity not found");

                // Update scalar properties of the activity
                activity.Title = request.Activity.Title;
                activity.Description = request.Activity.Description;
                activity.Category = request.Activity.Category;
                activity.Date = new DateTime(request.Activity.Date.Ticks); // Ensure date is a DateTime object
                activity.City = request.Activity.City;
                activity.Venue = request.Activity.Venue;
                activity.IsCancelled = request.Activity.IsCancelled;

                // Iterate over attendees to ensure their primary key (AppUserId) is set
                if (activity.Attendees != null)
                {
                    foreach (var attendee in activity.Attendees)
                    {
                        if (string.IsNullOrEmpty(attendee.AppUserId) && attendee.AppUser != null)
                        {
                            attendee.AppUserId = attendee.AppUser.Id;
                        }
                    }
                }

                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                return result
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem updating activity");
            }
        }
    }
}
