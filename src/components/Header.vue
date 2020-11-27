<template>
  <section class="header">
    <h1 id="title">The unbeatable Tic Tac Toe experience</h1>
  </section>
</template>

<script>
import {Component, Vue,} from "vue-property-decorator";

@Component({
  components: [],
})
export default class HeaderComponent extends Vue {
}
</script>

<style lang="scss" scoped>
.header {
  height:50px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #5d81d7;
}

#title {
  text-transform: capitalize;
  text-align: center;
  font-size: 4rem;
}
</style>