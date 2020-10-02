# Twitterize 🔑 [![npm version](https://badge.fury.io/js/twitterize.svg)](https://www.npmjs.com/package/twitterize)

[![Build Status](https://github.com/MauricioRobayo/twitterize/workflows/Test%20and%20Release/badge.svg)](https://github.com/MauricioRobayo/twitterize/actions)
[![codecov](https://codecov.io/gh/MauricioRobayo/twitterize/branch/master/graph/badge.svg)](https://codecov.io/gh/MauricioRobayo/twitterize)
[![codebeat badge](https://codebeat.co/badges/937d95fe-2d3e-487f-a735-f90384b84566)](https://codebeat.co/projects/github-com-mauriciorobayo-twitterize-master)

Simple and minimalist wrapper using the native `https` NodeJS module to send authorized requests to the Twitter API.

No dependencies and super small: [![install size](https://packagephobia.now.sh/badge?p=twitterize)](https://packagephobia.now.sh/result?p=twitterize).

![Twitterize](https://media.giphy.com/media/km2mais9qzYI/giphy.gif)

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
/* eslint-disable no-console */
const twitterize = require('../src')

const twit = twitterize({
  api_key: '<YOUR API KEY>',
  api_secret_key: '<YOUR API SECRET KEY>',
  access_token: '<YOUR ACCESS TOKEN>',
  access_token_secret: '<YOUR SECRET ACCESS TOKEN>',
})

const options = {
  requestMethod: 'GET',
  endpoint: '/search/tweets.json',
  queryParams: { q: 'twitter bot' },
}

twit(options).then(console.log).catch(console.log)
```

To [post tweets](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update.html):

```js
const twitterize = require('../src')

const twit = twitterize({
  api_key: '<YOUR API KEY>',
  api_secret_key: '<YOUR API SECRET KEY>',
  access_token: '<YOUR ACCESS TOKEN>',
  access_token_secret: '<YOUR SECRET ACCESS TOKEN>',
})

const options = {
  requestMethod: 'POST',
  endpoint: '/statuses/update.json',
  bodyParams: { status: 'Hello World!' },
}

twit(options).then(console.log).catch(console.log)
```

To [upload an image](https://developer.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload.html):

```js
const fs = require('fs')
const path = require('path')
const twitterize = require('../src')

const twit = twitterize({
  api_key: '<YOUR API KEY>',
  api_secret_key: '<YOUR API SECRET KEY>',
  access_token: '<YOUR ACCESS TOKEN>',
  access_token_secret: '<YOUR SECRET ACCESS TOKEN>',
})

const imagePath = path.join(__dirname, './cat.jpg')
const b64content = fs.readFileSync(imagePath, { encoding: 'base64' })

// Image upload
twit({
  requestMethod: 'POST',
  subdomain: 'upload',
  endpoint: '/media/upload.json',
  bodyParams: { media_data: b64content },
})
  .then((data) =>
    // Status update
    twit({
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
```

## Examples

To run the [examples](./examples) clone the repository:

```sh
git clone https://github.com/MauricioRobayo/twitterize.git
```

Install dependencies:

```
cd twitterize
npm install
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
npm run example:upload
```

## Twittter documentation

- [Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/oauth)
- [Authorizing a request](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)
- [Creating a signature](https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request.html)

## Author

- GitHub: [@MauricioRobayo](https://github.com/MauricioRobayo)
- LinkedIn: [@MauricioRobayo](https://linkedin.com/in/MauricioRobayo)
- Twitter: [@MauricioRobayo\_](https://twitter.com/MauricioRobayo_)

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FMauricioRobayo%2Ftwitterize.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FMauricioRobayo%2Ftwitterize?ref=badge_large)
