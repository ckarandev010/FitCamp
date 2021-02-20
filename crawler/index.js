const cheerio = require("cheerio");
const axios = require("axios").default;
const puppeteer = require("puppeteer");
const chalk = require("chalk");

axios.defaults.timeout = 1000000000;

const exercise_memo = {};
const csv_data = [];

function convertArrayToCSV(arr, headers) {
  let csv = "";
  csv += headers.join(",") + "\n";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < headers.length; j++) {
      if (arr[i][headers[j]]) {
        csv += arr[i][headers[j]];
      }
      csv += ",";
    }
    csv.length = csv.length - 1;
    csv += "\n";
  }
  return csv;
}

const fs = require("fs");

async function driver() {
  const response = await axios.get("https://exrx.net/Lists/Directory");
  const page_html = response.data;
  const $ = cheerio.load(page_html);

  const link_list = [];
  $(".row > div > ul > li > a").each((i, elem) => link_list.push(elem));

  for (let i = 0; i < link_list.length; i++) {
    const attr_href = $(link_list[i]).attr().href;
    const body_url = attr_href.includes("https://exrx.net/Lists/")
      ? $(link_list[i]).attr().href
      : "https://exrx.net/Lists/" + $(link_list[i]).attr().href;
    const body_part = $(link_list[i]).text();

    //console.log(body_url);
    const response = await axios.get(body_url);

    const body_part_html = response.data;
    const $$ = cheerio.load(body_part_html);

    console.log(body_part + "---------------------------");
    const exercise_array = [];
    $$("article ul > li > a").each((i, node) => exercise_array.push(node));
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    for (let j = 0; j < exercise_array.length; j++) {
      let exercise_attr_href = $$(exercise_array[j]).attr().href;
      let exercise_url = exercise_attr_href.includes("https://exrx.net")
        ? exercise_attr_href
        : "https://exrx.net" + exercise_attr_href.split("../..")[1];
      try {
        //console.log(exercise_url);
        if (!exercise_memo[exercise_url]) {
          await page.goto(exercise_url);
          const data = await page.evaluate(() => {
            let exercise_name = document.querySelector(".page-title").innerHTML;
            let [
              first_title,
              first_body,
              second_title,
              second_body,
            ] = document.querySelectorAll(".row > div:first-child > p");
            return {
              exercise_name,
              [second_title.innerText.toLowerCase()]: second_body.innerText,
              [first_title.innerText.toLowerCase()]: first_body.innerText,
            };
          });

          exercise_memo[exercise_url] = data;
        }
        console.log(exercise_memo[exercise_url]);
        csv_data.push({ body_part, ...exercise_memo[exercise_url] });
      } catch (e) {
        console.error(chalk.red(e.message));
        console.error(chalk.red(body_part), chalk.red(exercise_url));
      }
    }
    await browser.close();
  }
  console.log(csv_data);
  const header = ["body_part", "exercise_name", "preparation", "execution"];
  const csv = convertArrayToCSV(csv_data, header);
  fs.writeFileSync("data.csv", csv);
}

driver();
