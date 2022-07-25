using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Database.Managers;
using WebApi.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SectionController : ControllerBase
{
    private readonly ILogger<SectionController> _logger;
    private readonly SectionManager _sectionManager;

    public SectionController(ILogger<SectionController> logger, SectionManager sectionManager)
    {
        _logger = logger;
        _sectionManager = sectionManager;
    }

    [HttpPost("{boardId}")]
    public IActionResult Add(int boardId, [FromBody]Section section)
    {
        var addedSection = _sectionManager.Add(boardId, section);
        return addedSection is not null ? Ok(addedSection) : BadRequest();
    }

    [HttpPatch]
    public IActionResult Update([FromBody]Section section)
    {
        var updatedSection = _sectionManager.Update(section);
        return updatedSection is not null ? Ok(updatedSection) : BadRequest();
    }

    [HttpDelete("{sectionId}")]
    public IActionResult Delete(int sectionId)
    {
        return _sectionManager.Delete(sectionId) ? Ok() : BadRequest();
    }
}
