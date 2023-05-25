<img src="https://img.shields.io/badge/node-v12.18.0-bgrightreen.svg?style=flat-square" alt="node" /> <img src="https://img.shields.io/badge/npm-v6.14.4-red.svg?style=flat-square" alt="npm" />
<a href="https://www.netlify.com" target="_blank">
<img src="https://img.shields.io/badge/Powered_by-Netlify-teal?style=flat-square" alt="Powered by Netlify">
</a>
 
<br />

<br />

<a href="https://www.ffbcompanion.com" target="_blank"><img src="https://www.ffbcompanion.com/android-chrome-512x512.png" alt="Fantasy Football Companion" height="40" width="40" /> www.ffbcompanion.com</a>

# Fantasy Football Companion
The Fantasy Football Companion is meant to be a tool to accompany you at on your draft day.  Based on the concept of <a href="https://www.footballguys.com/article/2019-value-based-drafting" target="_blank">Value Based Drafting</a>, the companion is a way to rank players across positions and better visualize players left.

Data is pulled from <a href="https://www.fantasypros.com/nfl/projections/qb.php?week=draft" target="_blank">Fantasy Pros</a>, a site whichh aggregates data accross other major fantasy sites. The idea is that with more sources, <a href="https://en.wikipedia.org/wiki/Wisdom_of_the_crowd" target="_blank">wisdom of the crowd</a> will prevail, and projections will be more accurate than relying on an one site.

Since the companion is suppose to be opened side-by-side with you draft lobby, it is a desktop only site.  If you try to open on a phone&mdash;or in a narrow browser window&mdash;the site will prompt you to open in a wider window.

## Getting Started
This site is built on <a href="https://react.dev" target="_blank">React</a>.  Data scraping is aided by <a href="https://www.npmjs.com/package/axios" target="_blank">Axios</a> and <a href="https://www.npmjs.com/package/cheerio" target="_blank">Cheerio</a>.

### Install:
In a terminal window, run

    git clone https://github.com/brysonchiu/ffb.git
    cd ffb-companion
    nvm install
    npm install

### Scraping Data:
Data is scrapped on the following chron schedule vis Github action:
- Every day of August @ 3:30am EST
- Days 1-15 of September @ 3:30am EST
- Every Tuesday of all other months @ 3:30am EST

If you need to pull data on demand, in the ffb-companion directory of the terminal, run

    node scraper.js


### To Run the App:
From the ffb directory, in terminal run

    cd ffb-app
    npm start

