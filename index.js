const express = require("express");
const app = express();

app.get("/", ( req, res ) => {
	res.send("app is successfully initilized");
});




const _PORT = 3300;
app.listen(_PORT, console.log(`Server is running on http://localhost:${_PORT}`));