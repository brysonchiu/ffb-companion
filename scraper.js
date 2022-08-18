const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.fantasypros.com/nfl/projections/';
const urlPosisitons = ['qb', 'rb', 'wr', 'te', 'k', 'dst'];
const urlSuffix = '.php?week=draft';
const statsObject = {};

function getStats() {
  urlPosisitons.forEach((urlPosisiton) => {
    axios(url + urlPosisiton + urlSuffix)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        const tableBodyRows = $('#data > tbody > tr');
        const tableHead = $('#data > thead > tr');
        const headersTable = [];

        //Get player stats and combines it with headers
        function getplayerInfo() {
          tableBodyRows.each(function () {
            const playerId = $(this).attr('class').match(/\d+/g)[0];
            const td = $(this).find('td');
            const playerStatsObject = {};
            //loop over stat cells, except the last cell, which is total FPTS which is calculated in the app
            for (i = 0; i < td.length - 1; i++) {
              if (i == 0) {
                playerStatsObject.PLAYER = td[i].children[0].children[0].data;
                playerStatsObject.POSITION = urlPosisiton.toUpperCase();
                if (urlPosisiton != 'dst')
                  playerStatsObject.TEAM = td[i].children[1].data.trim();
              } else {
                headerValue = headersTable[i];
                playerStatsObject[headerValue] = td[i].children[0].data.trim();
              }
            }
            statsObject[playerId] = playerStatsObject;
          });
        }

        //Get Stat Categories
        function parseTableHeaders() {
          let statsTypeHeaders, attrHeaders;
          for (i = 0; i < tableHead.length; i++) {
            if (tableHead.length === 2 && i === 0) {
              statsTypeHeaders = getStatsTypeHeaders(tableHead[i]);
            } else if (tableHead.length === 1 || i === 1) {
              attrHeaders = getAttrHeaders(tableHead[i]);
            }
          }
          return combineTableHeaders(statsTypeHeaders, attrHeaders);
        }

        //Returns a table with overall categories (passing, recieving, rushing, misc) and their cell spans
        function getStatsTypeHeaders(headerRow) {
          const headingStatsTypeCells = $(headerRow).find('td');
          const headingStatsTypeTable = [];
          let headingStatsTypeCell, headingStatsTypeCellSpan;
          //for each category, get the name and cellspan
          headingStatsTypeCells.each(function () {
            if ($(this).text().trim()) {
              headingStatsTypeCell = $(this).text().trim();
            }
            if ($(this)[0].attribs.colspan) {
              headingStatsTypeCellSpan = parseInt($(this)[0].attribs.colspan);
            } else {
              headingStatsTypeCellSpan = 1;
            }
            //push an array of objects containing category and cellspan
            headingStatsTypeTable.push({
              headingStatsTypeCell,
              headingStatsTypeCellSpan,
            });
          });
          return headingStatsTypeTable;
        }

        //Returns a table with stat categories (Rec, Tds, Tds, etc)
        function getAttrHeaders(headerRow) {
          const headingAttrCells = $(headerRow).find('th');
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

        // Combines headers: categories headers with stat headers
        function combineTableHeaders(statsTypeHeaders, attrHeaders) {
          let cellSpan = 0;
          let heading;
          //if there are stat categories (everyone but kickers, dst)
          if (statsTypeHeaders) {
            //loop over each stat category
            for (i = 0; i < statsTypeHeaders.length; i++) {
              prevCellSpan = cellSpan;
              cellSpan =
                cellSpan + statsTypeHeaders[i].headingStatsTypeCellSpan;
              //using a running count of the cell spans, loop over the stats headers
              for (n = prevCellSpan; n < cellSpan; n++) {
                if (!statsTypeHeaders[i].headingStatsTypeCell) {
                  heading = attrHeaders[n].headingAttrCell;
                } else {
                  heading =
                    statsTypeHeaders[i].headingStatsTypeCell +
                    ' ' +
                    attrHeaders[n].headingAttrCell;
                }
                if (heading !== 'MISC FPTS') {
                  headersTable.push(heading);
                }
              }
            }
            //if there are no stat categories (kickers, dst), loop over just the stats
          } else {
            for (n = 0; n < attrHeaders.length; n++) {
              heading =
                urlPosisiton.toUpperCase() +
                ' ' +
                attrHeaders[n].headingAttrCell;
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

function jsonOutput(statsObject) {
  // statsTable = Object.assign({}, statsTable);
  statsObject = JSON.stringify(statsObject);

  fs.writeFile(
    'ffb-app/public/stats.json',
    statsObject,
    'utf8',
    function (err) {
      if (err) {
        console.log("An error occured while writing player's stats to file.");
        return console.log(err);
      }
      console.log('Stat file has been saved.');
      fs.writeFile(
        'ffb-app/public/stats-timestamp.json',
        JSON.stringify(new Date()),
        'utf8',
        function (err) {
          if (err) {
            console.log(
              "An error occured while writing the stat's timestamp to file."
            );
            return console.log(err);
          }
          console.log("Stat's timestamp has been saved.");
        }
      );
    }
  );
}
getStats();
setTimeout(function () {
  jsonOutput(statsObject);
}, 20000);
