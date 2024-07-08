import { configDotenv } from "dotenv";

configDotenv();

export default  {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://29aksharchavda:Aksharchavda@wory-freelancer.oddc0h2.mongodb.net/?retryWrites=true&w=majority&appName=wory-freelancer',
  jwtSecret: process.env.JWT_SECRET || 'secret'
}
