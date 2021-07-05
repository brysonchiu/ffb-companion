const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://www.fantasypros.com/nfl/projections/";
const urlPosisitons = ["qb", "rb", "wr", "te"];
const urlSuffix = ".php?week=draft";
const statsTable = [];

function getStats() {
  urlPosisitons.forEach(urlPosisiton => {
    axios(url + urlPosisiton + urlSuffix)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const tableBodyRows = $("#data > tbody > tr");
        const tableHead = $("#data > thead > tr");
        const headersTable = [];

        function getplayerInfo() {
          tableBodyRows.each(function() {
            const td = $(this).find("td");
            const statsObj = {};
            for (i = 0; i < td.length; i++) {
              if (i == 0) {
                statsObj.PLAYER = td[i].children[0].children[0].data;
                statsObj.POSITION = urlPosisiton.toUpperCase();
                statsObj.TEAM = td[i].children[1].data.trim();
              } else {
                headerValue = headersTable[i];
                statsObj[headerValue] = td[i].children[0].data.trim();
              }
            }
            statsTable.push(statsObj);
          });
        }

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

        function getStatsTypeHeaders(headerRow) {
          const headingStatsTypeCells = $(headerRow).find("td");
          const headingStatsTypeTable = [];
          let headingStatsTypeCell, headingStatsTypeCellSpan;
          headingStatsTypeCells.each(function() {
            if (
              $(this)
                .text()
                .trim()
            ) {
              headingStatsTypeCell = $(this)
                .text()
                .trim();
            }
            if ($(this)[0].attribs.colspan) {
              headingStatsTypeCellSpan = parseInt($(this)[0].attribs.colspan);
            } else {
              headingStatsTypeCellSpan = 1;
            }

            headingStatsTypeTable.push({
              headingStatsTypeCell,
              headingStatsTypeCellSpan
            });
          });
          return headingStatsTypeTable;
        }

        function getAttrHeaders(headerRow) {
          const headingAttrCells = $(headerRow).find("th");
          const headingAttrTable = [];
          let headingAttrCell;
          headingAttrCells.each(function() {
            if (
              $(this)
                .text()
                .trim()
            ) {
              headingAttrCell = $(this)
                .text()
                .trim();
            }
            headingAttrTable.push({
              headingAttrCell
            });
          });
          return headingAttrTable;
        }

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
                heading =
                  statsTypeHeaders[i].headingStatsTypeCell +
                  " " +
                  attrHeaders[n].headingAttrCell;
              }
              headersTable.push(heading);
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

function jsonOutput(statsTable) {
  // statsTable = Object.assign({}, statsTable);
  statsTable = JSON.stringify(statsTable);

  fs.writeFile("stats.json", statsTable, "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}
getStats();
setTimeout(function() {
  jsonOutput(statsTable);
}, 20000);
