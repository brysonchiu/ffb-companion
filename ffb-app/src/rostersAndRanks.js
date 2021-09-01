/*
This file seperates the starters, bench, and undrafted players and sorts them by VBD points. The steps are as follows:
  1) Estimates the starting players from the roster settings by filling the starting position roster slots and then filling in the flex spots with the next highest scoring eligable players. Stores starters data:
    - most starting points, array: [playerId, points]
    - fewest starting points, array: [playerId, points]
    - average bench points, number
    - playerCount, number
    - starting players, array of player IDs
  2) By doubling the starting positional roster size, we're able to estimate a faux bench. Because a bench slot can be any position, this can be used to gather data to use to model the actual bench. Stores faux bench data:
    - fewest bench points, array: [playerId, points]
    - average bench points, number
    - playerCount, number
    - bench differential (average of player points and fewest points), number
  3) Get bench players by calculating non starters VBD points. Stores bench data:
    - fewest bench points, array: [playerId, points]
    - bench players, array of player IDs
  4) Calculate rostered players point differential. This is average points from the last starter in each position.
    - point differential, array: [total point differential, rostered player count, average point differential]
  5) Calculate VBD points for all players.  This is used to sort players against other players in different positions. Stores data:
    - vbd points for starters, bench, undrafted, and all players
*/

// 1) Starters
function getStarters(settings, players, playersTotalPoints) {
  const starters = {
    startingPlayers: [],
    mostPoints: {},
    fewestPoints: {},
    playerCount: {
      qb: 0,
      rb: 0,
      wr: 0,
      te: 0,
      k: 0,
      dst: 0,
      flex: 0,
    },
    averagePoints: {},
  };
  const scorringRunningtotal = {
    qb: 0,
    rb: 0,
    wr: 0,
    te: 0,
    k: 0,
    dst: 0,
  };
  // check if all starters are accounted for
  const startersNotFilled = (playerCount) => {
    return Object.keys(playerCount).some((position) => playerCount[position] < settings.roster[position] * settings.general.teams);
  };
  // check if the player's position is flexable
  const isFlexedPosition = (playerPosition) => {
    if (playerPosition === "rb" || playerPosition === "wr") {
      return true;
    } else if (settings.general.flex_te && playerPosition === "te") {
      return true;
    } else if (settings.general.flex_qb && playerPosition === "qb") {
      return true;
    } else {
      return false;
    }
  };

  for (let i = 0; i < playersTotalPoints.length; i++) {
    // if the starters are already filled, break
    if (!startersNotFilled(starters.playerCount)) {
      ["qb", "rb", "wr", "te", "k", "dst"].forEach((pos) => {
        //if there are no starters for a position, set fewest points and average points to 0
        if (!starters.fewestPoints[pos]) starters.mostPoints[pos] = [null, 0];
        if (!starters.fewestPoints[pos]) starters.fewestPoints[pos] = [null, 0];
        if (!starters.averagePoints[pos]) starters.averagePoints[pos] = 0;
      });
      break;
    }
    const playerId = playersTotalPoints[i][0];
    const playerPosition = players[playerId]["POSITION"].toLowerCase();
    // if the running count for the position is not maxed, add the player to the startingPlayers array.
    // else if the player is an eligable flex option, add the player to the startingPlayers array.
    if (starters.playerCount[playerPosition] < settings.roster[playerPosition] * settings.general.teams) {
      starters.startingPlayers.push(playerId);
      starters.playerCount[playerPosition] += 1;
      scorringRunningtotal[playerPosition] += playersTotalPoints[i][1];
      if (!starters.mostPoints[playerPosition]) {
        starters.mostPoints[playerPosition] = playersTotalPoints[i];
      }
      if (starters.playerCount[playerPosition] === settings.roster[playerPosition] * settings.general.teams) {
        starters.fewestPoints[playerPosition] = playersTotalPoints[i];
        starters.averagePoints[playerPosition] = scorringRunningtotal[playerPosition] / starters.playerCount[playerPosition];
      }
    } else if (isFlexedPosition(playerPosition) && starters.playerCount.flex < settings.roster.flex * settings.general.teams) {
      starters.startingPlayers.push(playerId);
      starters.playerCount.flex += 1;
      starters.playerCount[playerPosition] += 1;
      scorringRunningtotal[playerPosition] += playersTotalPoints[i][1];
      starters.fewestPoints[playerPosition] = playersTotalPoints[i];
      starters.averagePoints[playerPosition] = scorringRunningtotal[playerPosition] / starters.playerCount[playerPosition];
    }
  }
  // if the starters are still not filled after looping through the players, set the fewest points to 0 and calculate the average points
  if (startersNotFilled(starters.playerCount)) {
    ["qb", "rb", "wr", "te", "k", "dst"].forEach((pos) => {
      if (!starters.fewestPoints[pos]) starters.fewestPoints[pos] = [null, 0];
      if (!starters.averagePoints[pos]) {
        starters.averagePoints[pos] = scorringRunningtotal[pos] / starters.playerCount[pos];
      }
    });
  }
  return starters;
}

