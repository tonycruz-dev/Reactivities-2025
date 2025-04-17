﻿using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<ActivityDto>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivityDetail(string id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }));
    }
    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }));
    }

    //[HttpPut]
    //public async Task<ActionResult> EditActivity(EditActivityDto activity)
    //{
    //    return HandleResult(await Mediator.Send(new EditActivity.Command { ActivityDto = activity })); ;
    //}
    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> EditActivity(string id, Activity activity)
    {
        activity.Id = id;
        return HandleResult(await Mediator.Send(new EditActivity.Command { Activity = activity }));
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }
    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(string id)
    {
        return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
}
