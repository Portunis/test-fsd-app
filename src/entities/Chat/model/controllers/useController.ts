import { onMounted, ref } from "vue";
import { useChatStore } from "../../../../shared/api/chat/useChatStore.ts";
import { useAuthStore } from "../../../../shared/api/auth/useAuthStore";
import { IMessage } from "../interfaces";

const useController = () => {
  const chat = useChatStore();
  const auth = useAuthStore();
  const options = {
    label: "",
    placeholder: "Ваше сообщение",
    type: "text",
  };
  const userId = ref<string>("");
  const message = ref<string>("");
  const messages = ref<IMessage[]>([]);
  const messagesCount = ref(0);
  const maxMessagesPerRequest = 50;
  const loadMessagesBatch = async () => {
    const loadedMessages: IMessage[] | null = await chat.getMessages(
      messagesCount.value,
      maxMessagesPerRequest - 1,
    );

    messages.value = [...(<IMessage[]>loadedMessages), ...messages.value];
    messagesCount.value += loadedMessages?.length as number;
  };
  const createNewMessage = () => {
    chat.createNewMessage(userId.value, message.value).then(() => {
      message.value = "";
    });
  };
  onMounted(async () => {
    userId.value = await auth.sessionData?.user?.id as any;
    await loadMessagesBatch();
    await chat.onNewMessage((newMessage: IMessage) => {
      messages.value = [newMessage, ...messages.value];
      messagesCount.value += 1;
    });
  });

  return {
    loadMessagesBatch,
    userId,
    message,
    messages,
    options,
    createNewMessage,
  };
};

export default useController;
