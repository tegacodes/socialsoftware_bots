console.log('The replier bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('user');

// Anytime there is a tweet event, call the tweetEvent function
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {  //gets data called eventMsg which
  //is json data of a tweet to us.

  //Uncomment if you want to write to a file.
  // var fs = require('fs');
  // var json = JSON. stringify(eventMsg, null, 2);
  // fs.writeFile(“tweet.json”, json);

  var replyto = eventMsg.in_reply_to_screen_name; //get screen name of account mentioned
  var text = eventMsg.text; //get text from tweet
  var from = eventMsg.user.screen_name;  //get user's screen name

  console.log(replyto+' '+from);

  if(replyto=== 'a2zitp'){ //if tweet was to us
    var newTweet = '@ + 'from + ' hello!';
    tweetIt(newtweet); //tweet a new thing.
  }
}


function tweetIt(txt) {

	var tweet = {
	  status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
	  if (err) {
	  	console.log("Something went wwrong!");
	  } else {
	    console.log("It worked!");
	  }
	}
}
