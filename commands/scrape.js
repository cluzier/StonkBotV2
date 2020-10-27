module.exports = {
  name: "uoa",
  description: "Shows user unusual options activity",
  execute(message) {
    const fs = require("fs");
    const cheerio = require("cheerio");
    const got = require("got");

    const vgmUrl = "https://www.barchart.com/options/unusual-activity/stocks";

    got(vgmUrl)
      .then((response) => {
        const $ = cheerio.load(response.body);
        console.log($("span"));
        message.author.send($("span"));
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
