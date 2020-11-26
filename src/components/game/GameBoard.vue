<template>
  <table id="game-board">
    <tr v-for="(row,row_index) in board" :key="row_index" class="game-row">
      <app-gamecell v-for="(status, col_index) in row" :key="col_index"
                    :col="col_index" :row="row_index" class="game-cell"
                    @click.native="onCellClick(row_index,col_index)"
      ></app-gamecell>
    </tr>
  </table>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import GameCellComponent from "@/components/game/GameCell.vue";
import {CellStatus, gameService} from "@/components/game/gameService";

@Component({
  name: "GameBoard",
  components: {"app-gamecell": GameCellComponent}
})
export default class GameBoardComponent extends Vue {
  board!: Array<Array<CellStatus>>;

  created() {
    gameService.getBoard().subscribe((board) => this.board = board);
  }

  onCellClick(row: number, col: number) {
    gameService.next(row, col);
  }

}
</script>

<style lang="scss" scoped>
#game-board {
  min-width: 500px;
  min-height:500px;
  background-color: yellow;
}

.game-row, .game-cell {
  border: 4px solid black;
  border-collapse: collapse;
}
</style>