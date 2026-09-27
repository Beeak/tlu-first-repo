const http = require("http");
//moodul paringu parsimiseks
const url = require("url");
//moodul failitee haldamiseks
const path = require("path");
//moodul failide haldamiseks
// const fs = require("fs");, ASYNC puhul on vaja erilisemat moodulit
const fs = require("fs").promises;
const dateTimeET = require("./src/dateTimeET");
const folkWisdom = require("./src/folkWisdom");

const pageHead =
  '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Henry Kalvi Kaalma, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody =
  '\t<h1>Henry Kalvi Kaalma, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>\n';
const pageBanner = '<img src="/img/veebiprogrammeerimine_2026_TA.png" alt="">';
const pageFoot = "\n</body>\n</html>";
const logo = '<img src="/img/TLU-logo.jpg" alt="">';

http
  .createServer(async function (req, res) {
    //parsin url-i
    console.log("Paring: " + req.url);
    let currentURL = url.parse(req.url, true);
    console.log("Parsitult" + currentURL.pathname);

    //hakkame erinevaid lehti jaotama -> routes

    if (
      currentURL.pathname.endsWith(".jpg") ||
      currentURL.pathname === "/img/veebiprogrammeerimine_2026_TA.png"
    ) {
      let imgPath = path.join(
        __dirname,
        "img",
        path.basename(currentURL.pathname),
      );
      try {
        const data = await fs.readFile(imgPath);
        const contentType = currentURL.pathname.endsWith(".jpg")
          ? "image/jpeg"
          : "image/png";
        res.writeHead(200, { "Content-Type": contentType });
        return res.end(data);
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Pilti ei leitud.");
      }
    } else if (currentURL.pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(pageHead);
      res.write(pageBanner);
      res.write(pageBody);

      const weekDay = dateTimeET.fullDay();
      const date = dateTimeET.fullDate(Math.round());
      const time = dateTimeET.fullTime();

      res.write(
        "\t<p>Leht avati: " +
          weekDay +
          ", " +
          date +
          " kell on " +
          time +
          "</p>\n",
      );

      res.write(
        '\n\t<ul>\n\t\t<li><a href="/vanasona">Tänane vanasõna</a></li>',
      );
      res.write('\n\t\n\t\t<li><a href="/info">Info minu kohta</a></li></ul>');

      res.write(pageFoot);
      // res.write("Veeb läkski käima!");
      return res.end();
    } else if (currentURL.pathname === "/vanasona") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(pageHead);
      res.write(pageBanner);

      res.write(
        "\t<h1>Eesti vanasonad</h1>\n\t<p>Siin naed tanase paeva vanasonu.</p>\n\t",
      );

      res.write("\t<p>Sinu vanasõna: " + (await folkWisdom.wisdom()));

      res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');

      res.write(logo);
      res.write(pageFoot);
      return res.end();
    } else if (currentURL.pathname === "/info") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(pageHead);
      res.write(pageBanner);

      res.write(
        "\t<h1>Miks tulin TLÜsse?</h1>\n\t<p>Sellepärast, et soovisin enda programmeerimis ja muid IT oskuseid edasi arendada.</p>\n\t",
      );
      res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');

      res.write(logo);
      res.write(pageFoot);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Viga 404, ei leia sellist lehte!");
    }
  })
  .listen(5021);
