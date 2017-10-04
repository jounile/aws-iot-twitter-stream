#!/bin/bash -e

REGION="eu-central-1"
STACK_NAME="jouni-iot-demo-stack"
ARTIFACT_BUCKET_NAME="jouni-iot-artifacts"

rm -rf node_modules/
npm install --production
aws s3 mb s3://$ARTIFACTS_BUCKET_NAME --region $REGION
aws cloudformation package --template-file template.yml --output-template-file template.tmp.yml --s3-bucket "$ARTIFACTS_BUCKET_NAME"
aws cloudformation deploy --template-file template.tmp.yml --stack-name $STACK_NAME --capabilities CAPABILITY_IAM
