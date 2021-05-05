function getSeason() {
  let season = "";
  switch (new Date().getMonth()) {
    case 0:
    case 1:
    case 11:
      season = "winter";
      break;
    case 2:
    case 3:
    case 4:
      season = "spring";
      break;
    case 5:
    case 6:
    case 7:
      season = "summer";
      break;
    case 8:
    case 9:
    case 10:
      season = "fall";
    default:
      "season";
  }
  return season;
}

const checkSeason = (season) => {
  if (season === getSeason()) {
    return true;
  } else return false;
};

module.exports = { getSeason, checkSeason };
