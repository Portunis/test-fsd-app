<script setup lang="ts">
import useController from "../../../../../entities/Chat/model/controllers/useController.ts";
import { useChatStore } from "../../../../../shared/api/chat/useChatStore.ts";
import {computed} from "vue";
defineProps({
  data: {
    type: Array,
  },
});
const { createChat} = useController();
const chat = useChatStore()

</script>

<template>
  <div class="user-room">
    <div
      class="user-room__item"
      :class="{active: chat.toIdUserMessage === user.id}"
      @click="createChat(user.id)"
      v-for="user in data"
      :key="user.id"
    >
      {{ user.email }}
      <p class="user-room__message-count">5</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "style";
</style>
