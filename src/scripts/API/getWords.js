export default function getWords() {
  const btn = document.querySelector('.renew-icon');

  startWords();

  btn.addEventListener('click', changeWords)
}

async function startWords() {
  const engWord = document.querySelector('.eng-word');
  const deuWord = document.querySelector('.deu-word');
  const words = await getListWords();
  const num = getRandomNumber();

  localStorage.setItem('index', num);

  engWord.innerHTML = `${words[0].words[num].eng}`;
  deuWord.innerHTML = `${words[0].words[num].deu}`;
}

async function changeWords() {
  const engWord = document.querySelector('.eng-word');
  const deuWord = document.querySelector('.deu-word');
  const words = await getListWords();
  let num = changeIndex();

  engWord.innerHTML = `${words[0].words[num].eng}`;
  deuWord.innerHTML = `${words[0].words[num].deu}`;
}

async function getListWords() {
  const url = '../accets/jsons/words.json';

  return await fetch(url).then(response => response.json());
}

function getRandomNumber() {
  let num = Math.floor(Math.random() * 7) + 1;

  return num
}

function changeIndex() {
  let num = localStorage.getItem('index');

  if (num < 7) {
    num++;
    localStorage.setItem('index', num);
    return num
  } else {
    localStorage.setItem('index', 1);
    return 1
  }
}