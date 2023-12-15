<script setup lang="ts">
import { LoginForm } from "../../../feature/auth";
import { UiButton } from "../../../shared/Ui/button";
import { useAuthStore } from "../../../shared/api/auth/useAuthStore.ts";
const isAuth = useAuthStore();
</script>

<template>
  <div class="main-page">
    <h2 class="main-page__title">It,s main page :) FSD</h2>
    <p class="main-page__subtext">Stack: vite/vue3/pinia/router/supabase</p>
    <LoginForm v-if="!isAuth.sessionData" />
    <router-link to="/chat" v-if="isAuth.sessionData">
      <ui-button text="Начать общение" />
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
