import type { Locator } from 'playwright';
import { combineTableHeaders } from './combineTableHeaders.ts';
import { getAttrHeaders } from './getAttrHeaders.ts';
import { getStatsCategoryHeaders } from './getStatsCategoryHeaders.ts';
import type { positions } from './scraper.ts';

//Sorts out header rows to either an overall category header or stats header
export async function parseTableHeaders(tableHeadRows: Locator[], position: (typeof positions)[number]) {
  let statsCategoryHeaders, attrHeaders;
  for (let i = 0; i < tableHeadRows.length; i++) {
    if (tableHeadRows.length === 2 && i === 0) {
      statsCategoryHeaders = await getStatsCategoryHeaders(tableHeadRows[i]);
    } else if (tableHeadRows.length === 1 || i === 1) {
      attrHeaders = await getAttrHeaders(tableHeadRows[i]);
    } else {
      throw new Error('Error in table header count.');
    }
  }
  return combineTableHeaders(statsCategoryHeaders, attrHeaders, position);
}
