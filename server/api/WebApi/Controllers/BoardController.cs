using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Database.Managers;
using WebApi.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BoardController : ControllerBase
{
    private readonly ILogger<BoardController> _logger;
    private readonly BoardManager _boardManager;

    public BoardController(ILogger<BoardController> logger, BoardManager boardManager)
    {
        _logger = logger;
        _boardManager = boardManager;
    }

    [HttpPost]
    public IActionResult Add([FromBody]Board board)
    {
        var addedBoard = _boardManager.Add(board);
        return addedBoard is not null ? Ok(addedBoard) : BadRequest();
    }

    [HttpPatch]
    public IActionResult Update([FromBody]Board board)
    {
        if(_boardManager.Exists(board.Id))
        {
            var updatedBoard = _boardManager.Update(board);
            return updatedBoard is not null ? Ok(updatedBoard) : BadRequest();
        }
        return BadRequest();
    }

    [HttpDelete("{boardId}")]
    public IActionResult Delete(int boardId)
    {
        if(_boardManager.Exists(boardId))
        {
            return _boardManager.Delete(boardId) ? Ok() : BadRequest();
        }
        return BadRequest();
    }
}
