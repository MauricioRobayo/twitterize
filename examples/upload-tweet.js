/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const request = require('../src')

// https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html

// https://developer.twitter.com/en/apps/

const oauthOptions = {
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const imagePath = path.join(__dirname, './cat.jpg')
const b64content = fs.readFileSync(imagePath, { encoding: 'base64' })

// For simple status update
const tweetOptions = {
  requestMethod: 'POST',
  endpoint: '/statuses/update.json',
  bodyParams: {},
  oauthOptions,
}

// for  image upload
const uploadOptions = {
  requestMethod: 'POST',
  subdomain: 'upload',
  endpoint: '/media/upload.json',
  bodyParams: { media_data: b64content },
  oauthOptions,
}

request(uploadOptions)
  .then(data => {
    const obj = JSON.parse(data)
    tweetOptions.bodyParams = {
      status: 'Hello World IND SIG!',
      media_ids: obj.media_id_string,
    }
    request(tweetOptions)
      .then(console.log)
      .catch(console.log)
  })
  .catch(console.log)
