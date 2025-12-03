// src/app/api/graphql/services/productVariantService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "product_variant";

// Normalize BigQuery → JS
function normalizeVariantRow(row) {
  return {
    ...row,
    // Convert numeric fields properly (BigQuery INT64 → string or number)
    wax_amount_oz: row.wax_amount_oz ? Number(row.wax_amount_oz) : null,
    burn_time_hours: row.burn_time_hours ? Number(row.burn_time_hours) : null,
    stock_quantity: row.stock_quantity ? Number(row.stock_quantity) : 0,
    low_stock_threshold: row.low_stock_threshold
      ? Number(row.low_stock_threshold)
      : null,
  };
}

const productVariantService = {
  // Get all variants
  async getProductVariants() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeVariantRow);
  },

  // Get a single variant by variant ID
  async getProductVariantById(product_variant) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE product_variant = @product_variant
    `;
    const params = { product_variant: String(product_variant) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeVariantRow(row) : null;
  },

  // Get all variants for a specific product
  async getVariantsByProduct(productid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE productid = @productid
    `;
    const params = { productid: String(productid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeVariantRow);
  },

  // Create variant
  async createProductVariant(data) {
    const product_variant = randomUUID();

    const params = {
      product_variant,
      productid: String(data.productid),
      product_variant_name: data.product_variant_name ?? null,
      height_width_inches: data.height_width_inches ?? null,
      wax_amount_oz:
        typeof data.wax_amount_oz === "number"
          ? data.wax_amount_oz
          : null,
      wick_type: data.wick_type ?? null,
      container_color: data.container_color ?? null,
      wax_base_color: data.wax_base_color ?? null,
      burn_time_hours:
        typeof data.burn_time_hours === "number"
          ? data.burn_time_hours
          : null,
      stock_quantity:
        typeof data.stock_quantity === "number"
          ? data.stock_quantity
          : 0, // required
      low_stock_threshold:
        typeof data.low_stock_threshold === "number"
          ? data.low_stock_threshold
          : null,
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (
        product_variant, productid, product_variant_name,
        height_width_inches, wax_amount_oz, wick_type,
        container_color, wax_base_color, burn_time_hours,
        stock_quantity, low_stock_threshold
      )
      VALUES (
        @product_variant, @productid, @product_variant_name,
        @height_width_inches, @wax_amount_oz, @wick_type,
        @container_color, @wax_base_color, @burn_time_hours,
        @stock_quantity, @low_stock_threshold
      )
    `;

    await bigquery.query({ query, params });

    return normalizeVariantRow(params);
  },

  // Update variant
  async updateProductVariant(product_variant, data) {
    const params = {
      product_variant: String(product_variant),
      product_variant_name: data.product_variant_name ?? null,
      height_width_inches: data.height_width_inches ?? null,
      wax_amount_oz:
        typeof data.wax_amount_oz === "number"
          ? data.wax_amount_oz
          : null,
      wick_type: data.wick_type ?? null,
      container_color: data.container_color ?? null,
      wax_base_color: data.wax_base_color ?? null,
      burn_time_hours:
        typeof data.burn_time_hours === "number"
          ? data.burn_time_hours
          : null,
      stock_quantity:
        typeof data.stock_quantity === "number"
          ? data.stock_quantity
          : null,
      low_stock_threshold:
        typeof data.low_stock_threshold === "number"
          ? data.low_stock_threshold
          : null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        product_variant_name = @product_variant_name,
        height_width_inches = @height_width_inches,
        wax_amount_oz = @wax_amount_oz,
        wick_type = @wick_type,
        container_color = @container_color,
        wax_base_color = @wax_base_color,
        burn_time_hours = @burn_time_hours,
        stock_quantity = @stock_quantity,
        low_stock_threshold = @low_stock_threshold
      WHERE product_variant = @product_variant
    `;

    await bigquery.query({ query, params });

    return {
      product_variant,
      ...params,
    };
  },

  // Delete variant
  async deleteProductVariant(product_variant) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE product_variant = @product_variant
    `;
    const params = { product_variant: String(product_variant) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default productVariantService;
