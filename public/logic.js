$(document).ready(function(){

});
$( "#subButn" ).click(function() {
    var inputVal = $('#repoInput').val();
    console.log(inputVal);
    var pathArray = inputVal.split('/');
    console.log(pathArray);
    var userName = pathArray[3];
    var repoName = pathArray[4];
    console.log(userName);
    console.log(repoName);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/dependencies?repo=" + userName + "&user=" + repoName,
        "method": "GET",
        "headers": {
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "User-Agent": "PostmanRuntime/7.19.0",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Postman-Token": "42fee966-8e35-4860-935d-357d44e90d5c,51280a83-c549-4159-89ec-d97027d9cfd6",
          "Host": "localhost:8080",
          "Accept-Encoding": "gzip, deflate",
          "Connection": "keep-alive",
          "cache-control": "no-cache"
        }
      }
      console.log(settings);
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
  });