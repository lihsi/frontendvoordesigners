/*eslint-env browser*/


var request = new XMLHttpRequest();
request.open("get", "https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json");
request.responseType = "json";
request.send();


request.addEventListener("load", function () {
    var data = request.response;
    console.log(data);

    // Laadt films na loading
    setTimeout(function () {
        document.querySelector("img.loading").classList.add("hidden");
        loadMovies(data);
    }, 1000);
});

// Functie voor films laden
function loadMovies(data) {
    var movieContainer = document.querySelector("main");

    // Herhaal dit voor elke film
    for (var i = 0; i < data.length; i++) {
        let movie = data[i];

        //Maak de movie section
        var movieSection = document.createElement("section");
        movieSection.classList.add("movie");

        // Maak de overlay section
        var hoverOverlay = document.createElement("section");
        hoverOverlay.classList.add("hover-overlay");

        var hoverText = document.createElement("p");
        hoverText.textContent = "Click for more info";
        hoverOverlay.appendChild(hoverText);
        movieSection.appendChild(hoverOverlay);

        // Maak de details subsection
        var detailsSection = document.createElement("section");
        detailsSection.classList.add("details");

        // Maak de movie cover image
        var movieCover = document.createElement("img");
        movieCover.setAttribute("src", movie.cover);
        movieSection.appendChild(movieCover);

        // Maak de movie title heading
        var movieTitle = document.createElement("h2");
        movieTitle.textContent = movie.title;
        detailsSection.appendChild(movieTitle);

        // Maak de movie genres paragraaf
        var movieGenres = document.createElement("p");
        movieGenres.textContent = movie.genres.join(", ");
        detailsSection.appendChild(movieGenres);

        // Click event
        movieSection.addEventListener("click", function () {
            var expandedSection = document.querySelector("section.expanded-details");
            if (document.querySelector("section.expanded-details section.details")) {
                expandedSection.removeChild(document.querySelector("section.expanded-details section.details"));
            }
            var expandedDetailsSection = document.createElement("section");
            expandedDetailsSection.classList.add("details");
            expandedSection.appendChild(expandedDetailsSection);
            var unavailableSection = document.querySelector("section.expanded-details section.unavailable");

            // Maak de movie title heading
            var expandedMovieTitle = document.createElement("h2");
            expandedMovieTitle.textContent = movie.title;
            expandedDetailsSection.appendChild(expandedMovieTitle);

            // Maak de expanded plot paragraaf
            var expandedPlot = document.createElement("p");
            expandedPlot.classList.add("plot");
            expandedPlot.textContent = movie.plot;
            expandedDetailsSection.appendChild(expandedPlot);

            // Maak de credits section
            var creditsSection = document.createElement("section");
            creditsSection.classList.add("credits");

            // Maak de actors paragraaf
            var expandedActors = document.createElement("p");
            var expandedActorsLabel = document.createElement("span");
            expandedActorsLabel.textContent = "Actors: ";

            for (var j = 0; j < movie.actors.length; j++) {
                if (j != 0) {
                    expandedActors.textContent += ", ";
                }

                expandedActors.textContent += movie.actors[j].actor_name;
            }

            expandedActors.insertBefore(expandedActorsLabel, expandedActors.firstChild);
            creditsSection.appendChild(expandedActors);

            // Maak de directors paragraaf
            var expandedDirectors = document.createElement("p");
            var expandedDirectorsLabel = document.createElement("span");
            expandedDirectorsLabel.textContent = "Directors: ";

            for (var k = 0; k < movie.directors.length; k++) {
                if (k != 0) {
                    expandedDirectors.textContent += ", ";
                }

                expandedDirectors.textContent += movie.directors[k].name;
            }

            expandedDirectors.insertBefore(expandedDirectorsLabel, expandedDirectors.firstChild);
            creditsSection.appendChild(expandedDirectors);

            // Maak de date paragraaf
            var expandedReleaseDate = document.createElement("p");
            var expandedReleaseDateLabel = document.createElement("span");
            expandedReleaseDateLabel.textContent = "Release date: ";
            expandedReleaseDate.textContent += movie.release_date;

            expandedReleaseDate.insertBefore(expandedReleaseDateLabel, expandedReleaseDate.firstChild);
            creditsSection.appendChild(expandedReleaseDate);

            // Maak de trailer button
            var trailerButton = document.createElement("button");
            trailerButton.classList.add("trailer");
            trailerButton.textContent = "Watch trailer";
            trailerButton.addEventListener("click", function () {
                expandedDetailsSection.classList.add("hidden");
                unavailableSection.classList.remove("hidden");
            });
            creditsSection.appendChild(trailerButton);

            // Click event voor unavailable return button
            var returnButton = unavailableSection.querySelector("button.return");
            returnButton.addEventListener("click", function () {
                unavailableSection.classList.add("hidden");
                expandedDetailsSection.classList.remove("hidden");
            });

            // En credits section naar de expanded section
            expandedDetailsSection.appendChild(creditsSection);

            // Maak de close button
            var closeButton = document.createElement("button");
            closeButton.classList.add("close");
            closeButton.textContent = "Close (C)";

            var closeExpandedSection = function () {
                expandedDetailsSection.parentNode.classList.add("hidden");
               
            };
            
            closeButton.addEventListener("click", function () {
            closeExpandedSection();
                });

            // Als errorstate in beeld is doet c het niet
            document.addEventListener("keypress", function (event) {
                if (event.key == 'c' && unavailableSection.classList.contains("hidden")) {
                    closeExpandedSection();
                      
                }
            });
            expandedDetailsSection.appendChild(closeButton);

            // Toon expanded section
            expandedDetailsSection.classList.remove("hidden");
            expandedDetailsSection.parentNode.classList.remove("hidden");
        })

        // Voeg details section toe aan de movie section en movie section aan de container
        movieSection.appendChild(detailsSection);
        movieContainer.appendChild(movieSection);
    }
}