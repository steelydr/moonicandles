const productVariantTypeDefs = /* GraphQL */ `
  type ProductVariant {
    product_variant: ID!            # PK
    productid: ID!                  # FK → Product.productid
    product_variant_name: String!   # Required display name

    height_width_inches: String     # Format "HxW" e.g. "4x3"
    wax_amount_oz: Float            # ounces (BigQuery INT64 → Float is safest in GraphQL)
    wick_type: String               # cotton, wood, hemp, etc.
    container_color: String         # variant container color
    wax_base_color: String          # wax color
    burn_time_hours: Int            # burn hours
    stock_quantity: Int!            # required inventory count
    low_stock_threshold: Int        # optional low-stock alert level
  }

  type Query {
    productVariants: [ProductVariant!]!
    productVariant(product_variant: ID!): ProductVariant
    variantsByProduct(productid: ID!): [ProductVariant!]!
  }

  type Mutation {
    createProductVariant(
      productid: ID!
      product_variant_name: String!
      height_width_inches: String
      wax_amount_oz: Float
      wick_type: String
      container_color: String
      wax_base_color: String
      burn_time_hours: Int
      stock_quantity: Int!
      low_stock_threshold: Int
    ): ProductVariant

    updateProductVariant(
      product_variant: ID!
      product_variant_name: String
      height_width_inches: String
      wax_amount_oz: Float
      wick_type: String
      container_color: String
      wax_base_color: String
      burn_time_hours: Int
      stock_quantity: Int
      low_stock_threshold: Int
    ): ProductVariant

    deleteProductVariant(product_variant: ID!): Boolean
  }
`;

export default productVariantTypeDefs;
