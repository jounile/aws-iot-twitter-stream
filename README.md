# AWS IoT Twitter stream

## Install dependencies

$ npm install

## Download certificates

$ aws s3 cp s3://my-certs-bucket ./certs/ --recursive

## Start fetching tweets

$ node publish.js
