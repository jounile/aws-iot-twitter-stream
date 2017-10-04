#!/bin/bash -e

STACK_NAME="jouni-iot-demo-stack"
ARTIFACTS_BUCKET="jouni-iot-artifacts"

rm -rf node_modules/

aws cloudformation delete-stack --stack-name $STACK_NAME

aws s3 rb s3://$ARTFACTS_BUCKET --force
