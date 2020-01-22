const { authorization } = require('../src/authorization/authorization')

jest.mock('../src/authorization/modules/signature', () => ({
  signature: jest.fn(() => 'tnnArxj06cWHq44gCs1OSKk/jLY='),
}))
jest.mock('../src/authorization/helpers', () => ({
  ...jest.requireActual('../src/authorization/helpers'),
  timestamp: jest.fn(() => 1318622958),
  randomString: jest.fn(() => 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg'),
}))

const requestMethod = 'post'
const baseUrl = 'https://api.twitter.com/1.1/statuses/update.json'
const queryParams = { include_entities: true }
const bodyParams = {
  status: 'Hello Ladies + Gentlemen, a signed OAuth request!',
}
const oauthOptions = {
  api_key: 'xvz1evFS4wEEPTGEFPHBog',
  api_secret_key: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw',
  access_token: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
  access_token_secret: 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE',
}

it('should return the authorization header string', () => {
  expect(
    authorization({
      requestMethod,
      baseUrl,
      queryParams,
      bodyParams,
      oauthOptions,
    }),
  ).toBe(
    'OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", oauth_version="1.0"',
  )
})
