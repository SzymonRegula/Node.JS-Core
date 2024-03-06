let users = [];

function createUser(user) {
  users.push({
    id: user.id,
    name: user.name,
    email: user.email,
    hobbies: [],
  });
}

function getUsers() {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
}

function deleteUser(userId) {
  const usersCount = users.length;
  users = users.filter((user) => user.id !== userId);
  return usersCount !== users.length;
}

function getUserHobbies(userId) {
  const user = users.find((user) => user.id === userId);
  return user ? user.hobbies : null;
}

function updateUserHobbies(userId, newHobbies) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    user.hobbies = [...new Set([...user.hobbies, ...newHobbies])];
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } else {
    return null;
  }
}

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  getUserHobbies,
  updateUserHobbies,
};
