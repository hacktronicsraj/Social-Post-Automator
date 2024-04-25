const dotenv = require('dotenv');
const axios = require('axios');
const prompt = require('prompt-sync')();

dotenv.config();
// Prompt the user for input
const userInput = prompt('Please enter your text: ');

// Define the request body
const requestBody = {
    "author": "urn:li:person:4D_bpfhj1z",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": userInput
            },
            "shareMediaCategory": "NONE"
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
};

// Define the request headers
const requestHeaders = {
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.BEARER_TOKEN_LINKEDIN}`
};

// Make the POST request
axios.post('https://api.linkedin.com/v2/ugcPosts', requestBody, { headers: requestHeaders })
    .then(response => {
        console.log('Post was successful:', response.data);
    })
    .catch(error => {
        console.error('There was an error making the post:', error);
    });
