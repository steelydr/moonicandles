const productTypeDefs = /* GraphQL */ `
  type Product {
    productid: ID!              # PK (STRING)
    product_name: String!       # required product display name
    imageurl: String            # optional cloud storage image URL
    candle_type: String         # pillar, jar, taper, votive, tealight, floating, container
    wax_type: String            # soy, beeswax, paraffin, coconut, palm, gel
    scent_type: String          # fragrance name or profile
    container_type: String      # glass, tin, ceramic, bamboo, concrete, none
  }

  type Query {
    products: [Product!]!                 # get all products
    product(productid: ID!): Product      # get product by id
  }

  type Mutation {
    createProduct(
      product_name: String!               # required
      imageurl: String
      candle_type: String
      wax_type: String
      scent_type: String
      container_type: String
    ): Product

    updateProduct(
      productid: ID!
      product_name: String
      imageurl: String
      candle_type: String
      wax_type: String
      scent_type: String
      container_type: String
    ): Product

    deleteProduct(productid: ID!): Boolean
  }
`;

export default productTypeDefs;
