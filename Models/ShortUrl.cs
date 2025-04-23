using Microsoft.AspNetCore.Identity;

public class ShortUrl
{
    public int Id { get; set; }
    public string OriginalUrl { get; set; }
    public string ShortCode { get; set; }
    public string? CreatedByUserId { get; set; }
    public DateTime CreatedAt { get; set; }

    public IdentityUser CreatedBy { get; set; }
}
