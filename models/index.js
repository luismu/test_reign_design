'use strict'

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/hackernewpost')

const Schema = mongoose.Schema

const PostSchema = new Schema({
  created_at: Date,
  title: String,
  url: String,
  author: String,
  points: Number,
  story_text: String,
  comment_text: String,
  num_comments: Number,
  story_id: Number,
  story_title: String,
  story_url: String,
  parent_id: Number,
  created_at_i: Number,
  objectID: String
})

const Post = mongoose.model('PostModel', PostSchema)

module.exports = Post
