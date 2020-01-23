const {
  percentEncode,
  randomString,
  timestamp,
} = require('../src/authorization/helpers')
// https://developer.twitter.com/en/docs/basics/authentication/guides/percent-encoding-parameters.html
it('should percent encode a string according to RFC 3986, Section 2.1.', () => {
  expect(percentEncode('Ladies + Gentlemen')).toBe('Ladies%20%2B%20Gentlemen')
  expect(percentEncode('An encoded string!')).toBe('An%20encoded%20string%21')
  expect(percentEncode('Dogs, Cats & Mice')).toBe('Dogs%2C%20Cats%20%26%20Mice')
  expect(percentEncode('☃')).toBe('%E2%98%83')
})

it('should generate random alphanumeric string of given length', () => {
  expect(/^[a-z0-9]{15}$/i.test(randomString(15))).toBe(true)
  expect(/^[a-z0-9]{16}$/i.test(randomString(16))).toBe(true)
  expect(randomString(0).length).toBe(0)
  expect(randomString(-15).length).toBe(0)
})

it('should generate the Unix Epoch timestamp for the present moment', () => {
  const date = new Date()
  const time = date.getTime()
  const epochTimeStamp = Math.round(time / 1000)
  expect(timestamp()).toBe(epochTimeStamp)
})
