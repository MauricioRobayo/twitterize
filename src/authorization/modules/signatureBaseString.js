const { percentEncode } = require("../helpers");
const { parameterString } = require("./parameterString");

exports.signatureBaseString = (
  requestMethod,
  baseUrl,
  queryPrams,
  bodyParams,
  oauthOptions
) => {
  /*
    1. Convert the HTTP Method to uppercase and set the output string equal to this value.
    2. Append the ‘&’ character to the output string.
    3. Percent encode the URL and append it to the output string.
    4. Append the ‘&’ character to the output string.
    5. Percent encode the parameter string and append it to the output string.
*/
  const paramString = parameterString(queryPrams, bodyParams, oauthOptions);
  const outputString = `${requestMethod.toUpperCase()}&${percentEncode(
    baseUrl
  )}&${percentEncode(paramString)}`;
  return outputString;
};
