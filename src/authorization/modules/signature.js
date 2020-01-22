const crypto = require('crypto')
const { signatureBaseString } = require('./signatureBaseString')
const { percentEncode } = require('../helpers')

exports.signature = ({
  requestMethod,
  baseUrl,
  queryParams,
  bodyParams,
  oauthOptions,
}) => {
  const baseString = signatureBaseString({
    requestMethod,
    baseUrl,
    queryParams,
    bodyParams,
    oauthOptions,
  })
  const consumerSecret = percentEncode(oauthOptions.api_secret_key)
  const tokenSecret = percentEncode(oauthOptions.access_token_secret)
  const signingKey = `${consumerSecret}&${tokenSecret}`
  const outputString = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64')
  return outputString
}
