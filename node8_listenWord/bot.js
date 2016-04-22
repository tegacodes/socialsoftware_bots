
console.log('The follow bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

var params={
  track: 'mango'
};

//  filter the twitter public stream by the word 'mango'.
var stream = T.stream('statuses/filter',params);

var tweets =[]; //make an array to store incoming tweets

//analyse what is data we are getting back.
//data is passed to function tweetData and ends up in its argument eventMsg
stream.on('tweet', tweetData) ;
console.log("go!");

function tweetData(eventMsg){ //function to get all the content
  //pass eventMsg to the fs module and export as a file.
  var fs = require('fs'); //get fs module
  var json = JSON.stringify(eventMsg, null, 2);
  fs.writeFile("tweet.json", json); //write to a file so we can see it.

  tweets.push({id: eventMsg.id, str: eventMsg.id_str, text: eventMsg.text}); //put it in our array

}
setInterval(processTweets, 50*1000);// evaluate the tweets in the tweets array every 50 seconds

function processTweets(){
  if(tweets[0]!==null){
    //get first tweeet text ftom array and do something with it
    var tweetPhrase = tweets[0].text;

    console.log("Old:" +tweetPhrase);

    //if you want to make a word substitution in the tweet, call the word substitution function (written below)
    var newTweet = wordsubstitution(tweetPhrase, 'mango', 'pinapple');
    console.log("New:" + newTweet);
    //set is so it will only make the retweet of the tweet every so often....
    tweetIt(newTweet);

    // or do something with the tweets array
    for (var i = 0; i < tweets.length; i++) {
      // tweets[i].id
      // tweets[i].str
      // tweets[i].text

      // reset the tweets array
      tweets.length = 0;
    }
  }
}

//Function to substitute a word for another word.
function wordsubstitution(text, wordToGo, replacement){
  var newPhrase = text.split(wordToGo).join(replacement);
  console.log(newPhrase);
  return newPhrase;
};


//Function to make tweet.
function tweetIt(txt) {

  var tweet = {
    status: txt
  }

  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Something went wwrong!");
      console.log(err);
    } else {
      console.log("It worked!");
    }
  }
}
