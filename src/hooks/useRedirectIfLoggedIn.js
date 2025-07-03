import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import useUserStore from "../utils/userStore";
import { Navigate, useNavigate } from "react-router-dom";

const useRedirectIfLoggedIn = () => {
  const navigate = useNavigate();
  const addUser = useUserStore((store) => store.addUser);
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const res = await axios.get(BASE_URL + "/me", {
          withCredentials: true,
        });
        addUser(res.data);
        navigate("/feed");
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    checkUserAuth();
  }, []);
};

export default useRedirectIfLoggedIn;
