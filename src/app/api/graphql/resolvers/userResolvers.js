// src/app/api/graphql/resolvers/userResolvers.js
import userService from "../services/userService.js";

const userResolvers = {
  Query: {
    users: () => userService.getUsers(),
    user: (_, { userid }) => userService.getUserById(userid),
  },

  Mutation: {
    createUser: (_, args) => userService.createUser(args),

    updateUser: (_, { userid, ...data }) =>
      userService.updateUser(userid, data),

    deleteUser: (_, { userid }) => userService.deleteUser(userid),
  },
};

export default userResolvers;
