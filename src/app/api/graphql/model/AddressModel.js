// src/app/api/graphql/models/AddressModel.js

/**
 * Address Schema (BigQuery-Backed)
 *
 * @typedef {Object} Address
 * @property {string} addressid       // PK
 * @property {string} userid          // FK → user.userid
 * @property {string|null} label      // Home, Work, Shipping, Billing
 * @property {string} line1           // Required
 * @property {string|null} line2      // Optional
 * @property {string} city
 * @property {string} state
 * @property {string} country
 * @property {string} postal_code
 */

const AddressModel = {
  addressid: "string",
  userid: "string",
  label: "string",
  line1: "string",
  line2: "string",
  city: "string",
  state: "string",
  country: "string",
  postal_code: "string",
};

export default AddressModel;
