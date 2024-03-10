# Criar arquivo de políticas de segurança
# Associar a role a nossa lambda

ROLE_NAME=lambda-example
NODEJS_VERSION=nodejs16.x
FUNCTION_NAME=hello-cli
POLICY_ARN=policy

mkdir -p logs

aws iam create-role \
  --role-name $ROLE_NAME \
  --assume-role-policy-document file://policies.json \
  | tee logs/1.role.log

# Criar o arquivo
# zipar o projeto

zip function.zip index.js

aws lambda create-function \
      --function-name $FUNCTION_NAME \
      --zip-file fileb://function.zip \
      --handler index.handle \
      --runtime $NODEJS_VERSION \
      --role $POLICY_ARN \
      | tee logs/2.lambda-create.log

#chamar a lambda
aws lambda invoke \
    --function-name $FUNCTION_NAME logs/3.lambda-exec \
    --log-type Tail \
    --query 'LogResult' \
    --output text | base64 -d

#update function 

zip function.zip index.js

aws lambda update-function-code \
    --function-name $FUNCTION_NAME \
    --zip-file fileb://function.zip \
    --publish \
    | tee logs/4.lambda-update.log

$chamando novamente

aws lambda invoke \
    --function-name $FUNCTION_NAME logs/5.lambda-exec-update.log \
    --log-type Tail \
    --query 'LogResult' \
    --cli-binary-format raw-in-base64-out \
    --payload '{"name": "danilo tambara"}' \
    --output text | base64 -d

#deletar lambda

  aws lambda delete-function \
  --function-name $FUNCTION_NAME \
  | tee logs/6.lambda-rm.log

#deletar role

  aws iam delete-role \
    --role-name $ROLE_NAME