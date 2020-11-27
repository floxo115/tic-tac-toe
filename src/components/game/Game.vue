<template>
  <section id="game">
    <div id="game-information" v-if="isTerminal">
      <p>Game Over! <span v-if="winner==1">The player</span><span
          v-else-if="winner==-1">The adversary</span><span v-else>Noone </span> wins!</p>
    </div>
    <app-gameboard/>
    <button @click="resetGame()">reset</button>
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
}
</script>

<style lang="scss" scoped>
#game {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height:90vh;
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
    50%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  };

  animation: pulsating infinite linear 2s;
}
</style>