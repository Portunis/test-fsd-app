<script setup lang="ts">
import { UiInput } from "../../../../../shared/Ui/input";
import { UiButton } from "../../../../../shared/Ui/button";
import { ref } from "vue";

const text = ref<string>("");

const optionsInput = {
  label: "",
  placeholder: "Write...",
  type: "text",
};
</script>

<template>
  <div class="login-form">
    <form>
      <ui-input
        class="login-form__input"
        :data="optionsInput"
        :modelValue="text"
      />
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
