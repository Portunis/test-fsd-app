<script setup lang="ts">
import { useAuthStore } from "./../shared/api/auth/useAuthStore.ts";
import {onMounted, ref} from "vue";
const auth = useAuthStore()
const userId = ref('123')
onMounted(async () => {
  await auth.getSession();
});
</script>

<template>
  <p class="text" v-if="userId">userID: {{ userId }}</p>
  <router-view />
</template>

<style scoped lang="scss">
.text {
  position: absolute;
  top: 10px;
  right: 10px;
  color: white;
  opacity: 0.3;
  font-family: "Chakra Petch", sans-serif;
  user-select: none;
}
</style>