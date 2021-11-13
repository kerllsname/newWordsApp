export default function getWords() {
  const btn = document.querySelector(".renew-icon");

  changeWords({ random: true });

  btn.addEventListener("click", changeWords);
}

async function changeWords({ random = false }) {
  const engWord = document.querySelector(".eng-word");
  const deuWord = document.querySelector(".deu-word");
  const words = await getListWords();
  let num = random
    ? getRandomNumber()
    : safeIncrement(localStorage.getItem("index"), [
        1,
        Object.keys(words).length,
      ]);

  localStorage.setItem("index", num);

  engWord.innerHTML = `${words[num].eng}`;
  deuWord.innerHTML = `${words[num].deu}`;
}

async function getListWords() {
  const url = "../accets/jsons/words.json";

  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data[0].words);
}

function getRandomNumber() {
  let num = Math.floor(Math.random() * 7) + 1;

  return num;
}

function safeIncrement(num, [start, end]) {
  num++;
  console.log(start, end);
  if (num <= end) return num;
  else return start;
}
