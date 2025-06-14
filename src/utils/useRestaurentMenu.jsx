import { RESTAURENT_LIST_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const useRestaurentMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(RESTAURENT_LIST_URL);
    const json = await data.json();
    setResInfo(json);
  };

  return resInfo;
};

export default useRestaurentMenu;
