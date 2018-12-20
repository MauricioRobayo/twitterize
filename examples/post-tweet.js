/* eslint-disable no-console */
const request = require("../src");
const  fs = require('fs');
const  path = require('path');

// https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html

// https://developer.twitter.com/en/apps/

const oauthOptions = {
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

//For simple status update
const tweetOptions = {
  requestMethod: "POST",
  endpoint: "/statuses/update.json",
  bodyParams: { 
  },
  oauthOptions
};



// for  image upload

image_path = path.join(__dirname, '../images/bg_googleads.jpg'),
b64content = fs.readFileSync(image_path, { encoding: 'base64' });

  const uploadOptions = {
    requestMethod: "POST",
    subdomain: "upload",
    endpoint: "/media/upload.json",
    bodyParams: {media_data: b64content}, 
    oauthOptions
  };
  


  request(uploadOptions)
  .then(function(data){
    const obj = JSON.parse(data);
    tweetOptions.bodyParams.status = "Hello World IND SIG!",
    tweetOptions.bodyParams.media_ids = obj.media_id_string;
    request(tweetOptions)
      .then(console.log)
      .catch(console.log);
  })
  .catch(console.log);



  
  
