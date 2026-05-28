async function loadVerbs() {
  const response = await fetch("./data/verbs.json");

  return await response.json();
}

const themeToggle = document.getElementById("theme");

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

const verbs = await loadVerbs();

const burger = document.getElementById("burger");

const menu = document.getElementById("menu");

// открыть / закрыть menu
burger.addEventListener("click", (event) => {
  event.stopPropagation();

  menu.classList.toggle("open");
});

// клик внутри menu НЕ закрывает его
menu.addEventListener("click", (event) => {
  event.stopPropagation();
});

// клик вне menu закрывает его
document.addEventListener("click", () => {
  menu.classList.remove("open");
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const card = document.getElementById("card");

function generateCard() {
  card.innerHTML = "";

  let hintMode = document.getElementById("hint").checked;

  // случайный глагол
  const verb = verbs[randomInt(0, verbs.length - 1)];

  //случайное время
  const tenseKeys = Object.keys(verb.tenses);

  const randomTenseKey = tenseKeys[randomInt(0, tenseKeys.length - 1)];

  const tense = verb.tenses[randomTenseKey];

  // случайная форма
  const form = tense.forms[randomInt(0, tense.forms.length - 1)];

  // данные
  const translation = form.translation;

  const answerText = `${form.person} ${form.conjugation}`;

  const hintText = `${form.person} · ${verb.infinitive}`;

  //Время
  const tenseLabel = document.createElement("div");

  tenseLabel.classList.add("tense");

  tenseLabel.textContent = tense.label;

  // QUESTION
  const question = document.createElement("div");

  question.classList.add("question");

  question.textContent = translation;

  // HINT
  if (hintMode) {
    const hint = document.createElement("p");

    hint.classList.add("hint-p");

    hint.textContent = hintText;

    question.append(hint);
  }

  // ANSWER
  const answer = document.createElement("div");

  answer.classList.add("answer");

  answer.textContent = answerText;

  // append
  card.appendChild(tenseLabel);
  card.appendChild(question);
  card.appendChild(answer);

  // reveal animation
  setTimeout(() => {
    answer.classList.add("show");
  }, 2000);
}

// первая карточка
generateCard();

// тап / клик по карточке
card.addEventListener("click", generateCard);
