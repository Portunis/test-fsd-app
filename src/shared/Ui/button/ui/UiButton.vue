<script setup lang="ts">
defineProps({
  text: String,
});
</script>

<template>
  <button class="ui-button">{{ text }}</button>
</template>

<style scoped lang="scss">
@import "style";
</style>
