const crypto = require('crypto')
const { signatureBaseString } = require('./signatureBaseString')
const { percentEncode } = require('../helpers')

exports.signature = (options) => {
  const baseString = signatureBaseString(options)
  const consumerSecret = percentEncode(options.oAuthOptions.api_secret_key)
  const tokenSecret = percentEncode(options.oAuthOptions.access_token_secret)
  const signingKey = `${consumerSecret}&${tokenSecret}`
  const outputString = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64')
  return outputString
}
