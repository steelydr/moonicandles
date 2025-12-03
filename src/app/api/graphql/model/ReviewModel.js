// src/app/api/graphql/models/ReviewModel.js

/**
 * Review Schema (BigQuery-Backed)
 *
 * @typedef {Object} Review
 * @property {string} reviewid     // PK
 * @property {string} userid       // FK → user.userid (review author)
 * @property {string} productid    // FK → product.productid (product being reviewed)
 * @property {string} orderid      // FK → order.orderid (verified purchase)
 * @property {number} rating       // Integer 1–5
 * @property {string|null} title   // Short headline for review
 * @property {string|null} body    // Full review content
 */

const ReviewModel = {
  reviewid: "string",
  userid: "string",
  productid: "string",
  orderid: "string",
  rating: "int64",
  title: "string",
  body: "string",
};

export default ReviewModel;
