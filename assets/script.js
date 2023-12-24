// elements
const elGameButtons = document.getElementById("game-buttons");
const elGameTitle = document.getElementById("game-title");
const elNewGame = document.getElementById("new-game");
const elModalOpen = document.getElementById("modal-open");
const elModalClose = document.getElementById("modal-close");
const elModal = document.getElementById("modal");

// constants
const array = Array.from({ length: 15 }, (_, idx) => idx + 1);
let isGameOver = false;

let shuffledArray = shuffleArray(array);
shuffledArray.push(16);

// functions
function shuffleArray(array) {
  const copiedArray = [...array];

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [copiedArray[i], copiedArray[randomIndex]] = [
      copiedArray[randomIndex],
      copiedArray[i],
    ];
  }

  return copiedArray;
}

function renderButtons(array = []) {
  elGameButtons.innerHTML = "";
  let html = "";

  array.forEach((number, idx) => {
    html += `
    <button class="game__button ${
      number === 16 && "game__button--active"
    }" type="button" data-index=${idx}>
      ${number}
    </button>`;
  });

  elGameButtons.innerHTML = html;
}

function changePosition(oldPosition, newPosition) {
  if (shuffledArray[oldPosition] === 16) {
    const val = shuffledArray[oldPosition];

    shuffledArray[oldPosition] = shuffledArray[newPosition];
    shuffledArray[newPosition] = val;
    renderButtons(shuffledArray);
  }
}

function checkIsGameOver(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
}

function onGameButtonChangeClick(e) {
  const el = e.target.closest("[data-index]");
  if (!el || isGameOver) return;

  const idx = +el.dataset.index;

  changePosition(idx - 1, idx);
  changePosition(idx + 1, idx);
  changePosition(idx - 4, idx);
  changePosition(idx + 4, idx);

  if (checkIsGameOver(shuffledArray)) {
    isGameOver = true;
    elGameTitle.textContent = "Qoyil, siz yutdingiz!";
    elGameButtons.classList.add("game__buttons--game-over");
  }
}

// called
renderButtons(shuffledArray);

// click events
elGameButtons.addEventListener("click", onGameButtonChangeClick);
elNewGame.addEventListener("click", () => location.reload());

elModalOpen.addEventListener("click", () => {
  elModal.classList.remove("modal--hidden");
});

elModalClose.addEventListener("click", () => {
  elModal.classList.add("modal--hidden");
});
