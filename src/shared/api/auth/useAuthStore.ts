import { defineStore } from "pinia";
import { supabase } from "../index.ts";


export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    session: {} as Object | null,
  }),
  getters: {
    sessionData: (state) => state.session,
  },
  actions: {
    async getSession() {
      return supabase.auth.getSession().then(({ data }) => {
        this.session = data.session;
      });
    },
  },
});
