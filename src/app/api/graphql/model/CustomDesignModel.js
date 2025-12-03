// src/app/api/graphql/models/CustomDesignModel.js

/**
 * Custom Design Schema (BigQuery-Backed)
 *
 * @typedef {Object} CustomDesign
 * @property {string} customizationid     // PK
 * @property {string} userid              // FK → user.userid
 * @property {string|null} message_on_container // Custom printed message
 * @property {string|null} ai_generated_image  // URL of AI-generated image
 * @property {string|null} candle_type         // Custom candle type
 * @property {string|null} wax_type            // Wax material
 * @property {string|null} wax_base_color      // Wax color name or hex
 * @property {string|null} scent_type          // Selected fragrance
 * @property {string|null} container_type      // Container material
 * @property {string|null} container_mould_type // Shape of container
 * @property {string|null} container_color     // Color name or hex
 * @property {string|null} height_width_inches // Format HxW
 * @property {number|null} wax_amount_oz       // Wax amount in oz
 * @property {string|null} wick_type           // Wick material
 * @property {number} quantity                 // Quantity of custom candles
 * @property {number} price                    // Price in cents
 * @property {number|null} burn_time_hours     // Estimated burn time
 * @property {string|null} topper_mould_type   // Decorative topper shape
 * @property {string|null} topper_wax_color    // Topper color
 */

const CustomDesignModel = {
  customizationid: "string",
  userid: "string",
  message_on_container: "string",
  ai_generated_image: "string",
  candle_type: "string",
  wax_type: "string",
  wax_base_color: "string",
  scent_type: "string",
  container_type: "string",
  container_mould_type: "string",
  container_color: "string",
  height_width_inches: "string",
  wax_amount_oz: "int64",
  wick_type: "string",
  quantity: "int64",
  price: "int64",
  burn_time_hours: "int64",
  topper_mould_type: "string",
  topper_wax_color: "string",
};

export default CustomDesignModel;
