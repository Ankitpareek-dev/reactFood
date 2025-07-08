import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import useUserStore from "../utils/userStore";

const useCheckLoginStatus = () => {
  const addUser = useUserStore((store) => store.addUser);
  const removeUser = useUserStore((store) => store.removeUser);
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await axios.get(BASE_URL + "/me", {
          withCredentials: true,
        });
        addUser(res.data);
        console.log("success");
      } catch (err) {
        removeUser();
        console.error(err);
        console.log("failed");
      }
    };
    checkUserAuth();
  }, []);
};

export default useCheckLoginStatus;
