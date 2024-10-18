const kezdGomb = document.getElementById('start-btn');
const kovetkezoGomb = document.getElementById('next-btn');
const kerdesContainer = document.getElementById('question-container');
const kerdesElem = document.getElementById('question');
const valaszGombokElem = document.getElementById('answer-buttons');
const eredmenyContainer = document.getElementById('result-container');
const helyesValaszElem = document.getElementById('correct-answers');
const helytelenValaszElem = document.getElementById('wrong-answers');

let kevertKerdesek, aktualisKerdesIndex;
let helyesValaszok = 0;
let helytelenValaszok = 0;

kezdGomb.addEventListener('click', kezdes);
kovetkezoGomb.addEventListener('click', () => {
    aktualisKerdesIndex++;
    kovetkezoKerdes();
});

function kezdes() {
    kezdGomb.classList.add('hide');
    kevertKerdesek = kerdesek.sort(() => Math.random() - 0.5);
    aktualisKerdesIndex = 0;
    document.getElementById('quiz-container').classList.remove('hide');
    helyesValaszok = 0;
    helytelenValaszok = 0;
    kovetkezoKerdes();
}

function kovetkezoKerdes() {
    alapAllapotVissza();
    mutatKerdes(kevertKerdesek[aktualisKerdesIndex]);
}

function mutatKerdes(kerdes) {
    kerdesElem.innerText = kerdes.kerdes;
    kerdes.valasz.forEach(valasz => {
        const gomb = document.createElement('button');
        gomb.innerText = valasz.text;
        gomb.classList.add('btn');
        if (valasz.correct) {
            gomb.dataset.correct = valasz.correct;
        }
        gomb.addEventListener('click', valaszKivalasztas);
        valaszGombokElem.appendChild(gomb);
    });
}

function alapAllapotVissza() {
    torolStatuszt(document.getElementById('quiz-container'));
    kovetkezoGomb.classList.add('hide');
    while (valaszGombokElem.firstChild) {
        valaszGombokElem.removeChild(valaszGombokElem.firstChild);
    }
}

function valaszKivalasztas(e) {
    const valasztottGomb = e.target;
    const helyes = valasztottGomb.dataset.correct === 'true';
    statuszBeallitas(document.getElementById('quiz-container'), helyes);
    if (helyes) {
        helyesValaszok++;
    } else {
        helytelenValaszok++;
    }
    Array.from(valaszGombokElem.children).forEach(gomb => {
        statuszBeallitas(gomb, gomb.dataset.correct === 'true');
    });
    if (kevertKerdesek.length > aktualisKerdesIndex + 1) {
        kovetkezoGomb.classList.remove('hide');
    } else {
        eredmenyMutat();
    }
}

function statuszBeallitas(elem, helyes) {
    torolStatuszt(elem);
    if (helyes) {
        elem.classList.add('correct');
    } else {
        elem.classList.add('wrong');
    }
}

function torolStatuszt(elem) {
    elem.classList.remove('correct');
    elem.classList.remove('wrong');
}

function eredmenyMutat() {
    document.getElementById('quiz-container').classList.add('hide');
    eredmenyContainer.classList.remove('hide');
    helyesValaszElem.innerText = helyesValaszok;
    helytelenValaszElem.innerText = helytelenValaszok;
}
