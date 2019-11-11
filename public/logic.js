$(document).ready(function(){

});
$( "#subButn" ).click(function() {
    var inputVal = $('#repoInput').val();
    //console.log(inputVal);
    var pathArray = inputVal.split('/');
    //console.log(pathArray);
    var userName = pathArray[3];
    var repoName = pathArray[4];
    //console.log(userName);
    //console.log(repoName);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/dependencies?repo=" + repoName + "&user=" + userName,
        "method": "GET",
      }
      //console.log(settings);
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:8080/dependencies/lifecheck",
        "dataType":"json",
        "method": "GET",
        }

        $.ajax(settings).done(function (response) {
          console.log(response);

          if(response){
            var len = response.length;
            var txt = "";
            if(len > 0){
                for(var i=0;i<len;i++){
                    if(response[i].moduleName && response[i].installed && response[i].latest){
                        txt += "<tr><td>"+response[i].moduleName+"</td><td>"+response[i].installed+"</td><td>"+response[i].latest+"</td></tr>";
                    }
                }
                if(txt != ""){
                    $("#table").append(txt).removeClass("hidden");
                }
            }
        }
    },

        );
  });
  