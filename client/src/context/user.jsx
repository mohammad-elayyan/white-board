import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  users: null,
  setUsers: () => {},
  img: null,
  setImg: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [img, setImg] = useState(null);
  return (
    <UserContext.Provider
      value={{ user, setUser, users, setUsers, img, setImg }}
    >
      {children}
    </UserContext.Provider>
  );
};
