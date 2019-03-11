const crypto = require('crypto')

// https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#Description
const percentEncode = str =>
  encodeURIComponent(str)
    .replace(/[!'()]/g, escape)
    .replace(/\*/g, '%2A')

const timestamp = () => Math.round(Date.now() / 1000)

const randomString = length =>
  length < 0
    ? ''
    : crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .substring(0, length)

module.exports = {
  percentEncode,
  timestamp,
  randomString,
}
