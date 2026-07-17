import type { Locator } from 'playwright';
import type { positions } from './scraper.ts';

const playerNameSelector = '.player-name';

export type PlayerStatsObject = {
  ID: number;
  POSITION: Uppercase<(typeof positions)[number]>;
  [key: string]: unknown;
};
export type PositionalData = {
  [key: number]: PlayerStatsObject;
};

//Get player stats and combines it with headers
export async function sortPlayerData(tableBodyRows: Locator[], tableHeaders: string[], position: (typeof positions)[number]) {
  // DELETE TO RETURN DATA AS ARRAY
  const positionalDataObj: PositionalData = {};

  //Throw error if there are 10 of fewer players scraped. This means the page was gated.
  if (tableBodyRows.length <= 10) {
    console.error('\x1b[0m', `Did not scrape the entire list of ${position.toUpperCase()}s.`, '\x1b[0m');
    return;
  }
  const positionData = tableBodyRows.map(async function (playerRow) {
    let playerClass = await playerRow.getAttribute('class');
    let playerId: number;
    const cells = await playerRow.locator('td').all();

    //Set the players ID
    if (!playerClass) {
      throw new Error(`No player class was found on ${cells[0]}`);
    } else {
      const id = playerClass.match(/\d+/g)?.[0];
      if (!id) {
        throw new Error(`No player ID was found on ${cells[0]}`);
      } else {
        playerId = parseInt(id);
      }
    }

    const playerStatsObject: PlayerStatsObject = {
      ID: playerId,
      POSITION: position.toUpperCase() as Uppercase<typeof position>,
    };

    //loop over stat cells, except the last cell, which is total FPTS which is calculated in the app
    const playerStats = cells.map(async (cell, index) => {
      if (index === 0) {
        //Set player name
        playerStatsObject.PLAYER = await cell.locator(playerNameSelector).innerText();
        //Set player team if it's not a DST
        if (position !== 'dst')
          playerStatsObject.TEAM = await cell.evaluate((element) => {
            return Array.from(element.childNodes)
              .filter((node) => node.nodeType === Node.TEXT_NODE)
              .map((node) => node.textContent?.trim())
              .join(' ');
          });
      } else if (index === cells.length - 1) {
        //Skip total FPTS in the last column
      } else {
        //Set any other stats
        const headerValue = tableHeaders[index];
        const statValue = await cell.innerText();
        // CHANGE TO ENABLE NUMBERS INSTEAD OF STRINGS
        // playerStatsObject[headerValue] = parseFloat(statValue.trim());
        playerStatsObject[headerValue] = statValue.trim();
      }
    });
    await Promise.all(playerStats);
    // CHANGE TO RETURN DATA AS ARRAY
    // return playerStatsObject;
    positionalDataObj[playerId] = playerStatsObject;
    return;
  });
  // CHANGE TO RETURN DATA AS ARRAY
  // return await Promise.all(positionData);
  await Promise.all(positionData);
  return positionalDataObj;
}
