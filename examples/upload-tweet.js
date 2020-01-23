/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
// https://developer.twitter.com/en/apps/
const twitterize = require('../src')({
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

// https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html

const imagePath = path.join(__dirname, './cat.jpg')
const b64content = fs.readFileSync(imagePath, { encoding: 'base64' })

// Image upload
twitterize({
  requestMethod: 'POST',
  subdomain: 'upload',
  endpoint: '/media/upload.json',
  bodyParams: { media_data: b64content },
})
  .then(data =>
    // Status update
    twitterize({
      requestMethod: 'POST',
      endpoint: '/statuses/update.json',
      bodyParams: {
        status: 'Hello World IND SIG!',
        media_ids: JSON.parse(data).media_id_string,
      },
    }),
  )
  .then(console.log)
  .catch(console.log)
