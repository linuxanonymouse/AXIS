import "dotenv/config";
const url = process.env.DATABASE_URL;
const apiKey = url.split("api_key=")[1];
try {
  const decoded = JSON.parse(Buffer.from(apiKey, "base64url").toString("utf8"));
  console.log("databaseUrl:", decoded.databaseUrl);
  console.log("shadowDatabaseUrl:", decoded.shadowDatabaseUrl);
} catch (e) {
  // try standard base64
  try {
    const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString("utf8"));
    console.log("databaseUrl:", decoded.databaseUrl);
  } catch (e2) {
    console.error("Could not decode:", e2.message);
    console.log("Raw key (first 100):", apiKey.slice(0, 100));
  }
}
