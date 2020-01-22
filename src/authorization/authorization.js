const { randomString, timestamp, percentEncode } = require('./helpers')
const { signature } = require('./modules/signature')

exports.authorization = ({
  requestMethod,
  baseUrl,
  queryParams,
  bodyParams,
  oauthOptions,
}) => {
  /*
    You should be able to see that the header contains 7 key/value pairs, where the keys all begin with the string “oauth_”. For any given Twitter API request, collecting these 7 values and creating a similar header will allow you to specify authorization for the request.
  */

  const oauthParams = {
    oauth_consumer_key: oauthOptions.api_key,
    oauth_nonce: randomString(32),
    oauth_signature: '',
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp(),
    oauth_token: oauthOptions.access_token,
    oauth_version: '1.0',
  }

  /*
    Generate signature
  */
  oauthParams.oauth_signature = signature({
    requestMethod,
    baseUrl,
    queryParams,
    bodyParams,
    oauthOptions: Object.assign(oauthOptions, oauthParams),
  })

  /*
    1. Append the string “OAuth ” (including the space at the end) to outputString.
    2. For each key/value pair of the 7 parameters listed above:
      1. Percent encode the key and append it to outputString.
      2. Append the equals character ‘=’ to DST.
      3. Append a double quote ‘”’ to DST.
      4. Percent encode the value and append it to DST.
      5. Append a double quote ‘”’ to DST.
      6. If there are key/value pairs remaining, append a comma ‘,’ and a space ‘ ‘ to DST.
  */
  const outputString = `OAuth ${Object.keys(oauthParams).reduce(
    (str, key, index, keys) => {
      // eslint-disable-next-line no-param-reassign
      str += `${percentEncode(key)}="${percentEncode(oauthParams[key])}"${
        index < keys.length - 1 ? ', ' : ''
      }`
      return str
    },
    '',
  )}`
  return outputString
}
