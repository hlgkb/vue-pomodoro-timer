<template>
  <PomodoroTimer />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage'
})
</script>
<style lang="scss">
*  {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  --background-gredient-start: #f13346;
  --background-gredient-stop: #fb5143;
  font-family: 'Quicksand';
}

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, var(--background-gredient-start), var(--background-gredient-stop));
}
</style>
