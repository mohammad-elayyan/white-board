const users = [];

const addUser = (user) => {
  users.push(user);
  return getUsersInRoom(user.roomId);
};

const removeUser = (userId) => {
  const userIndx = users.indexOf((user) => user.userId === userId);
  if (userIndx !== -1) {
    return users.splice(userIndx, 1)[0];
  }
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUsersInRoom = (roomId) => {
  return users.filter((user) => user.roomId === roomId);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
