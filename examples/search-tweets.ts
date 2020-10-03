/* eslint-disable no-console */
// https://developer.twitter.com/en/apps/
import twitterize, { OAuthOptions, RequestOptions } from '../src'

interface Tweets {
  search_metadata: Record<string, string | number>
}

const oAuthOptions: OAuthOptions = {
  api_key: process.env.TWITTER_API_KEY || '',
  api_secret_key: process.env.TWITTER_API_SECRET_KEY || '',
  access_token: process.env.TWITTER_ACCESS_TOKEN || '',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
}

const twitterizeRequest = twitterize(oAuthOptions)

const requestOptions: RequestOptions = {
  requestMethod: 'GET',
  endpoint: '/search/tweets.json',
  queryParams: { q: 'twitter bot' },
}

twitterizeRequest<Tweets>(requestOptions)
  .then((data) => console.log(data.search_metadata))
  .catch((error) => console.log(error))
