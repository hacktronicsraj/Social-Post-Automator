require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js")
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you want to tweet? ', (tweetText) => {
  tweet(tweetText);
  rl.close();
});

const tweet = async (tweetText) => {
  try {
    await twitterClient.v2.tweet(tweetText);
  } catch (e) {
    console.log(e)
  }
}