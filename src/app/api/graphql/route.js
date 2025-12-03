// src/app/api/graphql/route.js
import { createYoga, createSchema } from "graphql-yoga";

import userTypeDefs from "./typedefs/userTypeDefs.js";
import userResolvers from "./resolvers/userResolvers.js";

import addressTypeDefs from "./typedefs/addressTypeDefs.js";
import addressResolvers from "./resolvers/addressResolvers.js";

import cartTypeDefs from "./typedefs/addressTypeDefs.js";
import cartResolvers from "./resolvers/addressResolvers.js";

import customDesignTypeDefs from "./typedefs/addressTypeDefs.js";
import customDesignResolvers from "./resolvers/addressResolvers.js";

import orderTypeDefs from "./typedefs/addressTypeDefs.js";
import orderResolvers from "./resolvers/addressResolvers.js";

import paymentTypeDefs from "./typedefs/addressTypeDefs.js";
import paymentResolvers from "./resolvers/addressResolvers.js";

import productTypeDefs from "./typedefs/addressTypeDefs.js";
import productResolvers from "./resolvers/addressResolvers.js";

import productVariantTypeDefs from "./typedefs/addressTypeDefs.js";
import productVariantResolvers from "./resolvers/addressResolvers.js";

import reviewTypeDefs from "./typedefs/addressTypeDefs.js";
import reviewResolvers from "./resolvers/addressResolvers.js";

const schema = createSchema({
  typeDefs: [userTypeDefs,addressTypeDefs, cartTypeDefs,customDesignTypeDefs,orderTypeDefs,paymentTypeDefs,productTypeDefs,productVariantTypeDefs,reviewTypeDefs],
  resolvers: [userResolvers,addressResolvers,cartResolvers,customDesignResolvers,orderResolvers,paymentResolvers,productResolvers,productVariantResolvers,reviewResolvers],
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
});

export async function GET(request) {
  return yoga.handleRequest(request);
}

export async function POST(request) {
  return yoga.handleRequest(request);
}
