<script setup lang="ts">
import { UiButton } from "../../../../../shared/Ui/button";
import { UiInput } from "../../../../../shared/Ui/input";
import useController from "../../../../../entities/Chat/model/controllers/useController.ts";
import { useChatStore } from "../../../../../shared/api/chat/useChatStore.ts";
import moment from "moment";

const {  userId, createNewMessage, message, options } =
  useController();
const chat = useChatStore();
</script>

<template>
  <div class="form-message">
    <div class="form-message__container">
      <div
        class="chat-message"
        v-for="message in chat.messages"
        :key="message.id"
        :class="{ 'chat-message--not-personal': message.user_id != userId }"
      >
        <div class="chat-message__text">
          {{ message.text }}
          <span class="chat-message__time">{{
            moment(message.timestamp).format("HH:mm")
          }}</span>
        </div>
      </div>
    </div>
    <div class="form-message__form">
      <ui-input
        @keyup.enter="createNewMessage"
        :data="options"
        v-model="message"
      />
      <div class="form-message__form-button">
        <ui-button text="Отправить" @click="createNewMessage" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
