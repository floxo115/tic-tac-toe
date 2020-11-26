<template>
  <td :class="{'not-selected': status === stnone,
        'player-selected': status === stplayer,
        'adversary-selected': status == stadversary}" class="game-cell"></td>
</template>

<script lang="ts">
import {Component, Prop, Vue,} from 'vue-property-decorator';
import {CellStatus, gameService} from "@/components/game/gameService";

@Component({
  name: "GameCell",
  data() {
    return {
      stnone: CellStatus.STATUS_NONE.valueOf(),
      stplayer: CellStatus.STATUS_PLAYER.valueOf(),
      stadversary: CellStatus.STATUS_ADVERSARY.valueOf()
    };
  }
})
export default class GameCellComponent extends Vue {
  @Prop() row!: number;
  @Prop() col!: number;
  status: CellStatus = CellStatus.STATUS_NONE;


  created() {
    gameService.getTile(this.row, this.col).subscribe((status) => {
      this.status = status;
    });
  }
}
</script>

<style lang="scss" scoped>
.game-cell {
  transition: background-color 0.2s;
}
.player-selected {
  background-color: #55a3cd;
}

.adversary-selected {
  background-color: #c95858;
}

.not-selected {
  background-color: #d9d9d9;
}
</style>