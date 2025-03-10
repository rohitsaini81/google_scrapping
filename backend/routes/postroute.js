import express from "express";
const routerp = express.Router();
import axios from "axios";
import * as cheerio from "cheerio";
import scrapeGoogleShopping, { rotationProxy } from "../models/Methods.js";
import { write } from "../models/RW.js";
import { Print } from "../app.js";
import { createData, readData } from "../lowdb/lowdb.js";
// import { Actor } from "apify";

routerp.post("/scrape", async (req, res) => {
  try {
    let { searchQuery, minPrice, maxPrice, brand } = req.body;
    console.log(req.body);
    console.log(`Scraping Google Shopping for: ${searchQuery}`);

    if (searchQuery == "") {
      searchQuery = "man's+fashion";
    }
    if (minPrice == "") {
      minPrice = "100";
    }
    if (maxPrice == "") {
      maxPrice = "10000";
    }
    if (brand == "") {
      brand = "any";
    }

    // Construct Google Shopping search URL
    // const url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(searchQuery)}`;
    // https://www.google.com/search?tbm=shop&q=shoes+brand:sparx

    const url = `https://www.google.com/search?tbm=shop&q=${searchQuery}+brand:${brand}&tbs=mr:1,price:1,ppr_min:${minPrice},ppr_max:${maxPrice}`;

    console.log("uri : ", url);
    const _data = await scrapeGoogleShopping(url);
    write(_data);

    // console.log(_data," by pupet")

    // save_data(searchQuery,_data)
    res.json({ status: "success", _data });

  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

routerp.get("/scrape/:searchQuery", async (req, res) => {
  await console.log("before process : " + new Date().toLocaleTimeString());

  try {
    const searchQuery = req.params.searchQuery;
    console.log(`Scraping Google Shopping for: ${searchQuery}`);
    const url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(
      searchQuery
    )}`;
    console.log("uri : ", url);
    await console.log(
      "before process start : " + new Date().toLocaleTimeString()
    );

    const _data = await scrapeGoogleShopping(url);

    // console.log(_data," by pupet")
    await console.log("after process : " + new Date().toLocaleTimeString());
    res.json({ status: "success", _data });
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
});


routerp.get("/proxy",async (req,res)=>{
  try {
    const proxy_isSet =await rotationProxy();
    Print(proxy_isSet)
    res.send(proxy_isSet)
    
  } catch (error) {
    res.send(error.message)
  }
});

routerp.get("/proxyList",async(req,res)=>{
  const list = await readData();
  res.send(list)
})
routerp.get("/addProxy/:proxy",(req,res)=>{
  Print(req.params.proxy)
  res.send(proxies)

})


export default routerp;
