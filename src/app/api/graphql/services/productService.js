// src/app/api/graphql/services/productService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "product";

// Helper to normalize BigQuery row to plain JS for GraphQL
function normalizeProductRow(row) {
  // All fields are STRINGs, so no special type-wrangling (unlike dob).
  return {
    ...row,
  };
}

const productService = {
  // Get all products
  async getProducts() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeProductRow);
  },

  // Get a single product by productid
  async getProductById(productid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE productid = @productid
    `;
    const params = { productid: String(productid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeProductRow(row) : null;
  },

  // Create a new product
  async createProduct(data) {
    const productid = randomUUID();

    const params = {
      productid: String(productid),
      product_name: data.product_name ?? null,
      imageurl: data.imageurl ?? null,
      candle_type: data.candle_type ?? null,
      wax_type: data.wax_type ?? null,
      scent_type: data.scent_type ?? null,
      container_type: data.container_type ?? null,
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (productid, product_name, imageurl, candle_type, wax_type, scent_type, container_type)
      VALUES (@productid, @product_name, @imageurl, @candle_type, @wax_type, @scent_type, @container_type)
    `;

    await bigquery.query({
      query,
      params,
    });

    return {
      productid,
      product_name: params.product_name,
      imageurl: params.imageurl,
      candle_type: params.candle_type,
      wax_type: params.wax_type,
      scent_type: params.scent_type,
      container_type: params.container_type,
    };
  },

  // Update an existing product
  async updateProduct(productid, data) {
    const params = {
      productid: String(productid),
      product_name: data.product_name ?? null,
      imageurl: data.imageurl ?? null,
      candle_type: data.candle_type ?? null,
      wax_type: data.wax_type ?? null,
      scent_type: data.scent_type ?? null,
      container_type: data.container_type ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        product_name = @product_name,
        imageurl = @imageurl,
        candle_type = @candle_type,
        wax_type = @wax_type,
        scent_type = @scent_type,
        container_type = @container_type
      WHERE productid = @productid
    `;

    await bigquery.query({
      query,
      params,
    });

    return {
      productid,
      product_name: params.product_name,
      imageurl: params.imageurl,
      candle_type: params.candle_type,
      wax_type: params.wax_type,
      scent_type: params.scent_type,
      container_type: params.container_type,
    };
  },

  // Delete a product
  async deleteProduct(productid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE productid = @productid
    `;
    const params = { productid: String(productid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default productService;
