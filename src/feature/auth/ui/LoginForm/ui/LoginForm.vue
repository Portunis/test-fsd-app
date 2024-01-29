<script setup lang="ts">
import { UiInput } from "../../../../../shared/Ui/input";
import { UiButton } from "../../../../../shared/Ui/button";
import { onMounted, ref } from "vue";

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
const password = ref("");
const isAuth = ref("");

onMounted(async () => {
  isAuth.value = await auth.sessionData?.user?.id;
});
const handleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    message.value = "Проверьте вашу почту";
  } catch (error) {
    if (error instanceof Error) {
      message.value = error.message;
    }
  }
};
const registerUser = async () => {
  try {
    const { error, data } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    message.value = "Проверьте вашу почту";
    const { data: _user, error: _error } = await supabase
      .from("users")
      // сериализуем объект пользователя
      .insert({
        id: data.user?.id,
        email: data.user?.email,
        created_at: data.user?.created_at,
      })
      .single();
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
    <ui-input class="login-form__input" :data="optionsInput" v-model="email" />
    <ui-input
      class="login-form__input"
      :data="optionsInput"
      v-model="password"
    />
    <ui-button
      class="login-form__button"
      text="Авторизация"
      @click="handleLogin"
    />
    <ui-button
      class="login-form__button"
      text="Регистрация"
      @click="registerUser"
    />
    <p class="login-form__notification">{{ message }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
