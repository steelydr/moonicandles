const paymentTypeDefs = /* GraphQL */ `
  type Payment {
    paymentid: ID!                 # PK
    orderid: ID!                   # FK → order.orderid

    payment_status: String!        # pending, processing, completed, failed, refunded, cancelled
    payment_method: String!        # credit_card, debit_card, paypal, apple_pay, google_pay, bank_transfer
    currency: String!              # ISO-4217 code (USD, EUR, GBP)

    payment_msg: String            # optional gateway message or transaction reference
  }

  type Query {
    payments: [Payment!]!                  # list all
    payment(paymentid: ID!): Payment       # get one
    paymentsByOrder(orderid: ID!): [Payment!]!
  }

  type Mutation {
    createPayment(
      orderid: ID!
      payment_status: String!
      payment_method: String!
      currency: String!
      payment_msg: String
    ): Payment

    updatePayment(
      paymentid: ID!
      payment_status: String
      payment_method: String
      currency: String
      payment_msg: String
    ): Payment

    deletePayment(paymentid: ID!): Boolean
  }
`;

export default paymentTypeDefs;
