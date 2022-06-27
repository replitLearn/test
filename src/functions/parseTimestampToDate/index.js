
const parseTimeStampToDate = (timestampString) => {
  if (/\D/.test(timestampString)){
    return new Date(timestampString);
  }
  else {
    const parsedUnix = parseInt(timestampString);
    return new Date(parsedUnix);
  }
}

module.exports = {parseTimeStampToDate}