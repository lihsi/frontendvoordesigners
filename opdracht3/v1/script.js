var uri = "https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json";

var request = new XMLHttpRequest();
request.open('get', uri);
request.responseType = 'json';
request.send();

request.addEventListener("load", function(){
  console.log("request is geladen: ",request.response);

  var data = request.response;
    
  var main = document.querySelector("main");
  for(var i = 0; i < data.length; i++)
  {
    var film = data[i];
      
    var titel = document.createElement("h2");
    titel.textContent = film.title;
    main.appendChild(titel);
    
    var simplePlot = document.createElement("p");
    simplePlot.textContent = film.simple_plot;
    main.appendChild(simplePlot);
    
    var filmCover = document.createElement("img");
    filmCover.src = film.cover;
    main.appendChild(filmCover);  
  }
});