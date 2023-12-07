<script setup lang="ts">
defineProps({
  label: String as string,
  placeholder: String as string,
});
</script>

<template>
  <div class="ui-input">
    <label class="ui-input__label" v-if="label">{{ label }}</label>
    <div class="ui-input__container">
      <input :placeholder="placeholder" class="ui-input__input" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
