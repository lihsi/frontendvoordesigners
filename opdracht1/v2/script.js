/*eslint-env browser*/

//Haalt alles met class like-button en span op pakt vervolgens eerste span
var saveButton = document.querySelectorAll(".savebutton");
var badge = document.querySelectorAll('span')[0];

//Een loop waarin wordt getoggeld tussen images voor de button
//Triggert ook de zichtbaarheid van de span

for (var i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener("click", function () {
        this.classList.toggle("active");
        this.classList.toggle("check");
        this.classList.toggle("toevoegen");

        if (this.classList.contains("check")) {
            this.src = "img/check.png";
        } else if (this.classList.contains("toevoegen")) {
            this.src = "img/toevoegen.png";
        }
        tellerOpslaan();
    });
}

//Teller weergeeft aantal binnen de span, span is zichtbaar zolang teller boven 1 blijft
//Er moet dus een film worden toegevoegd om span(nontificatie) zichtbaar te maken

function tellerOpslaan() {
    var opslaan = document.querySelectorAll(".savebutton.active").length;

    document.querySelector("span").innerHTML = opslaan;

    setTimeout(function () {
        if (opslaan >= 1) {
            badge.classList.remove('hidden')
            badge.classList.add('element-animation')
        }
    }, 1000);
    badge.classList.remove('element-animation');
    if (opslaan == 0) {
        badge.classList.add('hidden')
    }
}

//Source: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle