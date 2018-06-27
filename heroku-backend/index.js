"use strict";

var feed = require("./sources.js")
var parser = require("rssparser");
var options = {};
var express = require("express"),
  app = express(),
  port = process.env.PORT;
app.use(express.json());

class NewsEntry {
  constructor( title, source, resource, description, date, author, url) {
    this.title = title;
    this.source = source;
    this.resource = resource;
    this.description = description;
    this.date = date;
    this.author = author;
    this.url = url;
  }
}

function toNewsEntries(rawEntries, source, ressort) {
  const entries = [];
  rawEntries.items.forEach(item => {
    let newsEntry = new NewsEntry();
    newsEntry.description = item.summary;
    newsEntry.title = item.title;
    newsEntry.source = source;
    newsEntry.resource = ressort;
    newsEntry.date = new Date(item.published_at);
    newsEntry.author = item.author;
    newsEntry.url = item.url;
    entries.push(newsEntry)
  });
  return entries;
}

app.listen(port || 3000, function() {
  console.log("listening on 3000");
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/feed", (req, res) => {
  let counter = 0;
  let maxlength = 0;
  let output = [];
  feed.sources.forEach(source => {
    maxlength += source.ressorts.length;
  });

  feed.sources.forEach(source =>
      source.ressorts.forEach(ressort => {
            parser.parseURL(ressort.url, options, function(err, out) {
              counter++;
              if (err) {
                return;
              }
              output = output.concat(toNewsEntries(out, source.source, ressort.type));
              if (counter >= maxlength) {
                res.send(output.sort((a, b) => b.date - a.date));
              }
            });
          }
      ));
});
