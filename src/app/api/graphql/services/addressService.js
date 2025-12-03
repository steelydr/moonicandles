// src/app/api/graphql/services/addressService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "address";

// Helper to normalize BigQuery row to plain JS for GraphQL
function normalizeAddressRow(row) {
  // All fields are simple STRINGs in BigQuery, so this is mostly identity.
  // If you later introduce STRUCTs / DATE / TIMESTAMP, massage them here.
  return {
    ...row,
  };
}

const addressService = {
  // Get all addresses
  async getAddresses() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeAddressRow);
  },

  // Get a single address by addressid
  async getAddressById(addressid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE addressid = @addressid
    `;
    const params = { addressid: String(addressid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeAddressRow(row) : null;
  },

  // Get all addresses for a given user
  async getAddressesByUser(userid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE userid = @userid
    `;
    const params = { userid: String(userid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeAddressRow);
  },

  // Create a new address
  async createAddress(data) {
    const addressid = randomUUID();

    const params = {
      addressid: String(addressid),
      userid: String(data.userid),
      label: data.label ?? null,
      line1: data.line1 ?? null,
      line2: data.line2 ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      country: data.country ?? null,
      postal_code: data.postal_code ?? null,
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (addressid, userid, label, line1, line2, city, state, country, postal_code)
      VALUES (@addressid, @userid, @label, @line1, @line2, @city, @state, @country, @postal_code)
    `;

    await bigquery.query({
      query,
      params,
    });

    return {
      addressid,
      userid: params.userid,
      label: params.label,
      line1: params.line1,
      line2: params.line2,
      city: params.city,
      state: params.state,
      country: params.country,
      postal_code: params.postal_code,
    };
  },

  // Update an existing address
  async updateAddress(addressid, data) {
    const params = {
      addressid: String(addressid),
      label: data.label ?? null,
      line1: data.line1 ?? null,
      line2: data.line2 ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      country: data.country ?? null,
      postal_code: data.postal_code ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        label = @label,
        line1 = @line1,
        line2 = @line2,
        city = @city,
        state = @state,
        country = @country,
        postal_code = @postal_code
      WHERE addressid = @addressid
    `;

    await bigquery.query({
      query,
      params,
    });

    return {
      addressid,
      label: params.label,
      line1: params.line1,
      line2: params.line2,
      city: params.city,
      state: params.state,
      country: params.country,
      postal_code: params.postal_code,
    };
  },

  // Delete an address
  async deleteAddress(addressid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE addressid = @addressid
    `;
    const params = { addressid: String(addressid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default addressService;
