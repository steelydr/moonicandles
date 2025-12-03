const orderTypeDefs = /* GraphQL */ `
  type Order {
    orderid: ID!                     # PK
    userid: ID!                      # FK → user.userid
    addressid: ID!                   # FK → address.addressid (shipping)
    cartid: ID!                      # FK → cart.cartid (converted cart)

    order_created_at: String!        # ISO timestamp string (UTC)
    order_status: String!            # pending, confirmed, processing, shipped, delivered, cancelled, refunded

    subtotal_amount: Int!            # cents
    tax_amount: Int!                 # cents
    shipment_amount: Int!            # cents
    total_amount: Int!               # cents

    shipment_location: String        # optional live tracking location
  }

  type Query {
    orders: [Order!]!
    order(orderid: ID!): Order
    ordersByUser(userid: ID!): [Order!]!
  }

  type Mutation {
    createOrder(
      userid: ID!
      addressid: ID!
      cartid: ID!

      order_status: String!          # required
      subtotal_amount: Int!
      tax_amount: Int!
      shipment_amount: Int!
      total_amount: Int!

      shipment_location: String
    ): Order

    updateOrder(
      orderid: ID!
      order_status: String
      shipment_location: String
    ): Order

    deleteOrder(orderid: ID!): Boolean
  }
`;

export default orderTypeDefs;
