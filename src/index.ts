import "reflect-metadata";
import express from "express";
import {ApolloServer} from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { FamilyResolver } from "./resolvers/familyResolver";
import { createConnection } from "typeorm";
import { GuestResolver } from "./resolvers/guestResolver";
import compression from "compression";

(async () => {
  const app = express();
  app.use(compression());
  app.get('/', (_req, res) => res.send('say hello'));

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
