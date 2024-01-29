import { supabase } from "../../../../shared/api";
import { onMounted, ref } from "vue";

const useController = () => {
  const users = ref<any>([]);
  const getUsers = async () => {
    const { data } = await supabase.from("users").select("id, email");

    users.value = data;
  };
  onMounted(async () => {
    await getUsers();
  });
  return {
    getUsers,
    users
  };
};
export default useController;
