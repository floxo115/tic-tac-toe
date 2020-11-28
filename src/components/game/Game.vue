<template>
  <section id="game">
    <section id="set-adversaries">
      <button @click="setAdversary('random')">Random</button>
      <button @click="setAdversary('minimax')">MiniMax</button>
      <button @click="setAdversary('alphabetapruned')">AlphaBeta</button>
    </section>
    <div v-if="isTerminal" id="game-information">
      <p>Game Over! <span v-if="winner==1">The player</span><span
          v-else-if="winner==-1">The adversary</span><span v-else>Noone </span> wins!</p>
    </div>
    <app-gameboard/>
    <button id="resetbutton" @click="resetGame()">reset</button>
  </section>
</template>

<script lang="ts">
import {Component, Vue,} from "vue-property-decorator";
import GameBoardComponent from "@/components/game/GameBoard.vue";
import {gameService} from "@/components/game/gameService";


@Component({
  name: "game",
  components: {"app-gameboard": GameBoardComponent}
})
export default class GameComponent extends Vue {
  isTerminal = false;
  winner = Number.NaN;

  created() {
    gameService.getTerminalState().subscribe((gameStatus) => this.isTerminal = gameStatus);
    gameService.getWinner().subscribe((winner) => this.winner = winner);
  }

  resetGame() {
    gameService.resetGame();
  }

  setAdversary(name: string) {
    switch (name) {
      case "random":
        gameService.setAdversaryToRandom();
        break;
      case "minimax":
        gameService.setAdversaryToMinimax();
        break;
      case "alphabetapruned":
        gameService.setAdversaryToAlphaBetaPrune();
        break;
      default:
        throw new Error("adversary does not exists");
    }
  }
}
</script>

<style lang="scss" scoped>
#game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 90vh;
}

#game-board {
  border: 2px solid black;
  border-collapse: collapse;
}

#game-information {
  position: absolute;
  top: 50vh;

  background-color: darkgoldenrod;
  border-radius: 200rem;
  color: white;

  font-size: 3rem;
  padding: 20px 40px;

  @keyframes pulsating {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  };

  animation: pulsating infinite linear 2s;
}

#set-adversaries {
  display: flex;
  justify-content: space-around;
  width: 495px;
  margin-bottom: 4rem;
  button {
    padding: 10px 25px;
    width: 120px;
    border: none;
    font-weight: bold;
    margin-top: 3rem;
    font-size: 1.3rem;
    background-color: #d9d9d9;
    box-shadow: black 1px 1px;
    &:hover {
      transform: scale(1.05);
      box-shadow: black 3px 3px 1px;
    }

    &:active {
      box-shadow: black 1px 1px;
      transform: scale(1);
    }
  }
}

#resetbutton {
  padding: 10px 150px;
  border: none;
  font-weight: bold;
  margin-top: 3rem;
  font-size: 3rem;
  background-color: #d9d9d9;
  box-shadow: black 1px 1px;

  transition: all 0.1s;

  &:hover {
    transform: scale(1.02);
    box-shadow: black 3px 3px 1px;
  }

  &:active {
    box-shadow: black 1px 1px;
    transform: scale(1);
  }
}
</style>