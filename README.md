# AWS IoT Twitter stream

---

# Developer computer

## Deploy IoT service and DynamoDB table with other resources

$ ./deploy.sh

---

# Raspberry Pi

## SSH into you Raspberry Pi (requires Avahi daemon)

ssh raspberrypi.local

## Install dependencies

$ npm install

## Download certificates

$ aws s3 cp s3://my-certs-bucket ./certs/ --recursive

## Start fetching tweets

$ node publish.js
