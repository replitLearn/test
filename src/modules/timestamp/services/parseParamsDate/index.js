const { parseTimeStampToDate } = require('../../../../functions/parseTimestampToDate')

const parseParamsDate = (date) => {
  const parsedDate = parseTimeStampToDate(date);
  if (parsedDate.toString() === "Invalid Date"){
    throw new Error("Invalid Date");
  }
  return {"unix":Date.parse(parsedDate.toString()), "utc":parsedDate.toUTCString()};
}

module.exports = {parseParamsDate}
