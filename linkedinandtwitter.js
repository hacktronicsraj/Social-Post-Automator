require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you want to post? ', (postText) => {
  tweet(postText);
  linkedinPost(postText);
  rl.close();
});

const tweet = async (tweetText) => {
  try {
    await twitterClient.v2.tweet(tweetText);
  } catch (e) {
    console.log(e)
  }
}

const linkedinPost = async (postText) => {
  const requestBody = {
    "author": "urn:li:person:4D_bpfhj1z",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": postText
            },
            "shareMediaCategory": "NONE"
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  };

  const requestHeaders = {
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.BEARER_TOKEN_LINKEDIN}`
  };

  axios.post('https://api.linkedin.com/v2/ugcPosts', requestBody, { headers: requestHeaders })
    .then(response => {
        console.log('LinkedIn post was successful:', response.data);
    })
    .catch(error => {
        console.error('There was an error making the LinkedIn post:', error);
    });
}
