/*eslint-env browser*/
var bookShow = document.querySelectorAll('button')[0];
var bookHide = document.querySelectorAll('button')[1];
var badge = document.querySelectorAll('span')[0];


bookShow.addEventListener("click", function () {
    bookShow.classList.add('hidden');
    bookHide.classList.remove('hidden');
    badge.classList.remove('hidden');

});


bookHide.addEventListener("click", function () {
    bookHide.classList.add('hidden');
    bookShow.classList.remove('hidden');
    badge.classList.add('hidden');
});

//Geselecteerde icoon wordt vervangen door toevoeg icoon, nontificatie wordt verwijderd

