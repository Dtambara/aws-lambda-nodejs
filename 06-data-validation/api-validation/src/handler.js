const Joi = require('@hapi/joi')

const { randomUUID } = require('node:crypto')

class Handler {
  constructor({ dynamoDBSvc }) {
    this.dynamoDBSvc = dynamoDBSvc
    this.dynamoTable = 'Heroes'
  }

  static validator() {
    return Joi.object({
      name: Joi.string().max(100).min(2).required(),
      power: Joi.string().max(20).min(2).required()
    })
  }

  async main(event) {
    const data = event.body
    const params = this.prepareData(event.body)
    await this.dynamoDBSvc.put(params).promise()

    const insertedItem = await this.dynamoDBSvc.query({
      TableName: 'Heroes',
      ExpressionAttributeValues: {
        ':id': params.Item.id
      },
      KeyConditionExpression: 'id = :id'
    }).promise()

     return {
       statusCode: 200,
       body: insertedItem,
     };
  }


  prepareData(data) {
    return {
      TableName: this.dynamoTable,
      Item: {
        ...data,
        id: randomUUID(),
        createdAt: new Date().toISOString()
      }
    }
  }
}

module.exports = Handler
