// function dateFormattedET() {
const dateFormattedET = function(trad) {
  let timeNow = new Date();
  if (trad) {
    const monthNamesET = [
      "näärikuu",
      "küünlakuu",
      "paastukuu",
      "jürikuu",
      "lehekuu",
      "jaanikuu",
      "heinakuu",
      "lõikuskuu",
      "mihklikuu",
      "viinakuu",
      "talvekuu",
      "jõulukuu"
    ];
    return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
  } else {
    const monthNamesET = [
      "jaanuar",
      "veebruar",
      "märts",
      "aprill",
      "mai",
      "juuni",
      "juuli",
      "august",
      "september",
      "oktoober",
      "november",
      "detsember",
    ];
    return timeNow.getDate() + ". " + monthNamesET[timeNow.getMonth()] + " " + timeNow.getFullYear();
  }
}

const timeFormattedET = function() {
  let timeNow = new Date();
  let hourNow = timeNow.getHours();
  let minuteNow = timeNow.getMinutes();
  let secondNow = timeNow.getSeconds();
  if (hourNow < 10) {
    hourNow = "0" + hourNow;
  }
  if (minuteNow < 10) {
    minuteNow = "0" + minuteNow;
  }
  if (secondNow < 10) {
    secondNow = "0" + secondNow;
  }
  let timeFormatted = hourNow + ":" + minuteNow + ":" + secondNow;
  return timeFormatted;
}

const weekDayFormattedET = function() {
  let weekDay = new Date().getDay();
  const weekDayNamesET = [
    "pühapäev",
    "esmaspäev",
    "teisipäev",
    "kolmapäev",
    "neljapäev",
    "reede",
    "laupäev",
  ];
  return weekDayNamesET[weekDay];
}

// ekspordin kõik vajaliku
module.exports = {fullDate: dateFormattedET, fullDay: weekDayFormattedET, fullTime: timeFormattedET}