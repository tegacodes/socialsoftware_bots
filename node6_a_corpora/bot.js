console.log('The bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

var fs = require("fs");
console.log("\n *START* \n");
var birdfile = "birdsAntarctica.json";
var settingfile = "settings.json";

var birds = fs.readFileSync(birdfile); //read image file.

var settings = fs.readFileSync(settingfile); //read image file.

console.log("Output Content : \n"+ birdfile);
console.log("\n *EXIT* \n");


// //parse as js object
var obj= JSON.parse(birds);
var length=Object.keys(obj.birds).length;
var randomBird = obj.birds[Math.floor(Math.random()*length)];
console.log(randomBird);

var length=Object.keys(randomBird.members).length;
var randomMember = Math.floor(Math.random()*length);

console.log(randomBird.members[randomMember]);

var obj= JSON.parse(settings);
var length=Object.keys(obj.settings).length;
var randomSetting = obj.settings[Math.floor(Math.random()*length)];
console.log(randomSetting.name);


//tweetIt();
setInterval(tweetIt, 6000*60);

function tweetIt() {

	var phrase = randomBird.members[randomMember] + " seen in a " + randomSetting.name;

	var tweet = {
		status: phrase
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
