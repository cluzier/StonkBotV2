module.exports = {
  name: "scrape",
  description: "Shows user unusual options activity",
  async execute(message) {
    const request = require("request-promise");
    const cheerio = require("cheerio");
    const Url = "https://www.marketbeat.com/market-data/unusual-call-options-volume/";

    const result = await request.get({
      uri: Url,
      headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'max-age=0',
          'Connection': 'keep-alive',
          'Host': 'www.marketbeat.com',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36'
      },
      gzip: true
  });
    const $ = cheerio.load(result);
    $('#cphPrimaryContent_pnlUpdate > div.scroll-table-wrapper-wrapper > div > table > tbody > tr > td > a > div.ticker-area').each((index, element) => {
      console.log($(element).text());
      message.channel.send($(element).text());
    });
  },
};
