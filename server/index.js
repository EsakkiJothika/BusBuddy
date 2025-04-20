let express = require("express");
const Connectdb = require("./lib/db.connect");
let cors = require("cors");
let cookieparser = require("cookie-parser");
const authrouter = require("./module/auth.module");
const busrouter = require("./module/bus.module");

let app = express();


//  JSON parsing and CORS setup
app.use(express.json());
app.use(cors({
  origin: "https://bus-buddy-73fm.vercel.app",
  credentials: true
}));
app.use(cookieparser());

//  Connect to DB
Connectdb();

//  Routes
app.use("/auth", authrouter);
app.use("/bus", busrouter);

//  Start Server
app.listen(4000, () => {
  console.log("server is running at : http://localhost:4000");
});