// 2) Faux Bench
function getFauxBench(starters, settings, players, playersTotalPoints) {
  const fauxBench = {
    fewestPoints: {},
    averagePoints: {},
    pointDifferential: {},
  };
  // filter out starters
  const nonStartingPlayers = playersTotalPoints.filter((obj) => !starters.startingPlayers.includes(obj[0]));
  // for each position, find the fewest points benchmark for the faux bench
  // this equals the number of rostered starting players at each position after the actual starter
  ["qb", "rb", "wr", "te", "k", "dst"].forEach((pos) => {
    let benchPositionRunningCount = 0;
    let positionRunningTotalPoints = 0;
    for (let i = 0; i < nonStartingPlayers.length; i++) {
      const playerId = nonStartingPlayers[i][0];
      const playerPosition = players[playerId]["POSITION"].toLowerCase();
      if (pos === playerPosition) {
        benchPositionRunningCount += 1;
        positionRunningTotalPoints += nonStartingPlayers[i][1];
        // if there are no starters then set the fewest points and average points to 0
        // else if once the faux bench reaches starting roster size, log the fewest points and average points
        // else if it doesnt ever reach the starting roseter size, set the fewest points to 0 and calculate the average points
        if (starters.playerCount[pos] === 0) {
          fauxBench.averagePoints[pos] = 0;
          fauxBench.fewestPoints[pos] = [null, 0];
          break;
        } else if (benchPositionRunningCount === settings.roster[pos] * settings.general.teams) {
          fauxBench.averagePoints[pos] = positionRunningTotalPoints / benchPositionRunningCount;
          fauxBench.fewestPoints[pos] = nonStartingPlayers[i];
          break;
        } else if (i === nonStartingPlayers.length - 1) {
          fauxBench.averagePoints[pos] = positionRunningTotalPoints / benchPositionRunningCount;
          fauxBench.fewestPoints[pos] = [null, 0];
        }
        // else if it loops through all the players without matching a position, set the fewest points to 0 and calculate the average points
      } else if (i === nonStartingPlayers.length - 1) {
        fauxBench.averagePoints[pos] = positionRunningTotalPoints / benchPositionRunningCount || 0;
        fauxBench.fewestPoints[pos] = [null, 0];
      }
    }
  });

  //calculate faux bench point differential
  ["qb", "rb", "wr", "te", "k", "dst"].forEach((pos) => {
    let totalPointDifferential = 0;
    let positionRunningCount = 0;
    for (let i = 0; i < nonStartingPlayers.length; i++) {
      const playerId = nonStartingPlayers[i][0];
      const playerPosition = players[playerId]["POSITION"].toLowerCase();
      if (starters.playerCount[pos] === 0) {
        fauxBench.pointDifferential[pos] = 0;
        break;
      }
      if (pos === playerPosition) {
        positionRunningCount += 1;
        totalPointDifferential += Math.abs(nonStartingPlayers[i][1] - fauxBench.fewestPoints[pos][1]);
        if (playerId === fauxBench.fewestPoints[pos][0]) {
          fauxBench.pointDifferential[pos] = totalPointDifferential / positionRunningCount;
          break;
        }
      }
    }
  });
  return fauxBench;
}

