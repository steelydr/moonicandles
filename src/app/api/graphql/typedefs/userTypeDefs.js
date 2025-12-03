// src/app/api/graphql/typedefs/userTypeDefs.js

const userTypeDefs = /* GraphQL */ `
  type User {
    userid: ID!          # maps to BigQuery userid
    name: String!        # NOT NULL in BigQuery
    email: String!       # NOT NULL in BigQuery
    password: String!    # NOT NULL in BigQuery
    phoneno: String      # now String (BigQuery STRING)
    dob: String          # ISO date string "YYYY-MM-DD"
    preffered_wax: String
    preffered_scent: String
  }

  type Query {
    users: [User!]!
    user(userid: ID!): User
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      phoneno: String
      dob: String
      preffered_wax: String
      preffered_scent: String
    ): User

    updateUser(
      userid: ID!
      name: String
      email: String
      password: String
      phoneno: String
      dob: String
      preffered_wax: String
      preffered_scent: String
    ): User

    deleteUser(userid: ID!): Boolean
  }
`;

export default userTypeDefs;
