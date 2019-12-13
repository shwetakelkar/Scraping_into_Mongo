var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  
  link: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  isSaved:{
    type: Boolean,
    default:false
  },
//Note ref to Note collection
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"

  }
});

var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;