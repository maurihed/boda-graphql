import "reflect-metadata";
import cors from "cors";
import express from "express";
import compression from "compression";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import {ApolloServer} from "apollo-server-express";
import { FamilyResolver } from "./resolvers/familyResolver";
import { GuestResolver } from "./resolvers/guestResolver";

(async () => {
  const app = express();
  app.use(compression());
  app.use(cors());
  app.get('/', (_req, res) => res.send('I\'m working'));

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FamilyResolver, GuestResolver]
    })
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Express listening port: 4000');
  });
})()
