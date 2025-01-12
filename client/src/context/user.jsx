import { createContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
  users: null,
  setUsers: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser, users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
