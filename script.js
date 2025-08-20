const authForm = document.getElementById('authForm');
const authSection = document.getElementById('authSection');
const mainPortal = document.getElementById('mainPortal');
const contentArea = document.getElementById('contentArea');

// --- Gestion Authentification ---
authForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (username === "Elias Strongman" && password === "1901") {
    authSection.classList.add('hidden');
    mainPortal.classList.remove('hidden');
  } else {
    alert("Identifiants incorrects !");
  }
});

function logout() {
  mainPortal.classList.add('hidden');
  authSection.classList.remove('hidden');
  authForm.reset();
}

// --- Fonctions pour navigation ---
function showAbout() {
  contentArea.innerHTML = `
    <h3>À propos de l'école</h3>
    <p>Le Complexe Scolaire La Patience est dédié à l'excellence académique et à la formation humaine. 
    Nous cultivons la discipline, la rigueur et la foi.</p>
  `;
}

function showHistory() {
  contentArea.innerHTML = `
    <h3>Historique</h3>
    <p>Fondée par les sœurs missionnaires, l'école a vu le jour en 1995 avec pour mission 
    d'éduquer dans la foi, la science et la conscience.</p>
  `;
}

function showForm() {
  contentArea.innerHTML = `
    <h3>Prenez votre inscription</h3>
    <form id="inscriptionForm">
      <input type="text" id="nom" placeholder="Nom" required />
      <input type="text" id="postnom" placeholder="Postnom" required />
      <input type="text" id="prenom" placeholder="Prénom" required />
      <input type="text" id="lieu" placeholder="Lieu de naissance" required />
      <input type="date" id="naissance" required />
      <input type="text" id="adresse" placeholder="Adresse" required />
      <input type="text" id="contact" placeholder="Contact des parents" required />
      <select id="option" required>
        <option value="">Option</option>
        <option value="Commercial et gestion">Commercial et gestion</option>
        <option value="Construction">Construction</option>
        <option value="Autre">Autre</option>
      </select>
      <select id="sexe" required>
        <option value="">Sexe</option>
        <option value="Masculin">Masculin</option>
        <option value="Féminin">Féminin</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  `;

  document.getElementById("inscriptionForm").addEventListener("submit", saveStudent);
}

// --- Sauvegarde des élèves ---
function saveStudent(e) {
  e.preventDefault();

  let student = {
    nom: document.getElementById("nom").value,
    postnom: document.getElementById("postnom").value,
    prenom: document.getElementById("prenom").value,
    lieu: document.getElementById("lieu").value,
    naissance: document.getElementById("naissance").value,
    adresse: document.getElementById("adresse").value,
    contact: document.getElementById("contact").value,
    option: document.getElementById("option").value,
    sexe: document.getElementById("sexe").value
  };

  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  alert("Élève ajouté avec succès ✅");
  showStudents();
}

// --- Affichage des élèves ---
function showStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];

  if (students.length === 0) {
    contentArea.innerHTML = "<p>Aucun élève inscrit pour l'instant.</p>";
    return;
  }

  let table = `
    <h3>Liste des élèves inscrits</h3>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Postnom</th>
          <th>Prénom</th>
          <th>Lieu</th>
          <th>Date Naissance</th>
          <th>Adresse</th>
          <th>Contact</th>
          <th>Option</th>
          <th>Sexe</th>
        </tr>
      </thead>
      <tbody>
        ${students.map(s => `
          <tr>
            <td>${s.nom}</td>
            <td>${s.postnom}</td>
            <td>${s.prenom}</td>
            <td>${s.lieu}</td>
            <td>${s.naissance}</td>
            <td>${s.adresse}</td>
            <td>${s.contact}</td>
            <td>${s.option}</td>
            <td>${s.sexe}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  contentArea.innerHTML = table;
}