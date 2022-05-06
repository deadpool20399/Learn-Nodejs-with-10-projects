/**Author: Avinash Singh */

// Import Http module for creating a web server
const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

// create a array of mime type
const mimeTypes = {
  html: "text/html",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  js: "text/javascript",
  css: "text/css",
};

// create a server
http
  .createServer((req, res) => {
    const uri = url.parse(req.url).pathname;
    // process.cwd() returns current working directory of process
    const fileName = path.join(process.cwd(), unescape(uri));
    console.log("Loading " + uri);
    let stats;
    try {
      stats = fs.lstatSync(fileName);
    } catch (error) {
      console.error(error);
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 Not Found");
      res.end();
      return;
    }

    // check if file/directory
    if (stats.isFile()) {
      let mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
      res.writeHead(200, { "Content-tpe": mimeType });
      // create a file stream
      let fileStream = fs.createReadStream(fileName);
      fileStream.pipe(res);
    } else if (stats.isDirectory()) {
      res.writeHead(302, { Location: "index.html" });
      res.end();
    } else {
      res.writeHead(500, { "Content-type": "text/plain" });
      res.write("500 Internal Error");
      res.end();
    }
  })
  .listen(3000);
