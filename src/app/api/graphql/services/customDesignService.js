// src/app/api/graphql/services/customDesignService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "custom_design";

// Normalize BigQuery row → JS for GraphQL
function normalizeCustomDesignRow(row) {
  return {
    ...row,
    wax_amount_oz:
      row.wax_amount_oz != null ? Number(row.wax_amount_oz) : null,
    quantity:
      row.quantity != null ? Number(row.quantity) : null,
    price:
      row.price != null ? Number(row.price) : null,
    burn_time_hours:
      row.burn_time_hours != null ? Number(row.burn_time_hours) : null,
  };
}

const customDesignService = {
  // Get all custom designs
  async getCustomDesigns() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeCustomDesignRow);
  },

  // Get one custom design by ID
  async getCustomDesignById(customizationid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE customizationid = @customizationid
    `;
    const params = { customizationid: String(customizationid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeCustomDesignRow(row) : null;
  },

  // Get all custom designs for a user
  async getCustomDesignsByUser(userid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE userid = @userid
    `;
    const params = { userid: String(userid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeCustomDesignRow);
  },

  // Create a new custom design
  async createCustomDesign(data) {
    const customizationid = randomUUID();

    const params = {
      customizationid,
      userid: String(data.userid),

      message_on_container: data.message_on_container ?? null,
      ai_generated_image: data.ai_generated_image ?? null,

      candle_type: data.candle_type ?? null,
      wax_type: data.wax_type ?? null,
      wax_base_color: data.wax_base_color ?? null,
      scent_type: data.scent_type ?? null,

      container_type: data.container_type ?? null,
      container_mould_type: data.container_mould_type ?? null,
      container_color: data.container_color ?? null,

      height_width_inches: data.height_width_inches ?? null,
      wax_amount_oz:
        typeof data.wax_amount_oz === "number"
          ? data.wax_amount_oz
          : null,
      wick_type: data.wick_type ?? null,

      quantity:
        typeof data.quantity === "number"
          ? data.quantity
          : 1, // required
      price:
        typeof data.price === "number"
          ? data.price
          : 0, // required

      burn_time_hours:
        typeof data.burn_time_hours === "number"
          ? data.burn_time_hours
          : null,

      topper_mould_type: data.topper_mould_type ?? null,
      topper_wax_color: data.topper_wax_color ?? null,
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (
        customizationid, userid,
        message_on_container, ai_generated_image,
        candle_type, wax_type, wax_base_color, scent_type,
        container_type, container_mould_type, container_color,
        height_width_inches, wax_amount_oz, wick_type,
        quantity, price, burn_time_hours,
        topper_mould_type, topper_wax_color
      )
      VALUES (
        @customizationid, @userid,
        @message_on_container, @ai_generated_image,
        @candle_type, @wax_type, @wax_base_color, @scent_type,
        @container_type, @container_mould_type, @container_color,
        @height_width_inches, @wax_amount_oz, @wick_type,
        @quantity, @price, @burn_time_hours,
        @topper_mould_type, @topper_wax_color
      )
    `;

    await bigquery.query({ query, params });

    return normalizeCustomDesignRow(params);
  },

  // Update an existing custom design
  async updateCustomDesign(customizationid, data) {
    const params = {
      customizationid: String(customizationid),

      message_on_container: data.message_on_container ?? null,
      ai_generated_image: data.ai_generated_image ?? null,

      candle_type: data.candle_type ?? null,
      wax_type: data.wax_type ?? null,
      wax_base_color: data.wax_base_color ?? null,
      scent_type: data.scent_type ?? null,

      container_type: data.container_type ?? null,
      container_mould_type: data.container_mould_type ?? null,
      container_color: data.container_color ?? null,

      height_width_inches: data.height_width_inches ?? null,
      wax_amount_oz:
        typeof data.wax_amount_oz === "number"
          ? data.wax_amount_oz
          : null,
      wick_type: data.wick_type ?? null,

      quantity:
        typeof data.quantity === "number"
          ? data.quantity
          : null,
      price:
        typeof data.price === "number"
          ? data.price
          : null,

      burn_time_hours:
        typeof data.burn_time_hours === "number"
          ? data.burn_time_hours
          : null,

      topper_mould_type: data.topper_mould_type ?? null,
      topper_wax_color: data.topper_wax_color ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        message_on_container = @message_on_container,
        ai_generated_image = @ai_generated_image,
        candle_type = @candle_type,
        wax_type = @wax_type,
        wax_base_color = @wax_base_color,
        scent_type = @scent_type,
        container_type = @container_type,
        container_mould_type = @container_mould_type,
        container_color = @container_color,
        height_width_inches = @height_width_inches,
        wax_amount_oz = @wax_amount_oz,
        wick_type = @wick_type,
        quantity = @quantity,
        price = @price,
        burn_time_hours = @burn_time_hours,
        topper_mould_type = @topper_mould_type,
        topper_wax_color = @topper_wax_color
      WHERE customizationid = @customizationid
    `;

    await bigquery.query({ query, params });

    return {
      customizationid,
      ...normalizeCustomDesignRow(params),
    };
  },

  // Delete custom design
  async deleteCustomDesign(customizationid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE customizationid = @customizationid
    `;
    const params = { customizationid: String(customizationid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default customDesignService;