// 3) Get Actual Bench
function getBench(fauxBench, starters, settings, players, playersTotalPoints) {
  const bench = {
    benchPlayers: [],
    fewestPoints: {},
    averagePoints: {},
    playerCount: {
      qb: 0,
      rb: 0,
      wr: 0,
      te: 0,
      k: 0,
      dst: 0,
      flex: 0,
    },
  };
  // filter out starters
  const nonStartingPlayers = playersTotalPoints.filter((obj) => !starters.startingPlayers.includes(obj[0]));

  // get the bench point differential for all positions
  // const totalbenchPositionalPointDifferential = Object.keys(fauxBench.pointDifferential).reduce((accumulator, currentValue) => {
  //   return accumulator + fauxBench.pointDifferential[currentValue];
  // }, 0);

  // calculate the VBD points for the bench players.  This is used to determine the bench players rostered.
  function calculatedVbdBenchPoints(playerPoints, playerPosition) {
    return (
      (starters.averagePoints[playerPosition] / fauxBench.averagePoints[playerPosition]) * 2 * playerPoints -
      starters.fewestPoints[playerPosition][1] -
      fauxBench.fewestPoints[playerPosition][1] +
      fauxBench.pointDifferential[playerPosition]
    );
  }

  // for testing only
  // const playerDebug = {};

  // assign the VBD points to the player and sort the players
  const nonStartingPlayerVbdPoints = [];
  nonStartingPlayers.forEach((player) => {
    const playerPosition = players[player[0]]["POSITION"].toLowerCase();

    // for testing only
    // playerDebug[players[player[0]]["PLAYER"]] = [players[player[0]]["POSITION"], calculatedVbdBenchPoints(player[1], playerPosition)];

    if (starters.playerCount[playerPosition] > 0) {
      nonStartingPlayerVbdPoints.push([player[0], calculatedVbdBenchPoints(player[1], playerPosition)]);
    }
  });

  // for testing only
  // console.log("Player Debug", playerDebug);

  nonStartingPlayerVbdPoints.sort((playerA, playerB) => {
    return playerB[1] - playerA[1];
  });

  // set the bench players
  for (let i = 0; i < settings.roster.bench * settings.general.teams; i++) {
    bench.benchPlayers.push(nonStartingPlayerVbdPoints[i][0]);
  }

  //get bench and fewest points
  ["qb", "rb", "wr", "te", "k", "dst"].forEach((pos) => {
    let benchPositionRunningCount = 0;
    let positionRunningTotalPoints = 0;
    for (let i = 0; i < bench.benchPlayers.length; i++) {
      const playerId = bench.benchPlayers[i];
      const playerPosition = players[playerId]["POSITION"].toLowerCase();
      // log the fewest points and average points
      if (pos === playerPosition) {
        const pointTotalIndex = playersTotalPoints.findIndex((player) => player[0] === playerId);
        benchPositionRunningCount += 1;
        positionRunningTotalPoints += playersTotalPoints[pointTotalIndex][1];
        bench.averagePoints[pos] = positionRunningTotalPoints / benchPositionRunningCount;
        bench.fewestPoints[pos] = [playerId, playersTotalPoints[pointTotalIndex][1]];
        bench.playerCount[pos] = bench.playerCount[pos] + 1;
        // else if it loops through all the players without matching a position, set the fewest points to starters fewest points and average points to 0
      } else if (!bench.averagePoints[pos] && !bench.fewestPoints[pos] && i === bench.benchPlayers.length - 1) {
        bench.averagePoints[pos] = 0;
        bench.fewestPoints[pos] = [null, starters.fewestPoints[pos][1]];
      }
    }
  });
  return bench;
}

// 4) Calculate Rostered Point Differential
function getRosteredPointDifferential(bench, starters, players, playersTotalPoints) {
  // each positional array represents [running point differential, position player count, average point differential]
  const rosteredPointDifferential = {
    qb: [0, 0],
    rb: [0, 0],
    wr: [0, 0],
    te: [0, 0],
    k: [0, 0],
    dst: [0, 0],
  };
  [...starters.startingPlayers, ...bench.benchPlayers].forEach((playerId) => {
    const playerPosition = players[playerId]["POSITION"].toLowerCase();
    const totalPointArrayIndex = playersTotalPoints.findIndex((player) => player[0] === playerId);
    rosteredPointDifferential[playerPosition][0] += Math.abs(playersTotalPoints[totalPointArrayIndex][1] - starters.fewestPoints[playerPosition][1]);
    rosteredPointDifferential[playerPosition][1] = rosteredPointDifferential[playerPosition][1] + 1;
  });
  ["qb", "rb", "wr", "te", "k", "dst"].forEach((pos) => {
    rosteredPointDifferential[pos][1] === 0
      ? (rosteredPointDifferential[pos][2] = 0)
      : (rosteredPointDifferential[pos][2] = rosteredPointDifferential[pos][0] / rosteredPointDifferential[pos][1]);
  });

  return rosteredPointDifferential;
}

