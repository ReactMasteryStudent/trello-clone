using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Database.Managers;
using WebApi.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkspaceController : ControllerBase
{
    private readonly ILogger<WorkspaceController> _logger;
    private readonly WorkspaceManager _workspaceManager;

    public WorkspaceController(ILogger<WorkspaceController> logger, WorkspaceManager workspaceManager)
    {
        _logger = logger;
        _workspaceManager = workspaceManager;
    }


    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_workspaceManager.Workspace());
    }

    [HttpPatch]
    public IActionResult Update([FromBody]Workspace workspace)
    {
        if(_workspaceManager.Exists(workspace))
        {
            var updatedWorkspace = _workspaceManager.Update(workspace);
            return updatedWorkspace is not null ? Ok(updatedWorkspace) : BadRequest();
        }
        return NotFound();
    }
}
