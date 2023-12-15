<script setup lang="ts">
import { UiInput } from "../../../../../shared/Ui/input";
import { UiButton } from "../../../../../shared/Ui/button";
import {onMounted, ref} from "vue";

import { useAuthStore } from "../../../../../shared/api/auth/useAuthStore.ts";
import { supabase } from "../../../../../shared/api";

const text = ref<string>("system fsd active...");

const optionsInput = {
  label: "",
  placeholder: "Write...",
  type: "text",
};

const auth = useAuthStore();


const email = ref("");
const message = ref("");
const isAuth = ref('')

onMounted( async () => {
  isAuth.value = await auth.sessionData?.user?.id;
})
const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    message.value = "Проверьте вашу почту";
  } catch (error) {
    if (error instanceof Error) {
      message.value = error.message;
    }
  }
};
</script>

<template>
  <p class="text" v-if="text">{{ text }}</p>
  <div class="login-form">
    <form @submit.prevent="handleLogin">
      <ui-input class="login-form__input" :data="optionsInput" v-model="email" />
      <ui-button class="login-form__button" text="Авторизация" type="submit" />
    </form>
    <p class="login-form__notification">{{ message}}</p>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
