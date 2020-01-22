/* eslint-disable no-console */
const twitterize = require('../src')

// https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html

// https://developer.twitter.com/en/apps/
const twit = twitterize({
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

const options = {
  requestMethod: 'POST',
  endpoint: '/statuses/update.json',
  bodyParams: { status: 'Hello World!' },
}

twit(options)
  .then(console.log)
  .catch(console.log)
