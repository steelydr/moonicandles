const customDesignTypeDefs = /* GraphQL */ `
  type CustomDesign {
    customizationid: ID!                 # PK
    userid: ID!                          # FK → user.userid

    message_on_container: String         # printed text on jar
    ai_generated_image: String           # AI-designed image URL

    candle_type: String                  # jar, pillar, container, moulded, etc.
    wax_type: String                     # soy, beeswax, paraffin, coconut, palm, gel
    wax_base_color: String               # hex or named color
    scent_type: String                   # fragrance blend

    container_type: String               # glass, tin, ceramic, concrete, bamboo
    container_mould_type: String         # round, square, hexagonal, organic
    container_color: String              # hex or named

    height_width_inches: String          # format: "HxW"
    wax_amount_oz: Float                 # oz (BigQuery INT64 → Float safest)
    wick_type: String                    # cotton, wood, hemp

    quantity: Int!                       # required
    price: Int!                          # cents

    burn_time_hours: Int                 # estimated burn time

    topper_mould_type: String            # peony, tree, star, rose, etc.
    topper_wax_color: String             # color for topper
  }

  type Query {
    customDesigns: [CustomDesign!]!
    customDesign(customizationid: ID!): CustomDesign
    customDesignsByUser(userid: ID!): [CustomDesign!]!
  }

  type Mutation {
    createCustomDesign(
      userid: ID!

      message_on_container: String
      ai_generated_image: String

      candle_type: String
      wax_type: String
      wax_base_color: String
      scent_type: String

      container_type: String
      container_mould_type: String
      container_color: String

      height_width_inches: String
      wax_amount_oz: Float
      wick_type: String

      quantity: Int!
      price: Int!

      burn_time_hours: Int

      topper_mould_type: String
      topper_wax_color: String
    ): CustomDesign

    updateCustomDesign(
      customizationid: ID!

      message_on_container: String
      ai_generated_image: String

      candle_type: String
      wax_type: String
      wax_base_color: String
      scent_type: String

      container_type: String
      container_mould_type: String
      container_color: String

      height_width_inches: String
      wax_amount_oz: Float
      wick_type: String

      quantity: Int
      price: Int

      burn_time_hours: Int

      topper_mould_type: String
      topper_wax_color: String
    ): CustomDesign

    deleteCustomDesign(customizationid: ID!): Boolean
  }
`;

export default customDesignTypeDefs;
