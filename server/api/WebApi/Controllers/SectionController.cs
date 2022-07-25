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
    private readonly BoardManager _boardManager;

    public SectionController(ILogger<SectionController> logger,
                             SectionManager sectionManager,
                             BoardManager boardManager)
    {
        _logger = logger;
        _sectionManager = sectionManager;
        _boardManager = boardManager;
    }

    [HttpPost("{boardId}")]
    public IActionResult Add(int boardId, [FromBody]Section section)
    {
        if(_boardManager.Exists(boardId))
        {
            var addedSection = _sectionManager.Add(boardId, section);
            return addedSection is not null ? Ok(addedSection) : BadRequest();
        }
        return BadRequest();
    }

    [HttpPatch]
    public IActionResult Update([FromBody]Section section)
    {
        if(_sectionManager.Exists(section.Id))
        {
            var updatedSection = _sectionManager.Update(section);
            return updatedSection is not null ? Ok(updatedSection) : BadRequest();
        }
        return BadRequest();
    }

    [HttpDelete("{sectionId}")]
    public IActionResult Delete(int sectionId)
    {
        if(_sectionManager.Exists(sectionId))
        {
            return _sectionManager.Delete(sectionId) ? Ok() : BadRequest();
        }
        return BadRequest();
    }
}
