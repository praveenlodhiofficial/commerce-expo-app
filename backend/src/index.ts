import express from "express";

import { config } from "@/config";

const app = express();
console.log("Config:", config);

app.get("/signup", (req, res) => {
  res.send("Signup endpoint");
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
