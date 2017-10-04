# AWS IoT Twitter stream

---

## Developer computer

Deploy IoT service and DynamoDB table with other resources

```sh
$ ./deploy.sh
```

---

## Raspberry Pi

SSH into you Raspberry Pi (requires Avahi daemon)

```sh
$ ssh raspberrypi.local
```

Clone repo into Raspi and install dependencies

```sh
$ git clone git@github.com:jounile/aws-iot-twitter-stream.git
$ cd aws-iot-twitter-stream/raspberrypi
$ npm install
```

Download certificates

```sh
$ aws s3 cp s3://my-certs-bucket ./certs/ --recursive
```

Start fetching tweets

```sh
$ node publish.js
```
