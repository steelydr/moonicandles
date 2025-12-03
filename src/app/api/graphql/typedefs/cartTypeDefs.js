const cartTypeDefs = /* GraphQL */ `
  type Cart {
    cartid: ID!                    # PK
    user_id: ID!                   # FK → user.userid

    customization_id: ID           # FK → custom_design.customizationid (optional)
    product_variant_id: ID         # FK → product_variant.product_variant (optional)

    quantity: Int!                 # Must be positive integer
    cart_status: String!           # active, checked_out, abandoned, saved_for_later
  }

  type Query {
    carts: [Cart!]!                          # get all carts
    cart(cartid: ID!): Cart                  # get one cart
    cartsByUser(user_id: ID!): [Cart!]!      # get all carts for a user
  }

  type Mutation {
    createCart(
      user_id: ID!
      customization_id: ID
      product_variant_id: ID
      quantity: Int!
      cart_status: String!
    ): Cart

    updateCart(
      cartid: ID!
      customization_id: ID
      product_variant_id: ID
      quantity: Int
      cart_status: String
    ): Cart

    deleteCart(cartid: ID!): Boolean
  }
`;

export default cartTypeDefs;
