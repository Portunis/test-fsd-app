<script setup lang="ts">
import { UiInput } from "../../../../../shared/Ui/input";
import { UiButton } from "../../../../../shared/Ui/button";
</script>

<template>
  <div class="login-form">
    <form>
      <ui-input class="login-form__input" placeholder="Write..."/>
      <ui-button class="login-form__button" text="Good App"/>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>