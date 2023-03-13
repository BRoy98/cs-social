import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
});

mongoose.set("toObject", {
  virtuals: true,
});

export const connectDB = async (uri?: string) => {
  const conn = mongoose
    .connect(uri || process.env.MONGO_URL || "", {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => mongoose);

  await conn;
};

// connection status logging
mongoose.connection.on("connecting", () => {
  console.log("MongoDB connecting...");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected!");
});
mongoose.connection.on("disconnecting", () => {
  console.log("MongoDB Disconnecting...");
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected!");
});

export * from "./users.model";

export default mongoose;
