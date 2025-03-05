using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Domain;
using MediatR;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.Core;
using Application.Profiles;

namespace API.Controllers
{
    [AllowAnonymous]
   public class ActivitiesController : BaseApiController
    {

        [HttpGet]
public async Task<ActionResult> GetActivities([FromQuery] ActivityParams param)
{
    return HandlePageResult(await Mediator.Send(new List.Query { Params = param }));
}

        [Authorize(Policy = "IsActivityHost")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {

            return HandleResult(await Mediator.Send(new Detail.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {

            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id , Activity activity){

            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edits.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteActivity(Guid Id){

           
            return HandleResult( await Mediator.Send(new Delete.Command{Id = Id}));

        }
        [HttpPost("{id}/attend")]
        public async Task<ActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }

    }
}