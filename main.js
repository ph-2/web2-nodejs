var http = require('http');
var url = require('url');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(queryData.id)
    if(_url == '/'){
        title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    fs.readFile(`data/${queryData.id}`,'utf8', function(err, description){
        var template = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>WEB2 - ${title}</title>
  </head>
  <body>
    <h1><a href="/">나의 명반</a></h1>
    <ol>
      <li><a href="/?id=TheAnecdote">The Anecdote</a></li>
      <li><a href="/?id=24.26">24:26</a></li>
      <li><a href="/?id=Legend">전설</a></li>
    </ol>
    <h2>${title} 공식 앨범 설명</h2>
    <p>
        ${description}
    </p>
  </body>
</html>

    `;
        response.end(template);
    });



});
app.listen(3447);