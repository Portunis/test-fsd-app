import {onMounted, onUnmounted, ref} from "vue";
import { useChatStore } from "../../../../shared/api/chat/useChatStore.ts";
import { useAuthStore } from "../../../../shared/api/auth/useAuthStore";
import { IMessage } from "../interfaces";
import {supabase} from "../../../../shared/api";

const useController = () => {
  const chat = useChatStore();
  const auth = useAuthStore();
  const options = {
    label: "",
    placeholder: "Ваше сообщение",
    type: "text",
  };
  const userId = ref<string>("");
  const userToMessage = ref<string>("");
  const message = ref<string>("");
  const messages = ref<IMessage[]>([]);
  const messagesCount = ref(0);
  const loadMessagesBatch = async () => {
    const loadedMessages: IMessage[] | null | undefined = await chat.getMessages();
    chat.messages = [...(<IMessage[]>loadedMessages), ...messages.value];
  };
  const createNewMessage = () => {
    chat
      .createNewMessage(
        userId.value,
        chat.toIdUserMessage,
        message.value,
        chat.chatId,
      )
      .then(() => {
        message.value = "";
      });
  };
  const createChat = async (toUserId: string) => {
    chat.toIdUserMessage = toUserId;
    await chat.getChat(userId.value, chat.toIdUserMessage).then((data: any) => {
      console.log("data", data);

        chat.chatId = data[0]?.id;

      if (!data?.length) {
        chat.createChat(userId.value, chat.toIdUserMessage).then();
      } else {
        loadMessagesBatch();
      }
    });
  };
  onMounted(async () => {
    userId.value = (await auth.sessionData?.user?.id) as any;
    await chat.onNewMessage((newMessage: IMessage) => {
      chat.messages = [newMessage, ...chat.messages];
      messagesCount.value += 1;
    });
  });
  onUnmounted(async () => {
    await supabase.removeChannel('*')
  })

  return {
    loadMessagesBatch,
    createNewMessage,
    createChat,
    userId,
    message,
    messages,
    options,
    userToMessage
  };
};

export default useController;
