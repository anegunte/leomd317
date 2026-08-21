# SEO launch checklist

The app publishes the following technical SEO endpoints after deployment:

- `https://leomd317.in/robots.txt`
- `https://leomd317.in/sitemap.xml`
- `https://leomd317.in/manifest.webmanifest`
- `https://leomd317.in/opengraph-image`

It also supplies canonical URLs, per-page titles and descriptions, Open Graph/Twitter previews, `Organization` and `WebSite` JSON-LD, and `Event` JSON-LD for real upcoming events.

## Required launch actions

1. In Google Search Console, add a **Domain property** for `leomd317.in`.
2. Verify ownership by adding the Google-provided TXT record at Hostinger. This is usually a record with name `@` and a value beginning `google-site-verification=`. Keep existing DNS records unchanged.
3. Submit `https://leomd317.in/sitemap.xml` in Search Console.
4. Use Search Console's URL Inspection tool to request indexing for the home page, About, Directory, Impact, Events, Media, Reports, and ISAME pages.
5. Repeat the sitemap submission in Bing Webmaster Tools.

## Content that earns search visibility

Technical setup makes the site crawlable; rankings require useful, original public content. Publish confirmed event details, real service-project summaries, outcome numbers, locations, photos with meaningful alt text, and post-event recaps. Obtain legitimate links from club, district, Lions, partner, venue, and college websites.

Do not keyword-stuff or describe the organisation as an NGO unless that is its verified legal classification. The site accurately targets Leo youth leadership, volunteer work, community service, Lions-supported activities, and regional service projects.

## Ongoing checks

- Keep the canonical domain as `https://leomd317.in`; Caddy should continue redirecting `www` to it.
- Ensure `robots.txt` and `sitemap.xml` return HTTP 200 after every deployment.
- Validate structured data with Google's Rich Results Test when a new event is published.
- Monitor Search Console Coverage, Page Experience, and Core Web Vitals monthly.
