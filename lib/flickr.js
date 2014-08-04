"use strict";

require("dotenv").load()

var fs = require("fs")
var path = require("path")
var async = require("async")
var superagent = require("superagent")
var flickr = require("flickr-client")({key: process.env.FLICKR_KEY})
flickr.info = require("flickr-photo-info")(flickr)

flickr("photosets.getPhotos", {photoset_id: "72157610714160553"}, function (err, response) {
  if (err) throw err
  var ids = response.photoset.photo.map(function(p) { return p.id})
  async.map(ids.slice(0,10000), flickr.info, function(err, photos){
    if (err) throw err
    var filename = path.resolve(__dirname + "/../assets/images/_data.json")
    fs.writeFileSync(filename, JSON.stringify(photos, null, 2))
    console.log("Wrote data for %d images to %s", ids.length, filename)
  })
})
