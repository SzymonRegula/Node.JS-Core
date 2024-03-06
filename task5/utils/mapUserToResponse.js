const paths = require("../paths");

function mapUserToResponse(user) {
  return {
    user,
    links: {
      self: `${paths.users}/${user.id}`,
      hobbies: paths.userHobbies(user.id),
    },
  };
}

module.exports = mapUserToResponse;
