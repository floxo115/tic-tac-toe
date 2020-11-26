<template>
  <section id="game">
    <div id="game-information" v-if="isTerminal">
      <p>the game is over! <span v-if="winner==1">The player</span><span
          v-else-if="winner==-1">The adversary</span><span v-else>Noone </span> wins!</p>
    </div>
    <button @click="resetGame()">reset</button>
    <app-gameboard/>
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
  winner = 0;

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
}

#game-board {
  border: 2px solid black;
  border-collapse: collapse;
}

#game-information {
  position: absolute;
  top: 300px;

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