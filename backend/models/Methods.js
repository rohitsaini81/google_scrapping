import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import {
  proxy_auth,
  proxy_host,
  proxy_password,
  proxy_username,
  proxy_file,
  Print
} from "../app.js";
import { proxies } from "./File.js";

export let browser, page;

export const startBrowser = async (__proxy) => {
  puppeteer.use(StealthPlugin());

  if (proxy_host.length>0) {
    console.log("proxy host : ", __proxy);
    browser = await puppeteer.launch({
      headless: true,
      args: [`--proxy-server=${proxy_host}`],
      // args: [`--proxy-server=${__proxy}`,'--ignore-certificate-errors']
    });
  } else if(proxy_file){
    browser = await puppeteer.launch({
      headless: true,
      // args: [`--proxy-server=${proxy_host}`],
      args: [`--proxy-server=${__proxy}`,'--ignore-certificate-errors']

    });
  }

  page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
  );

  proxy_auth
    ? page.authenticate({ username: proxy_username, password: proxy_password })
    : console.log("No Auth for proxy");

  // browser = await puppeteer.launch({
  //     headless: false,
  //     args: [
  //         `--proxy-server=${px1}`,
  //         '--no-sandbox',
  //         '--disable-setuid-sandbox',
  //         '--disable-gpu',
  //         '--disable-dev-shm-usage',
  //         '--disable-accelerated-2d-canvas',
  //         '--disable-software-rasterizer',
  //         '--use-gl=desktop',
  //         '--enable-features=UseOzonePlatform',
  //         '--ozone-platform=x11'
  //     ]
  // });

  // page = await browser.newPage();
  // await page.authenticate({username:proxy_username, password:proxy_password})
};

async function scrapeGoogleShopping(url) {
  // await startBrowser()
  // const url = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(searchQuery)}`;

  await page.goto(url, { waitUntil: "networkidle2" });

  await page.goto(url);
  await console.log("scrapping when", new Date().toLocaleTimeString());
  await page.screenshot({ path: "screenshot.png" }); // Take a screenshot

  // Wait for the products to appear
  if (await page.$("input#captcha")) {
    console.log("Google detected bot activity! Solve the CAPTCHA manually.");
    await page.screenshot({ path: "captcha.png" }); // Take a screenshot
    await browser.close();
    // process.exit();
  }

  // await page.setCookie({
  //     name: 'CONSENT',
  //     value: 'YES+',
  //     domain: '.google.com'
  // });

  // Click "Accept Cookies" if found
  validateCookies();

  // await page.evaluate(() => {
  //     window.scrollBy(0, window.innerHeight);
  // });
  // window.scrollBy(0, window.innerHeight);
  // await new Promise(resolve => setTimeout(resolve, 3000));

  // await page.waitForSelector(".sh-dgnr__grid-result", { timeout: 50000 }).catch((e) => console.log("No products found\n", e, "\n", page));
  // await page.evaluate(, { timeout: 50000 }).catch((e) => console.log("No products found\n", e, "\n", page));
  // const rawHTML = await page.evaluate(() => document.documentElement.outerHTML);
  // console.log(rawHTML);

  const products = await page.evaluate(async () => {
    await window.scrollBy(0, window.innerHeight);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return [...document.querySelectorAll(".sh-dgr__grid-result")].map((el) => ({
      title:
        el.querySelector(".tAxDx, .sh-np__product-title")?.innerText?.trim() ||
        "No Title",
      price:
        el.querySelector(".a8Pemb, .sh-pr__price")?.innerText?.trim() ||
        "No Price",
      link: el
        .querySelector(".shntl, .sh-np__click-target")
        ?.getAttribute("href")
        ? "https://www.google.com" +
          el.querySelector(".shntl, .sh-np__click-target")?.getAttribute("href")
        : "No Link",
      image:
        el
          .querySelector(".ArOc1c img, .sh-div__image img")
          ?.getAttribute("src") || "No Image",
    }));
  });

  console.log(products[1]);
  console.log(products[2]);

  // await browser.close();
  await page.screenshot({ path: "screenshot.png", fullPage: true }); // Takes full-page screenshot
  await console.log("ok done ", new Date().toLocaleTimeString());
  return products;
}

// Example usage
// scrapeGoogleShopping("nice");

const validateCookies = async () => {
  try {
    // Check if the cookie popup exists before interacting
    await page.screenshot({ path: "screenshot.png" }); // Take a screenshot
    const cookieButton = await page.$('button[aria-label="Tout accepter"]');
    if (cookieButton) {
      console.log("Cookies popup detected. Accepting...");

      await cookieButton.click(); // Click "Accept"

      // Wait until the popup disappears
      await page.waitForFunction(
        () => !document.querySelector('button[aria-label="Tout accepter"]'),
        { timeout: 10000 }
      );

      console.log("Cookies accepted and popup disappeared.");

      // Save cookies
      // await saveCookies(page);

      // Screenshot for verification
      await page.screenshot({ path: "screenshot.png", fullPage: true });

      //
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        const resourceType = req.resourceType();
        if (["image", "stylesheet", "font", "xhr"].includes(resourceType)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      //

      // Reload to apply changes
      await page.reload({ waitUntil: "domcontentloaded" });
    } else {
      console.log("No cookies popup found.");
    }
  } catch (e) {
    console.error("Error handling the cookie popup:", e);
  }
};

export default scrapeGoogleShopping;

let currentProxyIndex = 0;
export const rotationProxy = async () => {
  if (browser) {
    await browser.close(); // Close previous browser instance
  }

  if (proxies.length === 0) {
    console.log("No proxies found!");
    return;
  }
  
  const proxy = proxies[currentProxyIndex];
  console.log(proxy)
  browser = await startBrowser(proxy);
  
  currentProxyIndex = (currentProxyIndex + 1) % proxies.length; // Rotate index
  Print("Proxy rotated")
  return proxy;
};



const updateProxy = (proxy)=>{

}
// const validateCookies=async()=>{
//     try {
//         await page.waitForSelector('button[aria-label="Tout accepter"]', { timeout: 5000 });
//         await page.click('button[aria-label="Tout accepter"]');
//         console.log("Accepted cookies");

//         // Wait until the popup disappears (ensures cookies are actually accepted)
//         await page.waitForFunction(() => !document.querySelector('button[aria-label="Tout accepter"]'), { timeout: 10000 });

//         console.log("Cookies popup disappeared.");
//         await saveCookies(page);
//         await page.screenshot({ path: 'screenshot.png', fullPage: true }); // Takes full-page screenshot

//         await page.reload({ waitUntil: "networkidle2" }); // Reload to apply changes
//     } catch (e) {
//         console.log("No cookies prompt found or failed to accept.");
//     }
// }
