import type { Locator } from 'playwright';

//Returns a table with stat categories (Rec, Tds, Tds, etc)
export async function getAttrHeaders(tableHeadRow: Locator) {
  const headingAttrCells = await tableHeadRow.locator('th').all();
  let headingAttrCell: string;
  const headingAttrTablePromise = headingAttrCells.map(async (cell) => {
    const text = await cell.innerText();
    if (text.trim()) {
      headingAttrCell = text.trim();
    }
    return headingAttrCell;
  });
  return await Promise.all(headingAttrTablePromise);
}
