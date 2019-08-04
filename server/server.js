const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const { MONGOURI } = require("./config");

const schema = require("./schema/schema");

const app = express();

mongoose.connect(MONGOURI, { useNewUrlParser: true }, err =>
  console.log("Db Running")
);

app.use(
  "/graphql",
  graphqlHttp({
    graphiql: true,
    schema
  })
);

app.listen(5000, () => console.log("Server Running"));
