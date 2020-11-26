<template>
  <section id="game">
    <button @click="resetGame()">reset</button>
    <app-gameboard/>
    <div v-if="isTerminal">
      <p :style="{color:'red', fontSize: '3rem'}">the game is over! <span v-if="winner==1">The player</span><span
          v-else-if="winner==-1">The adversary</span><span v-else>Noone </span> wins!</p>
    </div>
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
</style>