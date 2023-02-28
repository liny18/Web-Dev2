const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();

app.use(express.json());
app.use("/api/v1", router);
app.use("/quiz1",express.static('../client/dist'));
app.listen(port, () => console.log(`Listening on port ${port}`));