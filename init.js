#!/usr/bin/env node
const crypto = require("crypto");
const fs = require("fs");
const sourcePath = "./.env";

const PORT = process.argv[2] || "4001";

console.log("Generating dotenv :");
const TOKEN_KEY = crypto.randomBytes(32).toString("hex");

console.log(`TOKEN_KEY=${TOKEN_KEY}`);
console.log(`PORT=${PORT}`);
fs.writeFileSync(sourcePath, `TOKEN_KEY=${TOKEN_KEY}\nPORT=${PORT}`);
