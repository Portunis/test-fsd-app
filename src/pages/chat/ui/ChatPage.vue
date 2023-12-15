<script setup lang="ts">
import { formMessage } from "../../../feature/chat";
import { useAuthStore } from "../../../shared/api/auth/useAuthStore.ts";
import {UiButton} from "../../../shared/Ui/button";

const isAuth = useAuthStore();
</script>

<template>
  <div class="chat">
    <div v-if="!isAuth.sessionData">
      <p class="chat__text--warning">Need Auth</p>
      <router-link to="/">
        <ui-button text="Login"/>
      </router-link>
    </div>
    <form-message v-if="isAuth.sessionData" />
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
