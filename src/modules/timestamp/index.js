const express = require('express')
const router = express.Router()

const {getController} = require('./controllers/get')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

router.get("/:date",getController)

router.get("/",(req,res) => {
  res.redirect(301,'/api/'+Date.now().toString())
})

module.exports = router