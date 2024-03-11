/* eslint-disable no-undef */
const {
  describe,
  it,
  expect
} = require('@jest/globals')

const aws = require('aws-sdk')
aws.config.update({
  region: 'us-east-1'
})

const requestMock = require('../mocks/request.json')
const {
  main
} = require('../../src')

describe('Image analyser test suite', () => {
  it('should analyse successfuly the image returning the results', async () => {

    const finalText = [
      "99.76% de ser do tipo Animal",
      "99.76% de ser do tipo canino",
      "99.76% de ser do tipo cão",
      "99.76% de ser do tipo pastor alemão",
      "99.76% de ser do tipo mamífero",
      "99.76% de ser do tipo animal de estimação"
    ].join('\n')
    const expected = {
      statusCode: 200,
      body: "A imagem tem\n".concat(finalText)
    }
    const result = await main(requestMock)
    expect(result).toStrictEqual(expected)
  })
  
  it('given an empty queryString it should return status code 400', async () => {
    const expected = {
      statusCode: 400,
      body: 'an IMG is required!'
    }

    const result = await main({queryStringParameters: {}})
    expect(result).toStrictEqual(expected)
  })

  it('given an invalid ImageRUL it should return 500', async () => {
    const expected = {
      statusCode: 500,
      body: 'Internal Server Error!'
    }

    const result = await main({queryStringParameters: {
      imageUrl: "test"
    }})

    expect(result).toStrictEqual(expected)
  })
})