console.log('The image bot is starting');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

var exec = require('child_process').exec;
var fs = require('fs');

tweetIt();
 //setInterval(tweetIt, 1000*20);

function tweetIt() {
  var cmd = "processing-java --sketch='pwd'/rainbow --run"; //terminal command as a string
  exec(cmd, processing); //run the processing sketche

  function processing() {
    var filename = 'rainbow/output.png';
    var params = { //image encoding parameters for fs file upload.
      encoding: 'base64'
    }
    var b64 = fs.readFileSync(filename, params); //read image file.

    T.post('media/upload', { media_data: b64 }, uploaded); //twitter upload function.

    function uploaded(err, data, response) {
      var id = data.media_id_string;
      var tweet = { //any metadata for the tweet
        status: '#codingrainbow live from node.js',
        media_ids: [id]
      }

      T.post('statuses/update', tweet, tweeted); //at the end of the upload function, we call the post function.

    }

    function tweeted(err, data, response) { //error checking called when we post.
      if (err) {
        console.log("Something went wwrong!");
      } else {
        console.log("It worked!");
      }
    }
  }
}
