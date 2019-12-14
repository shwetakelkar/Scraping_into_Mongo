# Scraping_into_Mongo

## overview

you'll create a web app that scrape data news from another site and save the data with adiitional notes/comments.

`npm init`

### importing libraries 
1. express
2. cheerio
3. express-handlebars
4. mongoose
5. axios/request
6. morgan logger

### database schema setup

`var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";`
`mongoose.Promise = Promise;`
`mongoose.connect(MONGODB_URI, { useNewUrlParser: true });`

### schema models

1. Article
2. Note
3. index

### Running the app
 `node server.js`

### Using the server database mapping

`heroku addons:create mongolab`
Create a config variable to server settings for DB mapping.



 ### Deployment
update the git repo at master branch then
`heroku login`
`git remote -v`
`heroku create`
`git remote -v`
`git push heroku master` 
The client files in app/ will be built along with each deployment.

### Credits/acknowledgement

The Washington Post : https://www.washingtonpost.com/
