<template>
  <div id="app" >
    <app-header id="app-header"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Vue,} from "vue-property-decorator";
import HeaderComponent from "@/components/Header.vue";

@Component({
  name: "app",
  components: {'app-header': HeaderComponent},
})
export default class AppComponent extends Vue {

}
</script>

<style lang="scss" scoped>
#app {
  display: block;
  width: 100%;
  max-width: 1200px;
}

#app-header {
height: 10vh;
}

</style>
