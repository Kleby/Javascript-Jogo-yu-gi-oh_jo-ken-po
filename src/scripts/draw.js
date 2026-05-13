async function drawSelectCard(index) {
  state.cardSprites.avatar.src = cardData[index].src;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = `${cardData[index].type}`;
}

async function drawButton(text = "") {
  state.actions.button.innerText = text;
  state.actions.button.style.visibility="visible";
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomCardId();
    const cardImage = await createCardImage(randomIdCard, fieldSide);
    document.getElementById(fieldSide).appendChild(cardImage);
  }
}
