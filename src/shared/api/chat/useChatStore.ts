import { defineStore } from "pinia";
import { supabase } from "../index";
import { IMessage } from "../../../entities/Chat/model";

export const useChatStore = defineStore("chatStore", {
  state: () => ({
    messages: [] as IMessage[],
  }),
  getters: {
    messageList: (state) => state.messages,
  },
  actions: {
    async getMessages(from: number, to: number): Promise<IMessage[] | null> {
      const { data } = await supabase
        .from("messages")
        .select()
        .range(from, to)
        .order("timestamp", { ascending: false });
      return data;
    },
    async onNewMessage(handler: any): Promise<void> {
      supabase
        .channel("*")
        .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
          handler(payload.new);
        })
        .subscribe();
    },
    async createNewMessage(
      user_id: string,
      text: string,
    ): Promise<IMessage | null> {
      const { data } = await supabase
        .from("messages")
        .insert({ user_id, text });
      return data;
    },
  },
});