// 5) Calculate overall VBD points
function getVbdPoints(rosteredPointDifferential, bench, starters, players, playersTotalPoints) {
  const vbdPoints = {
    all: [],
    starters: [],
    bench: [],
    undrafted: [],
  };

  // undrafted players
  let undraftedPlayers = playersTotalPoints.filter((obj) => !(starters.startingPlayers.includes(obj[0]) || bench.benchPlayers.includes(obj[0])));
  ["qb", "rb", "wr", "te", "k", "dst"].forEach((pos) => {
    undraftedPlayers = undraftedPlayers.filter((obj) => starters.playerCount[players[obj[0]]["POSITION"].toLowerCase()] !== 0);
  });

  // get the rostered point differential for all positions
  const totalrosteredPointDifferential = Object.keys(rosteredPointDifferential).reduce((accumulator, currentValue) => {
    return accumulator + rosteredPointDifferential[currentValue][2];
  }, 0);

  //VBD point calculation
  function calculatedPoints(playerPoints, playerPosition, playerCategory) {
    if (playerCategory === "undrafted") {
      return playerPoints - bench.fewestPoints[playerPosition][1] - totalrosteredPointDifferential + rosteredPointDifferential[playerPosition][2];
    } else {
      if (!bench.averagePoints[playerPosition]) {
        return playerPoints - starters.fewestPoints[playerPosition][1];
      } else {
        return (starters.averagePoints[playerPosition] / bench.averagePoints[playerPosition]) * playerPoints - starters.fewestPoints[playerPosition][1];
      }
    }
  }

  // starters: assign VBD points and rank
  vbdPoints.starters = starters.startingPlayers.map((playerId) => {
    const playerPosition = players[playerId]["POSITION"].toLowerCase();
    const pointTotalIndex = playersTotalPoints.findIndex((player) => player[0] === playerId);
    return [playerId, calculatedPoints(playersTotalPoints[pointTotalIndex][1], playerPosition, "starters")];
  });
  vbdPoints.starters.sort((playerA, playerB) => {
    return playerB[1] - playerA[1];
  });

  // bench: assign VBD points and rank
  vbdPoints.bench = bench.benchPlayers.map((playerId) => {
    const playerPosition = players[playerId]["POSITION"].toLowerCase();
    const pointTotalIndex = playersTotalPoints.findIndex((player) => player[0] === playerId);
    return [playerId, calculatedPoints(playersTotalPoints[pointTotalIndex][1], playerPosition, "bench")];
  });

  // undrafted: assign VBD points and rank
  vbdPoints.undrafted = undraftedPlayers
    .map((player) => {
      const playerPosition = players[player[0]]["POSITION"].toLowerCase();
      const pointTotalIndex = playersTotalPoints.findIndex((playersPointObj) => playersPointObj[0] === player[0]);
      return [player[0], calculatedPoints(playersTotalPoints[pointTotalIndex][1], playerPosition, "undrafted")];
    })
    .sort((playerA, playerB) => {
      return playerB[1] - playerA[1];
    });

  //combine the 3 lists into 1, all players list
  vbdPoints.all = [...vbdPoints.starters, ...vbdPoints.bench, ...vbdPoints.undrafted].sort((playerA, playerB) => {
    return playerB[1] - playerA[1];
  });
  return vbdPoints;
}

export function vbdPointRankings(settings, players, playersTotalPoints) {
  const starters = getStarters(settings, players, playersTotalPoints);
  // console.log("Starters", starters);
  const fauxBench = getFauxBench(starters, settings, players, playersTotalPoints);
  // console.log("Faux Bench", fauxBench);
  const bench = getBench(fauxBench, starters, settings, players, playersTotalPoints);
  // console.log("Bench", bench);
  const rosteredPointDifferential = getRosteredPointDifferential(bench, starters, players, playersTotalPoints);
  // console.log("Point Differential", rosteredPointDifferential);
  return getVbdPoints(rosteredPointDifferential, bench, starters, players, playersTotalPoints);
}
