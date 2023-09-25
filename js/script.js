const container = document.getElementById("container");
const boutons = document.getElementsByClassName("boutons");

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
      <img src="img/${this.nom}.${this.extension}" alt="${this.nom}">
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

container.innerHTML = web.carte;
container.innerHTML += javascript.carte;
container.innerHTML += dates20.carte;
container.innerHTML += nintendo.carte;
container.innerHTML += nombres.carte;
container.innerHTML += microsoft.carte;
container.innerHTML += php.carte;
container.innerHTML += internet.carte;

for (i = 0; i < boutons.length; i++) {
  const checked = document.getElementById(boutons[i].id);
  checked.addEventListener("click", () => {
    console.log(checked);

    if (checked.id.includes("Debutant")) {
      niveau = "débutant";
    } else if (checked.id.includes("Confirme")) {
      niveau = "confirmé";
    } else {
      niveau = "expert";
    }

    fetch(`./json/quizz${checked.name}.json`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.quizz);
        prenom = window.prompt("Veuillez saisir votre prénom");

        container.style.display = "block";
        container.innerHTML = `
        <h2>${checked.parentElement.children[0].textContent} - Niveau ${niveau}</h2>
        <h2><span>${prenom}</span>, vous allez pouvoir démarrer ce Quizz</h2>
        <img src="img/${checked.name}.png" alt="${checked.name}">
        `;
      });
  });
}
