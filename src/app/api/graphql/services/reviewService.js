// src/app/api/graphql/services/reviewService.js
import { randomUUID } from "crypto";
import bigquery from "../lib/bigqueryClient";

const dataset = "mooni-candles-api.candle_store";
const table = "review";

// Normalize BigQuery row → JS
function normalizeReviewRow(row) {
  return {
    ...row,
    rating: row.rating != null ? Number(row.rating) : null,
  };
}

const reviewService = {
  // Get all reviews
  async getReviews() {
    const query = `SELECT * FROM \`${dataset}.${table}\``;
    const [rows] = await bigquery.query({ query });
    return rows.map(normalizeReviewRow);
  },

  // Get a single review by ID
  async getReviewById(reviewid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE reviewid = @reviewid
    `;
    const params = { reviewid: String(reviewid) };

    const [rows] = await bigquery.query({ query, params });
    const row = rows[0] || null;
    return row ? normalizeReviewRow(row) : null;
  },

  // Get all reviews for a product
  async getReviewsByProduct(productid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE productid = @productid
    `;
    const params = { productid: String(productid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeReviewRow);
  },

  // Get all reviews by a user
  async getReviewsByUser(userid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE userid = @userid
    `;
    const params = { userid: String(userid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeReviewRow);
  },

  // Get all reviews tied to an order (verified purchase)
  async getReviewsByOrder(orderid) {
    const query = `
      SELECT * FROM \`${dataset}.${table}\`
      WHERE orderid = @orderid
    `;
    const params = { orderid: String(orderid) };

    const [rows] = await bigquery.query({ query, params });
    return rows.map(normalizeReviewRow);
  },

  // Create a review
  async createReview(data) {
    const reviewid = randomUUID();

    // Optional: enforce rating bounds 1–5
    let rating =
      typeof data.rating === "number" ? data.rating : null;
    if (rating != null) {
      rating = Math.max(1, Math.min(5, rating));
    }

    const params = {
      reviewid,
      userid: String(data.userid),
      productid: String(data.productid),
      orderid: String(data.orderid),
      rating,
      title: data.title ?? null,
      body: data.body ?? null,
    };

    const query = `
      INSERT INTO \`${dataset}.${table}\`
      (reviewid, userid, productid, orderid, rating, title, body)
      VALUES (@reviewid, @userid, @productid, @orderid, @rating, @title, @body)
    `;

    await bigquery.query({ query, params });

    return normalizeReviewRow(params);
  },

  // Update an existing review
  async updateReview(reviewid, data) {
    let rating =
      typeof data.rating === "number" ? data.rating : null;
    if (rating != null) {
      rating = Math.max(1, Math.min(5, rating));
    }

    const params = {
      reviewid: String(reviewid),
      rating,
      title: data.title ?? null,
      body: data.body ?? null,
    };

    const query = `
      UPDATE \`${dataset}.${table}\`
      SET
        rating = @rating,
        title = @title,
        body = @body
      WHERE reviewid = @reviewid
    `;

    await bigquery.query({ query, params });

    return {
      reviewid,
      userid: null,     // not changed here
      productid: null,  // not changed here
      orderid: null,    // not changed here
      rating: params.rating,
      title: params.title,
      body: params.body,
    };
  },

  // Delete review
  async deleteReview(reviewid) {
    const query = `
      DELETE FROM \`${dataset}.${table}\`
      WHERE reviewid = @reviewid
    `;
    const params = { reviewid: String(reviewid) };

    await bigquery.query({ query, params });
    return true;
  },
};

export default reviewService;
