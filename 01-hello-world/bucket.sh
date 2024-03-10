#criar bucket
aws s3api create-bucket --bucket dt-hello-bucket

#copiar arquivo para o bucket
aws s3 cp text.txt s3://dt-hello-bucket/text.txt

#copia arquivo do bucket para pasta local
aws s3 cp s3://dt-hello-bucket/text.txt text.txt 

#limpar bucket
aws s3 rm s3://dt-hello-bucket --recursive

#excluir bucket
aws s3api delete-bucket --bucket dt-hello-bucket