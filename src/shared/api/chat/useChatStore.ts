import { defineStore } from "pinia";
import { supabase } from "../index";
import { IMessage } from "../../../entities/Chat/model";

export const useChatStore = defineStore("chatStore", {
  state: () => ({
    messages: [] as IMessage[] | null,
    toIdUserMessage: "" as string,
    chat: [] as any,
    chatId: 0
  }),
  getters: {
    messageList: (state) => state.messages,
  },
  actions: {
    async getMessages() {
      try {
        const { data } = await supabase
          .from("messages")
          .select()
          .eq("chat_id", this.chatId)
          .order("timestamp", { ascending: false });
        this.messages = data;
        return data;
      } catch {
        console.log("error");
      }
    },
    async onNewMessage(handler: any): Promise<void> {
      supabase
        .channel("*")
        .on("postgres_changes", { event: "*", schema: "*" }, (payload) => {
          handler(payload.new);
        })
        .subscribe();
    },
    async createChat(user_id: string, to_user_id: string) {
      try {
        const { data } = await supabase
          .from("chat")
          .insert({ user_id, to_user_id });
        return data;
      } catch {
        console.log("error");
      }
    },
    async getChat(user_id: string, to_user_id: string) {
      try {
        const { data } = await supabase
          .from("chat")
          .select()
          .match({user_id: user_id, to_user_id: to_user_id})
        this.chat = data;
        return data;
      } catch {
        console.log("error");
      }
    },
    async createNewMessage(
      user_id: string,
      to_user_id: string,
      text: string,
      chat_id: number,
    ): Promise<IMessage | null> {
      const { data } = await supabase
        .from("messages")
        .insert({ chat_id, user_id, to_user_id, text });
      return data;
    },
  },
});
