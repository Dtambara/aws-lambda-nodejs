const aws = require('aws-sdk')
const Handler = require('./handler')

const rekoSvc = new aws.Rekognition()
const translatorSvc = new aws.Translate()

const handler = new Handler({
  rekoSvc,
  translatorSvc
})

module.exports = handler.main.bind(handler)