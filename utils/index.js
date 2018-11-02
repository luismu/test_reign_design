'use strict'

const api = require('../api')
const Post = require('../models')
const debug = require('debug')('reigndesign:utils')

const cron = async () => {
  await save()

  return setInterval(async () => {
    await save()
  }, 1000 * 60 * 60)
}

const save = async () => {
  try {
    await deleteAll()

    const data = await api()

    data['hits'].map(n => {
      const post = new Post({
        created_at: n.created_at,
        title: n.title,
        url: n.url,
        author: n.author,
        points: n.points,
        story_text: n.story_text,
        comment_text: n.comment_text,
        num_comments: n.num_comment,
        story_id: n.story_id,
        story_title: n.story_title,
        story_url: n.story_url,
        parent_id: n.parent_id,
        created_at_i: n.created_at_i,
        objectID: n.objectID
      })

      post.save((err) => {
        if (err) throw new Error(err.message)
      })
    })
    debug('Elementos agregados')
  } catch (error) {
    throw new Error(error)
  }
}

const deleteAll = () => {
  return new Promise((resolve, reject) => {
    Post.deleteMany({}, (err) => {
      if (err) return reject(new Error(err.message))

      debug('Elementos removidos')
      resolve({ message: 'ok' })
    })
  })
}

const prettyDate = (date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]

  const d = new Date(date)
  const today = Date.now()

  const day = d.getDate()
  const hours = `${d.getHours()}`.length === 1 ? `0${d.getHours()}` : `${d.getHours()}`
  const minuts = `${d.getMinutes()}`.length === 1 ? `0${d.getMinutes()}` : `${d.getMinutes()}`

  const md = Number(hours) >= 12 ? 'PM' : 'AM'

  if (dateFormat(d) === dateFormat(today)) {
    return `${hours}:${minuts} ${md}`
  }

  if (Number(dateFormat(today)) - Number(dateFormat(d)) === 1) {
    return 'Yesterday'
  }

  return `${months[d.getMonth()]} ${day}`
}

const dateFormat = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}${d.getMonth()}${d.getDate()}`
}

module.exports = {
  cron,
  prettyDate
}
