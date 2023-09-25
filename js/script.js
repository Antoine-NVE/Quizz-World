const container = document.getElementById("container");

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
      <input id="${this.nom}Debutant" type="radio" name="${this.nom}">
      <label for="${this.nom}Debutant">Débutant</label>
      <input id="${this.nom}Confirme" type="radio" name="${this.nom}">
      <label for="${this.nom}Confirme">Confirmé</label>
      <input id="${this.nom}Expert" type="radio" name="${this.nom}">
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

container.innerHTML += web.carte;
container.innerHTML += javascript.carte;
container.innerHTML += dates20.carte;
container.innerHTML += nintendo.carte;
container.innerHTML += nombres.carte;
container.innerHTML += microsoft.carte;
container.innerHTML += php.carte;
container.innerHTML += internet.carte;
