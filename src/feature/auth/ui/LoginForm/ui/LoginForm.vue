<script setup lang="ts">
import { UiInput } from "../../../../../shared/Ui/input";
import { UiButton } from "../../../../../shared/Ui/button";
import { ref } from "vue";

const text = ref<string>("text ;)");

const optionsInput = {
  label: "",
  placeholder: "Write...",
  type: "text",
};
</script>

<template>
  <p class="text" v-if="text">{{ text }}</p>
  <div class="login-form">
    <form>
      <ui-input class="login-form__input" :data="optionsInput" v-model="text" />
      <ui-button class="login-form__button" text="Good App" />
      <router-link to="/ui-kit">
        <ui-button class="login-form__button" text="Go to UI-KIT" />
      </router-link>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
