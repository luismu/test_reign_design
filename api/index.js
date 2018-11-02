'use strict'

const request = require('request')

const query = () => {
  return new Promise((resolve, reject) => {
    request.get({
      url: 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs'
    }, (err, response, body) => {
      if (err) return reject(new Error(err))

      if (response.statusCode >= 400) {
        const error = {
          statusCode: response.statusCode,
          message: err.message
        }

        return reject(new Error(JSON.stringify(error)))
      }

      resolve(JSON.parse(body))
    })
  })
}

module.exports = query
