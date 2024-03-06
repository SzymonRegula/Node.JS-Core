const url = require("url");
const { v4: uuidv4 } = require("uuid");
const paths = require("../paths");
const mapUserToResponse = require("../utils/mapUserToResponse");
const parseRequestBody = require("../utils/parseRequestBody");

const {
  createUser,
  getUsers,
  deleteUser,
  getUserHobbies,
  updateUserHobbies,
} = require("../models/users");

async function userRouter(req, res) {
  const reqUrl = url.parse(req.url, true);
  const userIdMatch = reqUrl.pathname.match(
    new RegExp(`^${paths.users}/([^/]+)(/hobbies)?$`)
  );
  const userId = userIdMatch ? userIdMatch[1] : null;

  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST" && reqUrl.pathname === paths.users) {
    const body = await parseRequestBody(req);

    const user = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
    };

    createUser(user);

    const response = {
      data: mapUserToResponse(user),
      error: null,
    };

    res.statusCode = 201;
    res.end(JSON.stringify(response));
  } else if (req.method === "GET" && reqUrl.pathname === paths.users) {
    const users = getUsers();

    const response = {
      data: users.map((user) => mapUserToResponse(user)),
      error: null,
    };

    res.statusCode = 200;
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.end(JSON.stringify(response));
  } else if (req.method === "DELETE" && userId) {
    const deleted = deleteUser(userId);

    let response;
    if (deleted) {
      response = {
        data: {
          success: true,
        },
        error: null,
      };
      res.statusCode = 200;
    } else {
      response = {
        data: null,
        error: `User with id ${userId} doesn't exist`,
      };
      res.statusCode = 404;
    }
    res.end(JSON.stringify(response));
  } else if (
    req.method === "GET" &&
    userIdMatch &&
    reqUrl.pathname.endsWith("/hobbies")
  ) {
    const hobbies = getUserHobbies(userId);

    let response;
    if (hobbies === null) {
      response = {
        data: null,
        error: `User with id ${userId} doesn't exist`,
      };
      res.statusCode = 404;
    } else {
      response = {
        data: {
          hobbies,
          links: {
            self: reqUrl.pathname,
            user: paths.users + "/" + userId,
          },
        },
        error: null,
      };
      res.statusCode = 200;
    }

    res.setHeader("Cache-Control", "private, max-age=3600");
    res.end(JSON.stringify(response));
  } else if (
    req.method === "PATCH" &&
    userId &&
    reqUrl.pathname.endsWith("/hobbies")
  ) {
    const body = await parseRequestBody(req);

    const updatedUser = updateUserHobbies(userId, body.hobbies);

    let response;
    if (updatedUser === null) {
      response = {
        data: null,
        error: `User with id ${userId} doesn't exist`,
      };
      res.statusCode = 404;
    } else {
      response = {
        data: mapUserToResponse(updatedUser),
        error: null,
      };
      res.statusCode = 200;
    }

    res.end(JSON.stringify(response));
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
}

module.exports = userRouter;
