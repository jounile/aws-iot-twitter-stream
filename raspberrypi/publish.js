// https://github.com/aws/aws-iot-device-sdk-js
var awsIot = require('aws-iot-device-sdk');

var device = awsIot.device({
	keyPath: __dirname + '/certs/RaspberryPi1.private.key',
	certPath: __dirname + '/certs/RaspberryPi1.cert.pem',
	caPath: __dirname + '/certs/root-CA.crt',
	clientId: 'RaspberryPi1',
	host: 'something.iot.eu-central-1.amazonaws.com',
	region: 'eu-central-1'
});

// https://www.bitpi.co/2015/02/13/live-twitter-stream-using-raspberry-pi-and-nodejs/
var Twit = require('twit')

var T = new Twit({
	consumer_key:         'something',
	consumer_secret:      'something',
	access_token:         'something',
	access_token_secret:  'something'
})


// Device is an instance returned by mqtt.Client(), see mqtt.js for full documentation.
device
.on('connect', function() {
	console.log('Device is connected to AWS IoT');

	// Stream of twees from a specific user
	//var stream = T.stream('statuses/filter', { follow: '1083314617' });

	// Stream of tweets with a hashtag and keyword
	var stream = T.stream('statuses/filter', { track: ['#serverless', 'serverless'] });

	stream.on('tweet', function (tweet) {

		// Retrieve current time
		var date = new Date();
		var time = date.getTime();
		console.log('Date: ' + date + ' Time: ' + time);
		//console.log(tweet.text + ' (' + tweet.user.screen_name  + ')');
		//console.log(JSON.stringify(tweet, null, '\t'));

		// Filter tweets that start with characters RT (retweet)
		var text = tweet.text;
		if(!text.startsWith('RT')){

			// Publish tweet to AWS IoT and store to DynamoDB
			device.publish('topic1', JSON.stringify({ id: date + '-' + time,
				user: tweet.user.screen_name,
				lang: tweet.user.lang,
				location: tweet.user.location,
				timezone: tweet.user.time_zone,
				message: tweet.text }));
			console.log('Device published to AWS IoT topic1.');
		}
	});

});
