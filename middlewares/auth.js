'use strict'

const services = reuire('../services')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: `You don't have authorization` })
  }

  const token = req.headers.authorization.split(' ')[1]

  req.user = services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuth