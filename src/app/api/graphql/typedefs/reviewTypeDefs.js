const reviewTypeDefs = /* GraphQL */ `
  type Review {
    reviewid: ID!            # PK
    userid: ID!              # FK → user.userid
    productid: ID!           # FK → product.productid
    orderid: ID!             # FK → order.orderid (verified purchase)

    rating: Int!             # 1–5 integer
    title: String            # optional short headline
    body: String             # optional review body
  }

  type Query {
    reviews: [Review!]!                    # get all reviews
    review(reviewid: ID!): Review          # get one review
    reviewsByProduct(productid: ID!): [Review!]!
    reviewsByUser(userid: ID!): [Review!]!
    reviewsByOrder(orderid: ID!): [Review!]!
  }

  type Mutation {
    createReview(
      userid: ID!
      productid: ID!
      orderid: ID!
      rating: Int!             # 1–5
      title: String
      body: String
    ): Review

    updateReview(
      reviewid: ID!
      rating: Int
      title: String
      body: String
    ): Review

    deleteReview(reviewid: ID!): Boolean
  }
`;

export default reviewTypeDefs;
