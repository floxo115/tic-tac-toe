<template>
  <section id="game">
    <app-gameboard/>
  </section>
</template>

<script lang="ts">
import {Component, Vue,} from "vue-property-decorator";
import GameBoardComponent from "@/components/game/GameBoard.vue";


@Component({
  name: "game",
  components: {"app-gameboard": GameBoardComponent}
})
export default class GameComponent extends Vue {
}
</script>

<style lang="scss" scoped>
#game {
  display: flex;
  justify-content: center;
}

#game-board {
  border: 2px solid black;
  border-collapse: collapse;
}
</style>