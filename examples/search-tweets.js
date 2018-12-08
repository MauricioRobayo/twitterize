/* eslint-disable no-console */
const request = require("../src");

// https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html

// https://developer.twitter.com/en/apps/
const oauthOptions = {
  api_key: "<YOUR API KEY>",
  api_secret_key: "<YOUR API SECRET KEY>",
  access_token: "<YOUR ACCESS TOKEN>",
  access_token_secret: "<YOUR ACCESS TOKEN SECRET>"
};

const options = {
  requestMethod: "GET",
  endpoint: "/search/tweets.json",
  queryParams: { q: "twitter bot" },
  oauthOptions
};

request(options)
  .then(data => console.log(data))
  .catch(e => console.log(e));
