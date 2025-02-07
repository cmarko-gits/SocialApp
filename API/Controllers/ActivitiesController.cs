using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
      

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct){
            return await Mediator.Send(new List.Query() , ct);
        }
          
            [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var createdActivity = await Mediator.Send(new Create.Command { Activity = activity });

            return Ok(createdActivity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id , Activity activity){

            activity.Id = id;
            await Mediator.Send(new Edit.Command{Activity = activity});
            
            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteActivity(Guid Id){

            await Mediator.Send(new Delete.Command{Id = Id});
            return Ok();

        }
    }
}