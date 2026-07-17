import type { PositionalData } from './sortPlayerData.ts';
import { writeFile } from 'node:fs/promises';

export async function jsonOutput(data: PositionalData[]) {
  const jsonData = JSON.stringify(data);
  try {
    await writeFile('public/stats.json', jsonData, 'utf8');
    console.log('Stat file has been saved.');
    await writeFile('public/stats-timestamp.json', JSON.stringify(new Date()), 'utf8');
    console.log("Stat's timestamp has been saved.");
  } catch (error) {
    console.error('\x1b[0m', 'An error occurred:', '\x1b[0m', error);
  }
}
