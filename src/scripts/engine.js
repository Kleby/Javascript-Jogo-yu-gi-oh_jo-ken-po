const state= States;

 const playerSide = PlayerSide;

const cardData = CardData;

async function playAudio(status) {
  if(status=== "draw") return;
  const audio = new Audio(`./src/assets/audios/${status}.wav`);
  audio.volume = 0.5;
  audio.play();
}

async function resetDuel() {
  state.cardSprites.selected.removeChild(state.cardSprites.avatar);
  state.cardSprites.name.innerText = "Selecione";
  state.cardSprites.type.innerText = "uma carta";

  state.actions.button.style.visibility = "hidden";
  state.fieldCards.player.style.display = "none";
  state.fieldCards.computer.style.display = "none";
  

  init();
}

async function getRandomCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}


async function removerAllCardsImage(elementId) {
  const card = document.getElementById(elementId);
  const imgElements = card.querySelectorAll("img");
  imgElements.forEach((img) => img.remove());
}

async function checkDuelResults(playerId, computerId) {
  let duelResults = "draw";
  const playerCard = cardData[playerId];

  if (playerCard.WinOf.includes(computerId)) {
    duelResults = "win";
    state.score.playerScore++;
    await playAudio("win");
  } else if (playerCard.loseOf.includes(computerId)) {
    duelResults = "win";
    state.score.computerScore++;
    await playAudio("lose");
  }

  await playAudio(duelResults);

  return duelResults.toUpperCase();
}


async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function setCardsField(idCard) {
  await removerAllCardsImage("computerCards");
  await removerAllCardsImage("playerCards");

  let computerCardId = await getRandomCardId();

  state.fieldCards.player.style.display = "block";
  state.fieldCards.computer.style.display = "block";

  state.fieldCards.player.src = cardData[idCard].src;
  state.fieldCards.computer.src = cardData[computerCardId].src;

  let duelResults = await checkDuelResults(idCard, computerCardId);

  await updateScore();
  await drawButton(duelResults);
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
  cardImage.setAttribute("data-id", idCard);
  cardImage.setAttribute("id", idCard);

  if (fieldSide === "playerCards") {
    cardImage.classList.add("card");

    cardImage.addEventListener("click", () => {
      setCardsField(cardImage.getAttribute("data-id"));
    });

    cardImage.addEventListener("mouseover", () => {
      drawSelectCard(idCard);
    });
  }

  return cardImage;
}


async function createSelectedImage(){
  const img = document.createElement("img");
  img.id = "cardImage";
  img.classList.add("selected-card");
  state.cardSprites.selected.appendChild(img);
  state.cardSprites.avatar = document.getElementById("cardImage");
}

function init() {
  createSelectedImage();
  drawCards(5, playerSide.player);
  drawCards(5, playerSide.computer);
  const bgm = document.getElementById("bgm");
  bgm.volume = 0.3;
  bgm.play();
}


init();
