const addressTypeDefs = /* GraphQL */ `
  type Address {
    addressid: ID!        # Primary Key (STRING)
    userid: ID!           # Foreign Key → User.userid
    label: String         # Home, Work, Shipping, Billing
    line1: String!        # Required
    line2: String         # Optional
    city: String!
    state: String!
    country: String!
    postal_code: String!
  }

  type Query {
    addresses: [Address!]!         # Get all addresses
    address(addressid: ID!): Address
    addressesByUser(userid: ID!): [Address!]!   # Useful helper
  }

  type Mutation {
    createAddress(
      userid: ID!
      label: String
      line1: String!
      line2: String
      city: String!
      state: String!
      country: String!
      postal_code: String!
    ): Address

    updateAddress(
      addressid: ID!
      label: String
      line1: String
      line2: String
      city: String
      state: String
      country: String
      postal_code: String
    ): Address

    deleteAddress(addressid: ID!): Boolean
  }
`;

export default addressTypeDefs;
