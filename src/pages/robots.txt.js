import dedent from 'dedent'
import siteInfo from '../consts.ts'

export function GET() {
  // https://docs.astro.build/en/guides/integrations-guide/sitemap/
  const sitemap = new URL('/sitemap.xml', siteInfo.siteBase)
  const robotsTxt = dedent`
    #
    # robots.txt ( https://www.robotstxt.org/robotstxt.html )
    #

    User-agent: python-requests
    Disallow: /
    User-agent: Scrapy
    Disallow: /
    User-agent: Java
    Disallow: /

    # Anthropic Claude
    # https://darkvisitors.com/agents/anthropic-ai
    User-agent: anthropic-ai
    Disallow: /

    # Amazon
    User-agent: Amazonbot
    Disallow: /

    # Apple
    User-Agent: Applebot
    Disallow: /

    # Common Crawl
    User-agent: CCBot
    Disallow: /

    # Cohere
    User-agent: cohere-ai
    Disallow: /

    # Discord
    User-agent: Discordbot
    Disallow: /

    # Google Bard
    User-agent: Google-Extended
    Disallow: /

    # Google Bots
    # https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers
    User-agent: Googlebot
    User-agent: Googlebot-mobile
    User-agent: Googlebot-Image
    User-agent: Googlebot-News
    User-agent: Googlebot-Video
    User-agent: AdsBot-Google
    User-agent: AdsBot-Google-Mobile
    User-Agent: AdsBot-Google-Mobile-Apps
    User-agent: Mediapartners
    User-agent: Mediapartners-Google
    Disallow: /

    # OpenAI
    User-agent: GPTBot
    Disallow: /
    User-agent: ChatGPT-User
    Disallow: /

    # Meta
    User-Agent: FacebookBot
    Disallow: /
    User-agent: facebookexternalhit
    Disallow: /

    # Microsoft
    User-agent: Bingbot
    Disallow: /
    User-agent: LinkedInBot
    Disallow: /

    # webz.io
    User-agent: Omgilibot
    Disallow: /
    User-agent: Omgili
    Disallow: /

    # Pinterest
    User-Agent: Pinterestbot
    Disallow: /

    # Telegram
    User-agent: TelegramBot
    Disallow: /

    # X(formerly "Twitter")
    User-agent: Twitterbot
    Disallow: /

    # Yandex
    User-agent: Yandex
    Disallow: /

    # zh-hans
    User-agent: 360Spider
    User-agent: Baiduspider
    User-agent: BaiduSpider-ads
    User-agent: ByteSpider
    User-agent: HaosouSpider
    User-agent: HaosoSpider
    User-agent: PetalBot
    User-agent: Sogouspider
    User-agent: Sogou blog
    User-agent: Sogou inst spider
    User-agent: Sogou News Spider
    User-agent: Sogou Orion Spider
    User-agent: Sogou spider2
    User-agent: Sogou web spider
    User-agent: Sogou wap spider
    User-agent: ToutiaoSpider
    User-agent: Yisouspider
    Disallow: /

    # Disallow everything.
    User-agent: *
    Disallow: /

    # DuckDuckGo
    User-agent: DuckDuckBot
    Disallow:
    Allow: /*

    # Wait 500 seconds between successive requests.
    Crawl-delay: 500

    # Sitemap: ${sitemap.href}

    # Credits:
    # https://neil-clarke.com/block-the-bots-that-feed-ai-models-by-scraping-your-website/
  `

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
