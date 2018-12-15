# Twitterize

[![Build Status](https://travis-ci.com/archemiro/twitterize.svg?branch=master)](https://travis-ci.com/archemiro/twitterize)
[![codecov](https://codecov.io/gh/archemiro/twitterize/branch/master/graph/badge.svg)](https://codecov.io/gh/archemiro/twitterize)
[![Greenkeeper badge](https://badges.greenkeeper.io/archemiro/twitterize.svg)](https://greenkeeper.io/)
[![install size](https://packagephobia.now.sh/badge?p=twitterize)](https://packagephobia.now.sh/result?p=twitterize)

Simple and minimalist wrapper using the native `https` NodeJS module to send authorized requests to the Twitter API. Works by generating the OAuth 1.0a authorization headers for the Twitter API.

## Install

```shell
npm install twitterize
```

## Use

Create an app and get your credentials, you will need:

- API KEY
- API SECRET KEY
- ACCESS TOKEN
- ACCESS TOKEN SECRET

Use the documented endpoints and parameters for the [twitter API](https://developer.twitter.com/en/docs/basics/getting-started).

For example, to [search tweets](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html):

```js
const twitterize = require("twitterize");

const credentials = {
  api_key: "<YOUR API KEY>",
  api_secret_key: "<YOUR API SECRET KEY>",
  access_token: "<YOUR ACCESS TOKEN>",
  access_token_secret: "<YOUR ACCESS TOKEN SECRET>"
};

const options = {
  requestMethod: "GET",
  endpoint: "/search/tweets.json",
  queryParams: { q: "twitter bot" },
  oauthOptions: credentials
};

twitterize(options)
  .then(data => console.log(data))
  .catch(e => console.log(e));
```

To [post tweets](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html):

```js
const twitterize = require("twitterize");

const credentials = {
  api_key: "<YOUR API KEY>",
  api_secret_key: "<YOUR API SECRET KEY>",
  access_token: "<YOUR ACCESS TOKEN>",
  access_token_secret: "<YOUR ACCESS TOKEN SECRET>"
};

const options = {
  requestMethod: "POST",
  endpoint: "/statuses/update.json",
  bodyParams: { status: "Hello World!" },
  oauthOptions: credentials
};

request(options)
  .then(data => console.log(data))
  .catch(e => console.log(e));
```

## Examples

To run the [examples](./examples) clone the repository:

```sh
git clone https://github.com/archemiro/twitterize.git
```

In the root directory of the repo create a `.env` file with your credentials (you can get them from your [twitter app page](https://developer.twitter.com/en/apps)):

```sh
# .env file
TWITTER_API_KEY="<YOUR API KEY>"
TWITTER_API_SECRET_KEY="<YOUR API SECRET KEY>"
TWITTER_ACCESS_TOKEN="<YOUR ACCESS TOKEN>"
TWITTER_ACCESS_TOKEN_SECRET="<YOUR SECRET ACCESS TOKEN>"
```

Use the provided npm scripts:

```sh
npm run example:search
npm run example:post
```

## Twittter documentation

- [Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/oauth)
- [Authorizing a request](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)
- [Creating a signature](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)

## License

[MIT](LICENSE).
