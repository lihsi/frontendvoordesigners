/*eslint-env browser*/

/*Een array met alle afbeeldingen*/
var imgPlant = ['images/plant.png', 'images/plantTwee.png', 'images/plantDrie.png', 'images/plantVier.png', 'images/plantVijf.png', 'images/plantZes.png'];

/*Een html element wordt toegewezen aan een var
Bron: Events opdracht en https://www.w3schools.com/tags/tag_progress.asp*/
var progressBar = document.querySelector('progress');
var knopWater = document.querySelectorAll('button')[0];
var knopPerservative = document.querySelectorAll('button')[1];
var knopSun = document.querySelectorAll('button')[2];
var restart = document.querySelectorAll('button')[3];
var tekst = document.querySelectorAll('p')[0];
var imgDefault = document.querySelectorAll('img')[0];

//Geeft het aantal clicks aan, aan het begin van de game

var click = 0;



/*Disabled de restart button aan het begin van de game*/

restart.disabled = true;

/*Deze functie reset het process van de game na 20 seconde als de conditie waar is*/

function tijd() {
    if (click >= 1 && click < 20) {
        click = 0;
        progressBar.value = 0;
        tekst.textContent = "Oh no, you forgot to take care of me for a while ): ";
        imgDefault.src = imgPlant[0];
        knopSun.disabled = false;
        knopWater.disabled = false;
        knopPerservative.disabled = false;
    }
}

var interval = setInterval(tijd, 20000);

/*Deze functie haalt de juiste afbeelding op en toont de voortgang op de progressbar*/

function evolutie() {
    click++;
    for (var i = 0; i <= click; i++) {
        progressBar.value = i;
    }
    if (click < 3) {
        imgDefault.src = imgPlant[0];
    }
    if (click > 3) {
        imgDefault.src = imgPlant[1];
    }
    if (click > 5) {
        imgDefault.src = imgPlant[2];
    }
    if (click > 10) {
        imgDefault.src = imgPlant[3];
    }
    if (click > 15) {
        imgDefault.src = imgPlant[4];
    }
    if (click >= 20) {
        imgDefault.src = imgPlant[5];
    }

}

/*Tekst functies weergeven een tekst in de game*/

function waterTekst() {
    tekst.textContent = "Thank you so much! ";
}

function persTekst() {
    tekst.textContent = "I feel so much stronger! ";
}

function sunTekst() {
    tekst.textContent = "What a beautiful day! ";
}

/*Button functies zorgen ervoor dat je niet steeds op dezelfde buttons kunt klikken*/

function buttonEen() {
    knopWater.disabled = true;
    knopPerservative.disabled = false;
    knopSun.disabled = false;
}

function buttonTwee() {
    knopPerservative.disabled = true;
    knopSun.disabled = false;
    knopWater.disabled = false;
}

function buttonDrie() {
    knopSun.disabled = true;
    knopWater.disabled = false;
    knopPerservative.disabled = false;
}

//Deze functie stopt het resetten van het proces

function finale() {
    if (click >= 20) {
        knopSun.disabled = true;
        knopWater.disabled = true;
        knopPerservative.disabled = true;
        tekst.textContent = "I'm a fully grown flower now thank you very much! ";
        restart.disabled = false;
    }
}

/*Deze functie returned een zin*/

function flower(zinEen, zinTwee) {
    var sentenceCombi = zinEen + zinTwee;
    return sentenceCombi;
}

var resultaatZin = flower("Don't wait ", "to long! ");

//Deze functie restart de game

function again() {
    click = 0;
    progressBar.value = 0;
    tekst.textContent = resultaatZin;
    imgDefault.src = imgPlant[0];
    knopSun.disabled = false;
    knopWater.disabled = false;
    knopPerservative.disabled = false;
    restart.disabled = true;

}

var digit; //deze variabele checked welke toets mag worden geklikt
document.addEventListener('keypress', function(event) {
  
    if (event.code == 'Digit1' && digit != 1) {
        digit =1;
        
        buttonEen();
        evolutie();
        waterTekst();
        finale(); 

      
      
  }
    else if (event.code == 'Digit2' && digit !=2) {
        digit =2; 
        
    buttonTwee();
    evolutie();
    persTekst();
    finale();
  }
    else if (event.code == 'Digit3' && digit !=3) {
        digit =3;
        
    buttonDrie();
    evolutie();
    sunTekst();
    finale();
  }
    else if (event.code == 'Enter') {
    again();
      digit =0;  
  }
    
    console.log("digit", digit);
});



/*Alle knoppen die een functie uitvoeren als erop wordt geklikt*/


knopWater.addEventListener('click', evolutie, false);
knopWater.addEventListener('click', waterTekst, false);
knopWater.addEventListener('click', buttonEen, false);
knopWater.addEventListener('click', finale, false);

knopPerservative.addEventListener('click', evolutie, false);
knopPerservative.addEventListener('click', persTekst, false);
knopPerservative.addEventListener('click', buttonTwee, false);
knopPerservative.addEventListener('click', finale, false);

knopSun.addEventListener('click', evolutie, false);
knopSun.addEventListener('click', sunTekst, false);
knopSun.addEventListener('click', buttonDrie, false);
knopSun.addEventListener('click', finale, false);

restart.addEventListener('click', again, false);