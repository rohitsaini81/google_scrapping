import fs from "fs";
import { proxyFile } from "../app.js";

export let proxies = [];
export const loadProxies = async () => {
  proxies = await fs
    .readFileSync(proxyFile, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  console.log("Loaded Proxies:");
};
// loadProxies()

export const save_data = (filename, data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  console.log("Data saved successfully!");
};
