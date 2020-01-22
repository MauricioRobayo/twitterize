const qs = require('querystring')
const https = require('https')
const { URL, URLSearchParams } = require('url')
const { percentEncode } = require('./authorization/helpers')
const { authorization } = require('./authorization/authorization')

function buildUrl(baseUrl, queryParams) {
  const url = new URL(baseUrl)
  url.search = new URLSearchParams(queryParams)
  return url
}

function buildBody(bodyParams) {
  return qs.stringify(bodyParams, '&', '=', {
    encodeURIComponent: percentEncode,
  })
}

function buildBaseUrl(subdomain, endpoint) {
  return `https://${subdomain}.twitter.com/1.1${endpoint}`
}

function buildHttpsOptions({
  url,
  requestMethod,
  body,
  baseUrl,
  queryParams,
  bodyParams,
  oauthOptions,
}) {
  return {
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
        oauthOptions,
      ),
      'cache-control': 'no-cache',
    },
  }
}

function request(httpsOptions, body) {
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

module.exports = ({
  subdomain = 'api',
  endpoint,
  requestMethod = 'GET',
  queryParams = {},
  bodyParams = {},
  oauthOptions,
}) => {
  const baseUrl = buildBaseUrl(subdomain, endpoint)
  const body = buildBody(bodyParams)
  const url = buildUrl(baseUrl, queryParams)
  const httpsOptions = buildHttpsOptions({
    url,
    requestMethod,
    body,
    baseUrl,
    queryParams,
    bodyParams,
    oauthOptions,
  })
  return request(httpsOptions, body)
}
