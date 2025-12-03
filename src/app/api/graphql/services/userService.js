// src/app/api/graphql/services/userService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "user";

// Helper to normalize BigQuery row to plain JS for GraphQL
function normalizeUserRow(row) {
  let dob = row.dob;

  // BigQuery DATE often comes as { value: "YYYY-MM-DD" }
  if (dob && typeof dob === "object") {
    if ("value" in dob) {
      dob = dob.value; // "1998-05-10"
    } else if (typeof dob.toISOString === "function") {
      dob = dob.toISOString().slice(0, 10); // fallback
    } else {
      dob = String(dob);
    }
  }

  return {
    ...row,
    dob,
  };
}

const userService = {
  async getUsers() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeUserRow);
  },

  async getUserById(userid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE userid = @userid
    `;
    const params = { userid: String(userid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeUserRow(row) : null;
  },

  async createUser(data) {
    const userid = randomUUID();

    // 🔍 DEBUG: see what dob is when it reaches the service
    console.log("createUser data.dob =", data.dob);

    // Accept dob as plain "YYYY-MM-DD" string from GraphQL.
    // Do NOT run new Date() – just trust the string.
    let dob = null;
    if (typeof data.dob === "string" && data.dob.trim() !== "") {
      const trimmed = data.dob.trim();
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (isoDateRegex.test(trimmed)) {
        dob = trimmed; // Perfect, use as-is
      } else {
        // Last resort: try to parse other formats
        const parsed = new Date(trimmed);
        if (!isNaN(parsed.getTime())) {
          dob = parsed.toISOString().slice(0, 10);
        }
      }
    }

    const params = {
      userid: String(userid),
      name: data.name ?? null,
      email: data.email ?? null,
      password: data.password ?? null,
      phoneno:
        data.phoneno !== undefined && data.phoneno !== null
          ? String(data.phoneno)
          : null,
      dob, // ← pure "YYYY-MM-DD" or null
      preffered_wax: data.preffered_wax ?? null,
      preffered_scent: data.preffered_scent ?? null,
    };

    console.log("createUser params.dob =", params.dob);

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (userid, name, email, password, phoneno, dob, preffered_wax, preffered_scent)
      VALUES (@userid, @name, @email, @password, @phoneno, @dob, @preffered_wax, @preffered_scent)
    `;

    // ⚠️ Let BigQuery infer types from the values
    await bigquery.query({
      query,
      params,
    });

    return {
      userid,
      name: params.name,
      email: params.email,
      password: params.password,
      phoneno: params.phoneno,
      dob: params.dob,
      preffered_wax: params.preffered_wax,
      preffered_scent: params.preffered_scent,
    };
  },

  async updateUser(userid, data) {
    let dob = null;
    if (typeof data.dob === "string" && data.dob.trim() !== "") {
      const trimmed = data.dob.trim();
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (isoDateRegex.test(trimmed)) {
        dob = trimmed;
      } else {
        const parsed = new Date(trimmed);
        if (!isNaN(parsed.getTime())) {
          dob = parsed.toISOString().slice(0, 10);
        }
      }
    }

    const params = {
      userid: String(userid),
      name: data.name ?? null,
      email: data.email ?? null,
      password: data.password ?? null,
      phoneno:
        data.phoneno !== undefined && data.phoneno !== null
          ? String(data.phoneno)
          : null,
      dob,
      preffered_wax: data.preffered_wax ?? null,
      preffered_scent: data.preffered_scent ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET 
        name = @name,
        email = @email,
        password = @password,
        phoneno = @phoneno,
        dob = @dob,
        preffered_wax = @preffered_wax,
        preffered_scent = @preffered_scent
      WHERE userid = @userid
    `;

    await bigquery.query({
      query,
      params,
    });

    return {
      userid,
      name: params.name,
      email: params.email,
      password: params.password,
      phoneno: params.phoneno,
      dob: params.dob,
      preffered_wax: params.preffered_wax,
      preffered_scent: params.preffered_scent,
    };
  },

  async deleteUser(userid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE userid = @userid
    `;
    const params = { userid: String(userid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default userService;
