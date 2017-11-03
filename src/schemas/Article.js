import {Schema} from 'mongoose'

const unique = true

export const ArticleSchema = new Schema({
  objectID: {type: String, unique},
  story_id: String,
  created_at: Date,
  title: String,
  url: String,
  author: String,
  points: String,
  story_text: String,
  comment_text: String,
  num_comments: String,
  story_title: String,
  story_url: String,
  parent_id: String,
  created_at_i: String,
  _tags: [],
  _highlightResult: {},
  __removed: {type: Boolean, default: false},
})

export default ArticleSchema
