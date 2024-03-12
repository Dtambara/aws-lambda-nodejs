const { dynamoDB } = require("./factory");
const Handler = require('./handler');
const { decoratorValidator } = require("./util");


const handler = new Handler({
  dynamoDBSvc: dynamoDB
})

const heroesTrigger = async (event) => {
 console.log("***event", event)
 
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

const heroesInsert = decoratorValidator(
  handler.main.bind(handler),//o .bind garante que a variavel this seja o conteudo do handler
  Handler.validator(),
  'body'
)

module.exports = {
  heroesTrigger,
  heroesInsert
}
