import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import useUserStore from "../utils/userStore";

const useCheckLoginStatus = () => {
  const addUser = useUserStore((store) => store.addUser);
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await axios.get(BASE_URL + "/me", {
          withCredentials: true,
        });
        addUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    checkUserAuth();
  }, []);
};

export default useCheckLoginStatus;
