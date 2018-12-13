# Twitterize

[![Build Status](https://travis-ci.com/archemiro/twitterize.svg?branch=master)](https://travis-ci.com/archemiro/twitterize)
[![codecov](https://codecov.io/gh/archemiro/twitterize/branch/master/graph/badge.svg)](https://codecov.io/gh/archemiro/twitterize)
[![install size](https://packagephobia.now.sh/badge?p=twitterize)](https://packagephobia.now.sh/result?p=twitterize)

Simple and minimalist wrapper using the native `https` NodeJS module to send authorized requests to the Twitter API. Works by generating OAuth 1.0a authorization headers for the Twitter API.

## Install

```shell
npm install twitterize
```

## Use

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

## Twittter documentation

- [Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/oauth)
- [Authorizing a request](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)
- [Creating a signature](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)

## License

[MIT](LICENSE).
