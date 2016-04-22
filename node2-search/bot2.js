console.log('The bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);



var params = {
  q: 'Gamergate',
  count: 2
}

T.get('search/tweets', params, gotData); //call back function. gotData is run only when search tweets has happened.


function gotData(err, data, response) {

  console.log(data);

  var tweets = data.statuses; //pulls out just the statuses in the returned data
  for (var i = 0; i < tweets.length; i++) {
  //  console.log(tweets[i].text);
  }
}




function tweetIt(){

  //variable to hold parameters
  var parameters = {
    status: 'hello world!'
  }

  // function that tweets 'hello world!'
  T.post('statuses/update', parameters, tweeted);

  //function that is called when the post is made
  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went wrong!"); //give us an error message if it didn't!
    } else {
      console.log("It worked!"); //give feedback if it worked
    }
  }
}
