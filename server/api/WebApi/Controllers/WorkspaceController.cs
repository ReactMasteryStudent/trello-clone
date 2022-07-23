using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Database;
using WebApi.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkspaceController : ControllerBase
{
    private readonly ILogger<WorkspaceController> _logger;
    private readonly Manager _manager;

    public WorkspaceController(ILogger<WorkspaceController> logger, Manager manager)
    {
        _logger = logger;
        _manager = manager;
    }


    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_manager.Workspace());
    }

    [HttpPatch]
    public IActionResult Update([FromBody]Workspace workspace)
    {
        if(_manager.Exists(workspace))
        {
            return _manager.Update(workspace) ? Ok() : NotFound();
        }
        return NotFound();
    }
}
