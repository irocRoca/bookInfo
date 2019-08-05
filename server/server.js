const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const { MONGOURI } = require("./config");
const cors = require("cors");

const schema = require("./schema/schema");

const app = express();
app.use(cors());

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
