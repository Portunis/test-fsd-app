<script setup lang="ts">
import { formMessage, userRoom } from "../../../feature/chat";
import { useAuthStore } from "../../../shared/api/auth/useAuthStore.ts";
import { UiButton } from "../../../shared/Ui/button";
import useController from "../../../entities/User/model/controllers/useController.ts";

const isAuth = useAuthStore();

const { users } = useController();
</script>

<template>
  <div class="chat">
    <div v-if="!isAuth.sessionData">
      <p class="chat__text--warning">Need Auth</p>
      <router-link to="/">
        <ui-button text="Login" />
      </router-link>
    </div>
    <user-room v-if="isAuth.sessionData" :data="users"/>
    <form-message v-if="isAuth.sessionData" />
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
