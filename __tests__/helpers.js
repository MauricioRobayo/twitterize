const {
  percentEncode,
  randomString,
  timestamp,
} = require('../src/authorization/helpers')
// https://developer.twitter.com/en/docs/basics/authentication/guides/percent-encoding-parameters.html
describe('should percent encode a string according to RFC 3986, Section 2.1.', () => {
  it('should percent encode the plus sign', () => {
    expect(percentEncode('Ladies + Gentlemen')).toBe('Ladies%20%2B%20Gentlemen')
  })
  it('should percent encode exclamation mark', () => {
    expect(percentEncode('An encoded string!')).toBe('An%20encoded%20string%21')
  })
  it('should percent encode the comma and the ampersand symbol', () => {
    expect(percentEncode('Dogs, Cats & Mice')).toBe(
      'Dogs%2C%20Cats%20%26%20Mice',
    )
  })
  it('should percent encode an emoji', () => {
    expect(percentEncode('☃')).toBe('%E2%98%83')
  })
})

describe('should generate random alphanumeric string of given length', () => {
  it('should generate random alphanumeric string of length 15', () => {
    expect(/^[a-z0-9]{15}$/i.test(randomString(15))).toBe(true)
  })
  it('should generate random alphanumeric string of length 16', () => {
    expect(/^[a-z0-9]{16}$/i.test(randomString(16))).toBe(true)
  })
  it('should generate random alphanumeric string of length 0', () => {
    expect(randomString(0).length).toBe(0)
  })
  it('should generate random alphanumeric string of length 0', () => {
    expect(randomString(-15).length).toBe(0)
  })
})

it('should generate the Unix Epoch timestamp for the present moment', () => {
  const date = new Date()
  const time = date.getTime()
  const epochTimeStamp = Math.round(time / 1000)
  expect(timestamp()).toBe(epochTimeStamp)
})
