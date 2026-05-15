import { pronouns } from "./pronouns.js";
import { verbs } from "./verbs.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const card = document.getElementById("card");

function generateCard() {
  // очищаем карточку
  card.innerHTML = "";

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

  // ВОПРОС
  const question = document.createElement("div");

  question.classList.add("question");

  question.textContent = `${translation}`;

  // ОТВЕТ
  const answer = document.createElement("div");

  answer.classList.add("answer");

  answer.textContent = `${pronoun.fr} ${verbForm}`;

  // вставка
  card.appendChild(question);
  card.appendChild(answer);

  setTimeout(() => {
    answer.classList.add("show");
  }, 640);
}

// первая карточка
generateCard();

// тап / клик по карточке
card.addEventListener("click", generateCard);
