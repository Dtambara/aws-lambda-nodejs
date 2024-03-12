//fn é o main
//schema é a validacao
//argtype pode ser body, queryString...
const decoratorValidator = (fn, schema, argType) => {
  return async function (event) {
    const data = event[argType]
    const { error, value } = schema.validate(
      data,
      {
        //mostra todos os erros na tela
        abortEarly: false
      }
    )
    //faz com que o event.body já venha como objeto
    // isso tambem altera o arguments(transformando o body)
    event[argType] = value
    if(!error) return fn.apply(this, arguments)

    return {
      statusCode: 422,
      body: error.message
    }
  }
}

module.exports = {
  decoratorValidator
}
