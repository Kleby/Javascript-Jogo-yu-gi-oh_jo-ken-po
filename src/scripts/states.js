const States = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("scorePoints"),
  },
  cardSprites: {
    selected: document.getElementById("selectedImage"),
    avatar: "",
    name: document.getElementById("cardName"),
    type: document.getElementById("cardType"),
  },
  fieldCards: {
    player: document.getElementById("playerFieldCard"),
    computer: document.getElementById("computerFieldCard"),
  },
  actions: {
    button: document.getElementById("nextDuel"),
  },
};