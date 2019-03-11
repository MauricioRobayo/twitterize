const qs = require('querystring')
const https = require('https')
const { URL, URLSearchParams } = require('url')
const { percentEncode } = require('./authorization/helpers')
const { authorization } = require('./authorization/authorization')

module.exports = options => {
  const {
    endpoint,
    requestMethod = 'GET',
    queryParams = {},
    bodyParams = {},
    oauthOptions,
  } = options
  const baseUrl = `https://api.twitter.com/1.1${endpoint}`
  const body = qs.stringify(bodyParams, '&', '=', {
    encodeURIComponent: percentEncode,
  })
  const url = new URL(baseUrl)
  url.search = new URLSearchParams(queryParams)
  const httpsOptions = {
    protocol: url.protocol,
    host: url.host,
    hostname: url.hostname,
    method: requestMethod,
    path: `${url.pathname}${url.search}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
      Authorization: authorization(
        requestMethod,
        baseUrl,
        queryParams,
        bodyParams,
        oauthOptions
      ),
      'cache-control': 'no-cache',
    },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(httpsOptions, res => {
      let data = ''
      res.on('data', _data => {
        data += _data
      })
      res.on('end', () => {
        resolve(data)
      })
    })
    req.on('error', error => {
      reject(error)
    })
    req.write(body)
    req.end()
  })
}
