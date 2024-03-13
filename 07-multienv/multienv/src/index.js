const settings = require("../config/settings")
const axios = require("axios")
const cheerio = require("cheerio")
const { dynamoDB } = require("./factory")
const { randomUUID } = require("node:crypto")

class Handler {
  static async main(event) {
    const { data } = await axios.get(settings.CommitMessagesUrl)
    const $ = cheerio.load(data)
    const [commitMessage] = await $('#content').text().trim().split('\n')
    console.log(typeof commitMessage)
    const params = {
      TableName: settings.TableName,
      Item: {
        commitMessage,
        createdAt: new Date().toISOString(),
        id: randomUUID()
      }
    }
    console.log(typeof params.Item.id)
    await dynamoDB.put(params).promise()
    console.log('process finisehd at', new Date().toISOString())

    return {
      statusCode: 200
    }
  }
}

module.exports = {
  hello: Handler.main
}
