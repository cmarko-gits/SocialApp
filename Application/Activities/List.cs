using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Domain; // Proveri da li je ovo tačan namespace za Activity model
using Persistence;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger _logger;

            public Handler(DataContext context , ILogger<List> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {

                return await _context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
