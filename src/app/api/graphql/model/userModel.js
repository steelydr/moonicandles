// src/app/api/graphql/models/UserModel.js

/**
 * User Schema (BigQuery-Backed)
 *
 * @typedef {Object} User
 * @property {string} userid
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string|null} phoneno          // ← String now
 * @property {string|null} dob              // "YYYY-MM-DD"
 * @property {string|null} preffered_wax
 * @property {string|null} preffered_scent
 */

const UserModel = {
  userid: "string",
  name: "string",
  email: "string",
  password: "string",
  phoneno: "string",  // ← was int64, now aligned with BigQuery STRING
  dob: "date",
  preffered_wax: "string",
  preffered_scent: "string",
};

export default UserModel;
