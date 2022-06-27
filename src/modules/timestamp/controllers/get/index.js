const {parseParamsDate} = require('../../services/parseParamsDate')

const getController = (req,res) => {
  console.log('Timestamp request')
  const date = req.params.date
  console.log(date)
  try {
    const timestamp = parseParamsDate(date);
    res.json(timestamp);
  } catch (e) {
    res.status(400).json({error:e.message})
  }
}

module.exports = {getController}