using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrlShortenerApp_2.Data;

public class RedirectController : Controller
{
    private readonly ApplicationDbContext _context;

    public RedirectController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("/{shortCode}")]
    public async Task<IActionResult> Index(string shortCode)
    {
        var entity = await _context.ShortUrls.FirstOrDefaultAsync(x => x.ShortCode == shortCode);
        if (entity == null)
            return NotFound();

        return Redirect(entity.OriginalUrl);
    }
}
