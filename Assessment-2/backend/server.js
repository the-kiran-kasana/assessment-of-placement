const express = require("express")
const app = express();

app.use(express.json());

app.listen(2020 , () => {
   console.log("server is running on port 2020s")
})