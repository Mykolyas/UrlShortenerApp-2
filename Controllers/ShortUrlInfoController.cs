using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrlShortenerApp_2.Data;
using UrlShortenerApp_2.Models;

[Authorize]
public class ShortUrlInfoController : Controller
{
    private readonly ApplicationDbContext _context;

    public ShortUrlInfoController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var urls = _context.ShortUrls
            .Include(u => u.CreatedBy)
            .Select(u => new ShortUrlInfoViewModel
            {
                Id = u.Id,
                ShortCode = u.ShortCode,
                OriginalUrl = u.OriginalUrl,
                CreatedBy = u.CreatedBy.UserName,
                CreatedDate = u.CreatedAt
            })
            .ToList();

        return View(urls);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Delete(int id)
    {
        var url = _context.ShortUrls
            .Include(u => u.CreatedBy)
            .FirstOrDefault(u => u.Id == id);

        if (url == null) return NotFound();
        if (User.IsInRole("Admin") || url.CreatedBy.UserName == User.Identity.Name)
        {
            _context.ShortUrls.Remove(url);
            _context.SaveChanges();
        }

        return RedirectToAction(nameof(Index));
    }
}