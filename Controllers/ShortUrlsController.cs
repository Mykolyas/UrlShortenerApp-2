using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrlShortenerApp_2.Data;
using UrlShortenerApp_2.Models;


[Route("api/[controller]")]
[ApiController]
public class ShortUrlsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public ShortUrlsController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    // GET: /api/shorturls
    [HttpGet]
    public async Task<IActionResult> GetUrls()
    {
        var urls = await _context.ShortUrls
            .Select(u => new { u.Id, u.OriginalUrl, u.ShortCode, u.CreatedAt })
            .ToListAsync();

        return Ok(urls);
    }

    // POST: /api/shorturls
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] string originalUrl)
    {
        var userId = _userManager.GetUserId(User);

        // Duplication check
        if (await _context.ShortUrls.AnyAsync(u => u.OriginalUrl == originalUrl))
            return BadRequest("This URL already exists.");

        var shortCode = GenerateShortCode();

        var shortUrl = new ShortUrl
        {
            OriginalUrl = originalUrl,
            ShortCode = shortCode,
            CreatedByUserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        _context.ShortUrls.Add(shortUrl);
        await _context.SaveChangesAsync();

        return Ok(shortUrl);
    }

    // DELETE: /api/shorturls/5
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = _userManager.GetUserId(User);
        var url = await _context.ShortUrls.FindAsync(id);

        if (url == null)
            return NotFound();

        if (url.CreatedByUserId != userId && !User.IsInRole("Admin"))
            return Forbid();

        _context.ShortUrls.Remove(url);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: /api/shorturls/5
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetById(int id)
    {
        var url = await _context.ShortUrls
            .Where(u => u.Id == id)
            .Select(u => new { u.OriginalUrl, u.ShortCode, u.CreatedAt, u.CreatedByUserId })
            .FirstOrDefaultAsync();

        return url == null ? NotFound() : Ok(url);
    }

    [HttpGet("{shortCode}")]
    public async Task<IActionResult> RedirectToOriginalUrl(string shortCode)
    {
        var entity = await _context.ShortUrls.FirstOrDefaultAsync(x => x.ShortCode == shortCode);
        if (entity == null)
            return NotFound();

        return Redirect(entity.OriginalUrl);
    }

    private string GenerateShortCode()
    {
        return Guid.NewGuid().ToString().Substring(0, 6);
    }
}
