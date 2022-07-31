using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApi.Database.Managers;
using WebApi.Models;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardController : ControllerBase
{
    private readonly ILogger<CardController> _logger;
    private readonly CardManager _cardManager;
    private readonly SectionManager _sectionManager;

    public CardController(ILogger<CardController> logger,
                          CardManager cardManager,
                          SectionManager sectionManager)
    {
        _logger = logger;
        _cardManager = cardManager;
        _sectionManager = sectionManager;
    }

    [HttpPost("{sectionId}")]
    public IActionResult Add(int sectionId, [FromBody]Card card)
    {
        if(_sectionManager.Exists(sectionId))
        {
            var addedCard = _cardManager.Add(sectionId, card);
            return addedCard is not null ? Ok(addedCard) : BadRequest();
        }
        return BadRequest();
    }

    [HttpPatch("{newSectionId?}")]
    public IActionResult Update([FromBody]Card card, int? newSectionId)
    {
        if(_cardManager.Exists(card.Id))
        {
            var updatedCard = _cardManager.Update(card, newSectionId);
            return updatedCard is not null ? Ok(updatedCard) : BadRequest();
        }
        return BadRequest();
    }

    [HttpDelete("{cardId}")]
    public IActionResult Delete(int cardId)
    {
        return _cardManager.Delete(cardId) ? Ok() : BadRequest();
    }
}
