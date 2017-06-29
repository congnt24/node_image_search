// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var req = require('request')

var api =  'https://www.googleapis.com/customsearch/v1'
var key = 'AIzaSyBGWctPfVM8Q_y2J0qokP5iI-VC_PbcZQk'
var cx = '015800225931071555773:efvt__uju1c'


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/:param", function (request, response) {
  var parent = response
  var params = {key: key, cx: cx}
  var search = request.params.param
  var offset = request.query.offset
  
  if(search == null || offset == undefined){
    response.end("Error");
  }
  params['q'] = search
  params['num'] = offset
  //request to google search api
  req.get({url: api, qs:params, json: true}, (error, res, body) => {
    if(res.statusCode == 200){
      var items= body.items
      var outArr = []
      items.forEach((item) =>{
        var output = {"url":"","snippet":"","thumbnail":"","context":""}
        output['url'] = item.pagemap.cse_image[0].src
        output['thumbnail'] = item.pagemap.cse_thumbnail[0].src
        output['context'] = body.context.title
        output['snippet'] = item.snippet
        outArr.push(output)
      })
        response.end(JSON.stringify(outArr))
    }
  })
  
  
  // response.end("");
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
