const http = require("http");
const dateTimeET = require("./src/dateTimeET")

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Henry Kalvi Kaalma, veebiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Henry Kalvi Kaalma, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sisalda tõsiseltvõetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>\n';
const pageFoot = '\n</body>\n</html>';

http.createServer(function(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(pageHead);
    res.write(pageBody);

    const weekDay = dateTimeET.fullDay();
    const date = dateTimeET.fullDate(Math.round()); 
    const time = dateTimeET.fullTime();

    res.write('\t<p>Leht avati: ' + weekDay + ', ' + date + ' kell on ' + time + '</p>\n');

    res.write(pageFoot);
    // res.write("Veeb läkski käima!");
    return res.end();
}).listen(5021);
   