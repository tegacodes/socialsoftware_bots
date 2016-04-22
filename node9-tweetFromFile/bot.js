console.log('The bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

//load file
// The 'fs' (file system) module allows us to read and write files
// http://nodejs.org/api/fs.html
var fs = require('fs');
//enter file name - this file must sit in your repository
var filename = "manifesto.txt";



//call auto_tweet to beign

auto_tweet();
//Then use setInterval to tweet repeatedly at a set interval
//Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60

setInterval(auto_tweet,1000*60 );




// Function to get a random index number of an array
function randIndex (arr) {
  var index = Math.floor(arr.length*Math.random());
  return arr[index];
};

// Useful function that returns a random int
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


//spit a string into an array at the character indicated
//returns the array
function splitSentences(text){
	//split at whatever character
	listSentences = text.split(".");
//	console.log("listSentences "+listSentences[46]);
	return listSentences;
}

//read file from within its folder
function auto_tweet() {
  console.log("auto_tweet");
	// tweets are only loaded once. If you change the file, restart
  fs.readFile(filename,"utf8", function(error,data) {
    if (error){
			console.log('Error reading file', error);

		}
	if(data){
	//	data= data.replace(/^\s*[\r\n]/gm,"");
		//split string into array
		tweets = splitSentences(data);
		//get a random index of the array
		currentTweet=randIndex(tweets);
		//variable to hold our tweet
		var editTweet =" ";
		//get the first 140 characters
		for(var i=0;i<140;i++){
			if(i==0){
				editTweet = currentTweet.charAt(i);
			}else{
				editTweet = editTweet+currentTweet.charAt(i);
			}
		}
	//	console.log(currentTweet);
		console.log("editTweet="+editTweet);
		//call tweetit function to make tweet and pass it our editedTweet
		tweetIt(editTweet);
	}//close if statement
})//close readfile

}//close auto_tweet function


//tweetIt function that passes it tweetText string.
function tweetIt(tweetText) {

	var r = Math.floor(Math.random()*100);

	var tweet = {
	  status: tweetText
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
	  if (err) {
			console.log(err);
	  	console.log("Something went wwrong!");
	  } else {
	    console.log("It worked!");
	  }
	}
}
