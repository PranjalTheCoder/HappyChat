import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";


dotenv.config({
    path: "./.env",
});
  

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;


connectDB(mongoURI);


const app = express();


//using middleware here
app.use(express.json());
// app.use(express.urlencoded());//json data ko use krne ke liye
//multer ka use krege
app.use(cookieParser());



app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
    console.log("Welcome to Home Page");
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is Listing on the Port ${port}`);
});
