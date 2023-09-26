const container = document.getElementById("container");
const boutons = document.getElementsByClassName("boutons");
const start = document.getElementById("start");
const dropArea = document.getElementById("dropArea");
const propositions = document.getElementsByClassName("propositions");
const anecdotes = document.getElementById("anecdotes");
const description = document.getElementById("description");
let questionNumero = 0;
let juste = false;
let score = 0;

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

container.innerHTML =
  web.carte +
  javascript.carte +
  dates20.carte +
  nintendo.carte +
  nombres.carte +
  microsoft.carte +
  php.carte +
  internet.carte;

for (i = 0; i < boutons.length; i++) {
  const checked = document.getElementById(boutons[i].id);
  choix = checked;
  checked.addEventListener("click", () => {
    if (checked.id.includes("Debutant")) {
      niveau = "débutant";
    } else if (checked.id.includes("Confirme")) {
      niveau = "confirmé";
    } else {
      niveau = "expert";
    }

    prenom = window.prompt("Veuillez saisir votre prénom");
    image = document.getElementById(checked.name);

    fetch(`./json/quizz${checked.name}.json`)
      .then((response) => response.json())
      .then((response) => {
        answer = response.quizz;

        container.style.flexDirection = "column";
        description.innerHTML = `<h2>${checked.parentElement.children[0].textContent} - Niveau ${niveau}</h2>`;
        container.innerHTML = `
          <h2><span>${prenom}</span>, vous allez pouvoir démarrer ce Quizz</h2>
          <img src="${image.src}" alt="${checked.name}">
        `;
        start.style.display = "block";
      });
  });
}

start.addEventListener("click", () => {
  if (start.textContent == "Accueil") {
    window.location.reload();
  }

  if (juste == true) {
    score = score + 1;
    juste = false;
  }

  start.style.display = "none";
  dropArea.style.background = "white";
  dropArea.innerHTML = "<p>Posez votre réponse ici</p>";

  if (questionNumero == 0) {
    start.textContent = "Suivant";
    dropArea.style.display = "flex";

    if (niveau === "débutant") {
      answer = answer.débutant;
    } else if (niveau === "confirmé") {
      answer = answer.confirmé;
    } else {
      answer = answer.expert;
    }
  }

  if (questionNumero == 10) {
    container.innerHTML = `
      <p>Quizz Terminé !</p>
      <p>${prenom}, vous avez obtenu le score de ${score}/10</p>
    `;

    dropArea.style.display = "none";

    start.innerHTML = "Accueil";
    start.style.display = "block";
  } else {
    anecdotes.innerHTML = "";

    questionNumero++;

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

    for (i = 0; i < propositions.length; i++) {
      const prop = document.getElementById(propositions[i].id);
      prop.addEventListener("dragstart", () => {
        dropArea.addEventListener("dragenter", () => {
          prop.addEventListener("dragend", () => {
            prop.remove();
            dropArea.innerHTML = `<button id="${prop.id}" class="propositions" draggable="true">${prop.textContent}</button>`;
            for (j = 0; j < propositions.length; j++) {
              document
                .getElementById(propositions[j].id)
                .setAttribute("draggable", "false");
            }

            console.log(answer);

            start.style.display = "block";
            if (prop.id == answer[questionNumero - 1].réponse) {
              juste = true;
              dropArea.style.background = "rgb(24, 255, 3)";
              document.getElementById(prop.id).style.background =
                "rgb(65, 214, 60)";
              anecdotes.innerHTML = answer[questionNumero - 1].anecdote;
            } else {
              dropArea.style.background = "rgb(196, 12, 4)";
              document.getElementById(
                answer[questionNumero - 1].réponse
              ).style.background = "rgb(24, 255, 3)";
            }
          });
        });
      });
    }
  }
});
