const express = require("express");
//const mongojs = require("mongojs");
const cheerio = require("cheerio");
const handlebars = require ("express-handlebars");
const mongoose = require('mongoose');
//const request = require("request");
const axios = require("axios");
var logger = require("morgan");

// var MONGODB_URI = "mongodb://localhost/mHeadlines";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
var app = express();

var db = require("./models");
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/mongoScrapping", { useNewUrlParser: true });

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine","handlebars");

app.use(logger("dev"));

app.get("/",function(req,res){
    res.render("dashboard")
})

//scrape route
app.post("/scrape", function(req, res) {
    
   
    axios.get("https://www.washingtonpost.com/").then(function(response) {

        var $ = cheerio.load(response.data);
        var data = [];
    
        $("h2.headline").each(function (i, element) {
            var result = {};
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");
            var content = $(element).parent().children("div.blurb").text();
            if (!content) {
                content = $(element).parent().find("div.blurb").text();
            }
            if (title && link) {
                result = {
                title: title,
                link: link,
                content: content
                };
            
                db.Article.create(result).then(function (dbResult) {
                    data.push(dbResult);
                }).catch(function(err){
                    throw err
                })
                
            }
        });

        res.json(data)
    });
    
  });

  app.get("/articles", function(req, res) {

    db.Article.find({isSaved:false}).then(function(result){
      
        res.render("dashboard",{articles:result})
      
    })
    
  });

  app.delete("/clear",function(req,res){
      console.log("inside the clear")
    db.Article.remove().populate("note").then(function(result){
      
        console.log(result)
        res.render("dashboard",{articles:""})
      
    })

  })

  app.delete("/deletNote/:id",function(req,res){
      db.Note.remove({_id:req.params.id}).then(function(result){
          console.log(result)
      })

  })

  app.put("/saved/:id",function(req,res){
     db.Article.findOneAndUpdate({_id:req.params.id}, { $set: { isSaved : true} }, { new: true }).then(function(result){
         res.json(result)
     })
  })

  app.get("/saved", function(req, res) {

    db.Article.find({isSaved:true}).populate("note").then(function(result){
      
        return res.render("dashboard",{articles:result})
      
    })
    
  });
  app.get("/notes/:id", function(req, res) {


    db.Article.find({_id:req.params.id}).populate("note").then(function(result){
      
        console.log(result)
        return res.json(result)
      
    })
})

  app.post("/noteAdded/:id",function(req,res){
    db.Note.create(req.body).then(function(result){
    
        return db.Article.findOneAndUpdate({_id:req.params.id}, { $push: { note: result._id } }, { new: true })
     
   }).catch(function(err){
     throw err
   })
  })

app.listen(PORT, function() {
    console.log("App running on port 3000!");
  });

