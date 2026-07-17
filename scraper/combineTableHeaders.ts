// Combines headers: categories headers with stat headers

import type { positions } from './scraper';

type StatsCategoryHeaders =
  | {
      headingStatsCategoryCell: string;
      headingStatsCategoryColSpan: number;
    }[]
  | undefined;

export function combineTableHeaders(statsCategoryHeaders: StatsCategoryHeaders, attrHeaders: string[] | undefined, position: (typeof positions)[number]) {
  const tableHeaders: string[] = [];
  let colSpan = 0;
  let heading: string;
  //if there are stat categories (everyone but kickers, dst)
  if (statsCategoryHeaders && attrHeaders) {
    //loop over each stat category
    for (let i = 0; i < statsCategoryHeaders.length; i++) {
      let prevColSpan = colSpan;
      colSpan = colSpan + statsCategoryHeaders[i].headingStatsCategoryColSpan;
      //using a running count of the cell spans, loop over the stats headers
      for (let n = prevColSpan; n < colSpan; n++) {
        if (!statsCategoryHeaders[i].headingStatsCategoryCell) {
          heading = attrHeaders[n];
        } else {
          heading = statsCategoryHeaders[i].headingStatsCategoryCell + ' ' + attrHeaders[n];
        }
        if (heading !== 'MISC FPTS') {
          tableHeaders.push(heading);
        }
      }
    }
    //if there are no stat categories (kickers, dst), loop over just the stats
  } else if (attrHeaders) {
    for (let i = 0; i < attrHeaders.length; i++) {
      heading = position.toUpperCase() + ' ' + attrHeaders[i];
      tableHeaders.push(heading);
    }
  }
  return tableHeaders;
}
