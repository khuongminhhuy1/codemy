import { useEffect, useState } from "react";

const userInfo = () => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, [storedUser]);

  return { user , setUser };
};

export default userInfo;
