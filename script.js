/* =========================
   👋 MESSAGE DE BIENVENUE
========================= */

function welcome() {
  // On affiche un message dans l'élément avec id="welcome"
  document.getElementById("welcome").innerText =
    "Bienvenue dans EasyLearn !";
}

/* =========================
   📊 GESTION PROGRESSION (NUMÉRIQUE)
========================= */

// Récupérer le niveau actuel
function getProgress() {

  // On lit la progression dans le navigateur
  let progress = localStorage.getItem("progress");

  // Si rien n'est stocké → commencer à 1
  return progress ? parseInt(progress) : 1;
}

// Sauvegarder le niveau
function setProgress(level) {

  // On enregistre un nombre (ex: 2, 3, 4…)
  localStorage.setItem("progress", level);
}

/* =========================
   🔒 BLOQUER LES LEÇONS
========================= */

function checkAccess(currentLesson) {

  // On récupère la progression actuelle
  let progress = getProgress();

  // Si l'utilisateur essaie d'accéder à une leçon non débloquée
  if (currentLesson > progress) {

    // Message d'erreur
    alert("🔒 Tu dois finir les leçons précédentes !");

    // Redirection vers la bonne leçon
    window.location.href = "lecon" + progress + ".html";
  }
}

/* =========================
   🧠 QUIZ
========================= */
function goToQuiz(page) {
  window.location.href = page + ".html";
}
// Compteur de bonnes réponses
let goodAnswers = 0;

// Fonction appelée au clic
function answer(button, correct) {

  // On récupère la question
  let box = button.parentElement;

  // Message sous la question
  let msg = box.querySelector(".msg");

  // Si déjà répondu → on bloque
  if (box.classList.contains("done")) return;

  if (correct) {

    // Bonne réponse → bouton vert
    button.classList.add("correct");

    // Message
    msg.innerText = "Bonne réponse ✔️";

    // On bloque la question
    box.classList.add("done");

    // On ajoute +1 au score
    goodAnswers++;

  } else {

    // Mauvaise réponse → bouton rouge
    button.classList.add("wrong");

    // Message d'erreur
    msg.innerText = "❌ Mauvaise réponse, réessaie !";
  }
}

/* =========================
   🚀 FIN QUIZ
========================= */

function finishQuiz(nextLessonNumber) {

  // Nombre total de questions
  let total = document.querySelectorAll(".question").length;

  // Si toutes les réponses ne sont pas correctes
  if (goodAnswers < total) {

    alert("❗ Tu dois réussir toutes les questions !");
    return;
  }
  if (nextLessonNumber === "fin"){
    //redirection vers fin.html
    window.location.href = "fin.html";
  }
  else{
    //sinon prochaine lecon normale
    window.location.href = "lecon" + nextLessonNumber + ".html";
  }
}

/* =========================
   🎉 FIN DU COURS
========================= */

function finishCourse() {

  // Message final
  alert("🎉 Bravo ! Tu as terminé le cours !");

  // Optionnel : reset progression
  // localStorage.setItem("progress", "1");

  // Aller à la page finale
  window.location.href = "fin.html";
}
// 🔹 Charger Python dans le navigateur (une seule fois)
let pyodideReady = loadPyodide();

// 🔹 Fonction appelée quand on clique sur "Run"
async function runCode(button) {

    // 🔹 Attendre que Pyodide soit prêt
    let pyodide = await pyodideReady;

    // 🔹 Trouver le bloc lié au bouton cliqué
    let container = button.parentElement;

    // 🔹 Récupérer le code écrit dans ce bloc
    let code = container.querySelector(".code").value;

    // 🔹 Récupérer la zone de résultat
    let outputElement = container.querySelector(".output");

    try {
        // 🔹 Rediriger print() vers une variable
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);

        // 🔹 Exécuter le code Python
        pyodide.runPython(code);

        // 🔹 Récupérer ce que print() a affiché
        let output = pyodide.runPython("sys.stdout.getvalue()");

        // 🔹 Afficher le résultat
        outputElement.textContent = output || "Code exécuté !";

    } catch (err) {
        // 🔴 Si erreur → afficher l'erreur
        outputElement.textContent = err;
    }
}