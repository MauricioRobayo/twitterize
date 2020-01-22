const { signature } = require('../../src/authorization/modules/signature')

const requestMethod = 'post'
const baseUrl = 'https://api.twitter.com/1.1/statuses/update.json'
const queryParams = { include_entities: true }
const bodyParams = {
  status: 'Hello Ladies + Gentlemen, a signed OAuth request!',
}
const oauthOptions = {
  api_key: 'xvz1evFS4wEEPTGEFPHBog',
  access_token: '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
  oauth_nonce: 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
  oauth_timestamp: 1318622958,
  api_secret_key: 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw',
  access_token_secret: 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE',
}

it('should return the signature', () => {
  expect(
    signature({
      requestMethod,
      baseUrl,
      queryParams,
      bodyParams,
      oauthOptions,
    }),
  ).toBe('hCtSmYh+iHYCEqBWrE7C7hYmtUk=')
})
