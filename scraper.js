const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.fantasypros.com/nfl/projections/";
const urlPosisitons = ["qb", "rb", "wr", "te"];
const urlSuffix = ".php?week=draft";
const statsObject = {};

function getStats() {
  urlPosisitons.forEach((urlPosisiton) => {
    axios(url + urlPosisiton + urlSuffix)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const tableBodyRows = $("#data > tbody > tr");
        const tableHead = $("#data > thead > tr");
        const headersTable = [];

        //Get player stats and combines it with headers
        function getplayerInfo() {
          tableBodyRows.each(function () {
            const playerId = $(this).attr("class").match(/\d+/g)[0];
            const td = $(this).find("td");
            const statsObj = {};
            for (i = 0; i < td.length - 1; i++) {
              if (i == 0) {
                statsObj.PLAYER = td[i].children[0].children[0].data;
                statsObj.POSITION = urlPosisiton.toUpperCase();
                statsObj.TEAM = td[i].children[1].data.trim();
              } else {
                headerValue = headersTable[i];
                statsObj[headerValue] = td[i].children[0].data.trim();
              }
            }
            statsObject[playerId] = statsObj;
          });
        }

        //Get Stat Categories
        function parseTableHeaders() {
          let statsTypeHeaders, attrHeaders;
          for (i = 0; i < tableHead.length; i++) {
            if (i == 0) {
              statsTypeHeaders = getStatsTypeHeaders(tableHead[i]);
            } else if (i == 1) {
              attrHeaders = getAttrHeaders(tableHead[i]);
            }
          }
          return combineTableHeaders(statsTypeHeaders, attrHeaders);
        }

        //Returns a table with overall categories (passing, recieving, rushing, misc) and their cell spans
        function getStatsTypeHeaders(headerRow) {
          const headingStatsTypeCells = $(headerRow).find("td");
          const headingStatsTypeTable = [];
          let headingStatsTypeCell, headingStatsTypeCellSpan;
          headingStatsTypeCells.each(function () {
            if ($(this).text().trim()) {
              headingStatsTypeCell = $(this).text().trim();
            }
            if ($(this)[0].attribs.colspan) {
              headingStatsTypeCellSpan = parseInt($(this)[0].attribs.colspan);
            } else {
              headingStatsTypeCellSpan = 1;
            }

            headingStatsTypeTable.push({
              headingStatsTypeCell,
              headingStatsTypeCellSpan,
            });
          });
          return headingStatsTypeTable;
        }

        //Returns a table with stat categories (Rec, Tds, Tds, etc)
        function getAttrHeaders(headerRow) {
          const headingAttrCells = $(headerRow).find("th");
          const headingAttrTable = [];
          let headingAttrCell;
          headingAttrCells.each(function () {
            if ($(this).text().trim()) {
              headingAttrCell = $(this).text().trim();
            }
            headingAttrTable.push({
              headingAttrCell,
            });
          });
          return headingAttrTable;
        }

        // Combines stat categories with overall categories
        function combineTableHeaders(statsTypeHeaders, attrHeaders) {
          let cellSpan = 0;
          let heading;
          for (i = 0; i < statsTypeHeaders.length; i++) {
            prevCellSpan = cellSpan;
            cellSpan = cellSpan + statsTypeHeaders[i].headingStatsTypeCellSpan;
            for (n = prevCellSpan; n < cellSpan; n++) {
              if (!statsTypeHeaders[i].headingStatsTypeCell) {
                heading = attrHeaders[n].headingAttrCell;
              } else {
                heading = statsTypeHeaders[i].headingStatsTypeCell + " " + attrHeaders[n].headingAttrCell;
              }
              if (heading !== "MISC FPTS") {
                headersTable.push(heading);
              }
            }
          }
          return headersTable;
        }

        parseTableHeaders();

        getplayerInfo();
      })
      .catch(console.error);
  });
}

function jsonOutput(statsObject) {
  // statsTable = Object.assign({}, statsTable);
  statsObject = JSON.stringify(statsObject);

  fs.writeFile("ffb-app/public/stats.json", statsObject, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}
getStats();
setTimeout(function () {
  jsonOutput(statsObject);
}, 20000);
