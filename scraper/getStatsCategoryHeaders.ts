import type { Locator } from 'playwright';

//Returns an array with overall categories (passing, recieving, rushing, misc) and their col spans
export async function getStatsCategoryHeaders(tableHeadRow: Locator) {
  const headingStatsCategoryCells = await tableHeadRow.locator('td').all();
  let headingStatsCategoryCell: string, headingStatsCategoryColSpan: number;
  //for each category, get the name and colspan
  const headingStatsCategoryTablePromise = headingStatsCategoryCells.map(async (cell) => {
    const text = await cell.innerText();
    const colspan = await cell.getAttribute('colspan');
    if (text.trim()) {
      headingStatsCategoryCell = text.trim();
    }
    if (colspan) {
      headingStatsCategoryColSpan = parseInt(colspan);
    } else {
      headingStatsCategoryColSpan = 1;
    }
    return {
      headingStatsCategoryCell,
      headingStatsCategoryColSpan,
    };
  });
  const headingStatsCategoryTable = await Promise.all(headingStatsCategoryTablePromise);
  return headingStatsCategoryTable;
}
