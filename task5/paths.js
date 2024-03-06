module.exports = {
  users: "/api/users",
  userHobbies: (userId) => `/api/users/${userId}/hobbies`,
};
