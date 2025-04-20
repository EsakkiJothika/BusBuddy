let express = require("express");
const Connectdb = require("./lib/db.connect");
let cors = require("cors");
let cookieparser = require("cookie-parser");
const authrouter = require("./module/auth.module");
const busrouter = require("./module/bus.module");

let app = express();

//  Enable preflight requests and CORS for credentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://busbooking-eta.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//  Handle preflight OPTIONS request for all routes
app.options('*', cors({
  origin: "https://busbooking-eta.vercel.app",
  credentials: true
}));

//  JSON parsing and CORS setup
app.use(express.json());
app.use(cors({
  origin: "https://busbooking-eta.vercel.app",
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
