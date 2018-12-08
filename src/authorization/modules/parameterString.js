const { percentEncode } = require("../helpers");

exports.parameterString = (queryParams, bodyParams, oauthOptions) => {
  /*
    Collecting parameters
  */
  const params = Object.assign(queryParams, bodyParams, {
    oauth_consumer_key: oauthOptions.api_key,
    oauth_nonce: oauthOptions.oauth_nonce,
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: oauthOptions.oauth_timestamp,
    oauth_token: oauthOptions.access_token,
    oauth_version: "1.0"
  });
  /*
    These values need to be encoded into a single string which will be used later on. The process to build the string is very specific:
      1. Percent encode every key and value that will be signed.
      2. Sort the list of parameters alphabetically by encoded key.
      3. For each key/value pair:
        1. Append the encoded key to the output string.
        2. Append the ‘=’ character to the output string.
        3. Append the encoded value to the output string.
        4. If there are more key/value pairs remaining, append a ‘&’ character to the output string.
  */
  // 1. Percent encode every key and value that will be signed.
  const encodedParams = Object.keys(params).reduce((accumulator, key) => {
    accumulator[percentEncode(key)] = percentEncode(params[key]);
    return accumulator;
  }, {});
  // 2. Sort the list of parameters alphabetically by encoded key
  const sortedEncodedParams = Object.keys(encodedParams)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = encodedParams[key];
      return accumulator;
    }, {});
  //  3. For each key/value pair:
  //    1. Append the encoded key to the output string.
  //    2. Append the ‘=’ character to the output string.
  //    3. Append the encoded value to the output string.
  //    4. If there are more key/value pairs remaining, append a ‘&’ character
  const outputString = Object.keys(sortedEncodedParams).reduce(
    (str, key, index, keys) => {
      // eslint-disable-next-line no-param-reassign
      str += `${key}=${sortedEncodedParams[key]}${
        index < keys.length - 1 ? "&" : ""
      }`;
      return str;
    },
    ""
  );
  return outputString;
};
