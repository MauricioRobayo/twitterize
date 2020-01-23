/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
const twitterize = require('../src')({
  api_key: process.env.TWITTER_API_KEY,
  api_secret_key: process.env.TWITTER_API_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

// https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html

const options = {
  requestMethod: 'POST',
  endpoint: '/statuses/update.json',
  bodyParams: { status: 'Hello World!' },
}

twitterize(options)
  .then(console.log)
  .catch(console.log)
