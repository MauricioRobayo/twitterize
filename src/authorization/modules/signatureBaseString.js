const { percentEncode } = require('../helpers')
const { parameterString } = require('./parameterString')

exports.signatureBaseString = ({
  requestMethod,
  baseUrl,
  queryParams,
  bodyParams,
  oAuthOptions,
}) => {
  /*
    1. Convert the HTTP Method to uppercase and set the output string equal to this value.
    2. Append the ‘&’ character to the output string.
    3. Percent encode the URL and append it to the output string.
    4. Append the ‘&’ character to the output string.
    5. Percent encode the parameter string and append it to the output string.
*/
  const paramString = parameterString(queryParams, bodyParams, oAuthOptions)
  const outputString = `${requestMethod.toUpperCase()}&${percentEncode(
    baseUrl,
  )}&${percentEncode(paramString)}`
  return outputString
}
