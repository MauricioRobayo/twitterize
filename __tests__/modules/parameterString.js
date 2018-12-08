const {
  parameterString
} = require("../../src/authorization/modules/parameterString");

it("should return the parameter string", () => {
  const queryParams = {
    include_entities: true
  };
  const bodyParams = {
    status: "Hello Ladies + Gentlemen, a signed OAuth request!"
  };
  const oauthOptions = {
    api_key: "xvz1evFS4wEEPTGEFPHBog",
    access_token: "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb",
    oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
    oauth_timestamp: 1318622958
  };
  expect(parameterString(queryParams, bodyParams, oauthOptions)).toBe(
    "include_entities=true&oauth_consumer_key=xvz1evFS4wEEPTGEFPHBog&oauth_nonce=kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1318622958&oauth_token=370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb&oauth_version=1.0&status=Hello%20Ladies%20%2B%20Gentlemen%2C%20a%20signed%20OAuth%20request%21"
  );
});
