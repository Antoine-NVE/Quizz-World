// ------------
// VARIABLES
// ------------

// Variables pour l'affichage
const container = document.getElementById("container");
const boutons = document.getElementsByClassName("boutons");
const start = document.getElementById("start");
const dropArea = document.getElementById("dropArea");
const propositions = document.getElementsByClassName("propositions");
const anecdotes = document.getElementById("anecdotes");
const description = document.getElementById("description");

// Variables qui gèrent le numéro de la question, le score et le niveau
let questionNumero = 0;
let score = 0;

// ---------
// OBJETS
// ---------

class Quizz {
  constructor(titre, nom, extension) {
    this.titre = titre;
    this.nom = nom;
    this.extension = extension;
  }

  get carte() {
    return `
      <div class="cartes">
        <h2>${this.titre}</h2>
        <img id="${this.nom}" src="img/${this.nom}.${this.extension}" alt="${this.nom}">
        <input class="boutons" id="${this.nom}Debutant" type="radio" name="${this.nom}">
        <label for="${this.nom}Debutant">Débutant</label>
        <input class="boutons" id="${this.nom}Confirme" type="radio" name="${this.nom}">
        <label for="${this.nom}Confirme">Confirmé</label>
        <input class="boutons" id="${this.nom}Expert" type="radio" name="${this.nom}">
        <label for="${this.nom}Expert">Expert</label>
      </div>
    `;
  }
}

const web = new Quizz("Applications Web", "web", "jpg");
const javascript = new Quizz("JavaScript", "javascript", "png");
const dates20 = new Quizz("Le XXième Siècle", "dates20", "jpg");
const nintendo = new Quizz("Nintendo", "nintendo", "jpg");
const nombres = new Quizz("Trouver le Nombre", "nombres", "jpg");
const microsoft = new Quizz("Microsoft", "microsoft", "jpg");
const php = new Quizz("PHP", "php", "jpg");
const internet = new Quizz("Méandres d'Internet", "internet", "jpg");

// --------------------
// AFFICHAGE INITIAL
// --------------------

container.innerHTML =
  web.carte +
  javascript.carte +
  dates20.carte +
  nintendo.carte +
  nombres.carte +
  microsoft.carte +
  php.carte +
  internet.carte;

anecdotes.style.background = "transparent";

// --------
// DEBUT
// --------

// Détecte le clique d'un bouton radio
for (i = 0; i < boutons.length; i++) {
  const checked = document.getElementById(boutons[i].id);
  checked.addEventListener("click", () => {
    // Récupère le niveau choisi

    // Demande le prénom et récupère la source de l'image du sujet choisi
    prenom = window.prompt("Veuillez saisir votre prénom");
    image = document.getElementById(checked.name).src;

    // Récupère le json et crée un array avec
    fetch(`./json/quizz${checked.name}.json`)
      .then((response) => response.json())
      .then((response) => {
        answer = response.quizz;

        // Récupère le niveu choisi
        if (checked.id.includes("Debutant")) {
          niveau = "débutant";
          answer = answer.débutant;
        } else if (checked.id.includes("Confirme")) {
          niveau = "confirmé";
          answer = answer.confirmé;
        } else {
          niveau = "expert";
          answer = answer.expert;
        }

        // Affichage de la suite
        container.style.flexDirection = "column";
        description.innerHTML = `<h2>${checked.parentElement.children[0].textContent} - Niveau ${niveau}</h2>`;
        container.innerHTML = `
          <h2><span>${prenom}</span>, vous allez pouvoir démarrer ce Quizz</h2>
          <img src="${image}" alt="${checked.name}">
        `;
        start.style.display = "block";
      });
  });
}

// Détecte le clic du bouton "Start", qui est également le bouton "Suivant" et "Accueil"
start.addEventListener("click", () => {
  anecdotes.innerHTML = "";
  anecdotes.style.background = "transparent";

  // Si le bouton "Accueil est cliqué, reload la page"
  if (start.textContent == "Accueil") {
    window.location.reload();
  }

  start.style.display = "none";
  dropArea.style.background = "white";
  dropArea.innerHTML = "<p>Posez votre réponse ici</p>";

  // Si c'est le début du questionnaire, transforme le bouton start
  if (questionNumero == 0) {
    start.textContent = "Suivant";
    dropArea.style.display = "flex";
  }

  // Vérifie si c'était la dernière question
  if (questionNumero == answer.length) {
    container.innerHTML = `
      <p>Quizz Terminé !</p>
      <p>${prenom}, vous avez obtenu le score de ${score}/10</p>
    `;
    dropArea.style.display = "none";
    start.innerHTML = "Accueil";
    start.style.display = "block";
  }

  // Question suivante
  else {
    questionNumero++;

    // Affichage de la question et des propositions
    container.innerHTML = `
    <p>Question ${questionNumero} : <span>${
      answer[questionNumero - 1].question
    }</span></p>
    <div class="containerPropositions">
      <button id="${
        answer[questionNumero - 1].propositions[0]
      }" class="propositions" draggable="true">${
      answer[questionNumero - 1].propositions[0]
    }</button>
      <button id="${
        answer[questionNumero - 1].propositions[1]
      }" class="propositions" draggable="true">${
      answer[questionNumero - 1].propositions[1]
    }</button>
      <button id="${
        answer[questionNumero - 1].propositions[2]
      }" class="propositions" draggable="true">${
      answer[questionNumero - 1].propositions[2]
    }</button>
      <button id="${
        answer[questionNumero - 1].propositions[3]
      }" class="propositions" draggable="true">${
      answer[questionNumero - 1].propositions[3]
    }</button>
    </div>
  `;

    // Détecte le début du drag d'un choix
    for (i = 0; i < propositions.length; i++) {
      const prop = document.getElementById(propositions[i].id);
      prop.addEventListener("dragstart", () => {
        choix = prop;
      });
    }
  }
});

// Prevent default
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// Détecte le drop sur la zone et recrée un bouton similaire dedans
dropArea.addEventListener("drop", () => {
  choix.style.visibility = "hidden";
  dropArea.innerHTML = `<button id="dropped" class="propositions" draggable="true">${choix.textContent}</button>`;

  // Enlève le draggable de toutes les propositions
  for (i = 0; i < propositions.length; i++) {
    document
      .getElementById(propositions[i].id)
      .setAttribute("draggable", "false");
  }

  // Affichage du bouton "Suivant"
  start.style.display = "block";

  // Vérifie si la réponse est la bonne
  if (choix.id == answer[questionNumero - 1].réponse) {
    score++;
    dropArea.style.background = "rgb(24, 255, 3)";
    document.getElementById("dropped").style.background = "rgb(65, 214, 60)";
    anecdotes.style.background = "rgb(225, 119, 35)";
    anecdotes.innerHTML = answer[questionNumero - 1].anecdote;
  } else {
    dropArea.style.background = "rgb(196, 12, 4)";
    document.getElementById(
      answer[questionNumero - 1].réponse
    ).style.background = "rgb(24, 255, 3)";
  }
});
