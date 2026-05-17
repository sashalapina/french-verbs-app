import { pronouns } from "./pronouns.js";
import { verbs } from "./verbs.js";

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const card = document.getElementById("card");

function generateCard() {
  // очищаем карточку
  card.innerHTML = "";

  // получить подсказку;
  let hintMode = document.getElementById("hint").checked;

  // случайное местоимение
  const pronoun = pronouns[randomInt(0, pronouns.length - 1)];

  // случайный глагол
  const verb = verbs[randomInt(0, verbs.length - 1)];

  // нужная форма
  const formObj = verb.forms.find(
    (f) => f.person.toLowerCase() === pronoun.fr.toLowerCase(),
  );

  const translation = formObj.translation;
  const verbForm = formObj.conjugation;
  const hintVerb = `${formObj.person} ${verb.infinitive}`;

  // ВОПРОС
  const question = document.createElement("div");

  question.classList.add("question");

  question.textContent = `${translation}`;

  if (hintMode) {
    const hint = document.createElement("p");
    hint.classList.add("hint-p");
    hint.textContent = hintVerb;
    question.append(hint);
  }

  // ОТВЕТ
  const answer = document.createElement("div");

  answer.classList.add("answer");

  answer.textContent = `${pronoun.fr} ${verbForm}`;

  // вставка
  card.appendChild(question);
  card.appendChild(answer);

  setTimeout(() => {
    answer.classList.add("show");
  }, 2000);
}

// первая карточка
generateCard();

// тап / клик по карточке
card.addEventListener("click", generateCard);
