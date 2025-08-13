//Turns a string into a float
export function parseStringToFloat(num) {
  const onlyPeriodsOrDash = new RegExp(/^[.-]*$/, 'i');
  if (!num || num === '' || onlyPeriodsOrDash.test(num)) {
    return 0;
  } else if (typeof num === 'string') {
    num = parseFloat(num.replace(/,/g, ''));
  }
  return num;
}

//Round Numbers, add commas, return to string for display
export function roundNumber(num) {
  num = parseStringToFloat(num);
  num = Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num;
}

//Set min limit to 1 on current pick
export function checkPick(currentPick) {
  return currentPick < 1 ? 1 : parseStringToFloat(currentPick);
}

//Total Roster Size
export function rosterSize(settings) {
  return (
    parseStringToFloat(settings.roster?.qb) +
    parseStringToFloat(settings.roster?.rb) +
    parseStringToFloat(settings.roster?.wr) +
    parseStringToFloat(settings.roster?.te) +
    parseStringToFloat(settings.roster?.k) +
    parseStringToFloat(settings.roster?.dst) +
    parseStringToFloat(settings.roster?.flex) +
    parseStringToFloat(settings.roster?.bench)
  );
}

//Calculate Total Points
export function calculateTotalPoints(scoring, players, playerId) {
  let totalPoints = 0;
  if (players[playerId]['POSITION'] !== 'DST' || players[playerId]['POSITION'] !== 'K') {
    totalPoints += parseStringToFloat(scoring.misc_fum) * parseStringToFloat(players[playerId]['MISC FL']);
  }
  if (players[playerId]['POSITION'] === 'QB') {
    totalPoints += parseStringToFloat(scoring.pass_comp) * parseStringToFloat(players[playerId]['PASSING CMP']);
    totalPoints += parseStringToFloat(scoring.pass_int) * parseStringToFloat(players[playerId]['PASSING INTS']);
    totalPoints += parseStringToFloat(scoring.pass_td) * parseStringToFloat(players[playerId]['PASSING TDS']);
    totalPoints += parseStringToFloat(scoring.pass_yrds) * parseStringToFloat(players[playerId]['PASSING YDS']);
  }
  if (!scoring?.independent_positional_scoring) {
    if (players[playerId]['POSITION'] === 'WR' || players[playerId]['POSITION'] === 'TE' || players[playerId]['POSITION'] === 'RB') {
      totalPoints += parseStringToFloat(scoring.rec_rec) * parseStringToFloat(players[playerId]['RECEIVING REC']);
      totalPoints += parseStringToFloat(scoring.rec_td) * parseStringToFloat(players[playerId]['RECEIVING TDS']);
      totalPoints += parseStringToFloat(scoring.rec_yrds) * parseStringToFloat(players[playerId]['RECEIVING YDS']);
    }
    if (players[playerId]['POSITION'] === 'QB' || players[playerId]['POSITION'] === 'RB' || players[playerId]['POSITION'] === 'WR') {
      totalPoints += parseStringToFloat(scoring.rush_td) * parseStringToFloat(players[playerId]['RUSHING TDS']);
      totalPoints += parseStringToFloat(scoring.rush_yrds) * parseStringToFloat(players[playerId]['RUSHING YDS']);
    }
  } else {
    if (players[playerId]['POSITION'] === 'QB') {
      totalPoints += parseStringToFloat(scoring.qb_rush_td) * parseStringToFloat(players[playerId]['RUSHING TDS']);
      totalPoints += parseStringToFloat(scoring.qb_rush_yrds) * parseStringToFloat(players[playerId]['RUSHING YDS']);
    } else if (players[playerId]['POSITION'] === 'RB') {
      totalPoints += parseStringToFloat(scoring.rb_rush_td) * parseStringToFloat(players[playerId]['RUSHING TDS']);
      totalPoints += parseStringToFloat(scoring.rb_rush_yrds) * parseStringToFloat(players[playerId]['RUSHING YDS']);
      totalPoints += parseStringToFloat(scoring.rb_rec_rec) * parseStringToFloat(players[playerId]['RECEIVING REC']);
      totalPoints += parseStringToFloat(scoring.rb_rec_td) * parseStringToFloat(players[playerId]['RECEIVING TDS']);
      totalPoints += parseStringToFloat(scoring.rb_rec_yrds) * parseStringToFloat(players[playerId]['RECEIVING YDS']);
    } else if (players[playerId]['POSITION'] === 'WR') {
      totalPoints += parseStringToFloat(scoring.wr_rush_td) * parseStringToFloat(players[playerId]['RUSHING TDS']);
      totalPoints += parseStringToFloat(scoring.wr_rush_yrds) * parseStringToFloat(players[playerId]['RUSHING YDS']);
      totalPoints += parseStringToFloat(scoring.wr_rec_rec) * parseStringToFloat(players[playerId]['RECEIVING REC']);
      totalPoints += parseStringToFloat(scoring.wr_rec_td) * parseStringToFloat(players[playerId]['RECEIVING TDS']);
      totalPoints += parseStringToFloat(scoring.wr_rec_yrds) * parseStringToFloat(players[playerId]['RECEIVING YDS']);
    } else if (players[playerId]['POSITION'] === 'TE') {
      totalPoints += parseStringToFloat(scoring.te_rec_rec) * parseStringToFloat(players[playerId]['RECEIVING REC']);
      totalPoints += parseStringToFloat(scoring.te_rec_td) * parseStringToFloat(players[playerId]['RECEIVING TDS']);
      totalPoints += parseStringToFloat(scoring.te_rec_yrds) * parseStringToFloat(players[playerId]['RECEIVING YDS']);
    }
  }
  if (players[playerId]['POSITION'] === 'K') {
    totalPoints += parseStringToFloat(scoring.k_fg) * parseStringToFloat(players[playerId]['K FG']);
    totalPoints += parseStringToFloat(scoring.k_mfg) * (parseStringToFloat(players[playerId]['K FGA']) - parseStringToFloat(players[playerId]['K FG']));
    totalPoints += parseStringToFloat(scoring.k_xpt) * parseStringToFloat(players[playerId]['K XPT']);
  }
  if (players[playerId]['POSITION'] === 'DST') {
    totalPoints += parseStringToFloat(scoring.dst_sk) * parseStringToFloat(players[playerId]['DST SACK']);
    totalPoints += parseStringToFloat(scoring.dst_int) * parseStringToFloat(players[playerId]['DST INT']);
    totalPoints += parseStringToFloat(scoring.dst_fr) * parseStringToFloat(players[playerId]['DST FR']);
    totalPoints += parseStringToFloat(scoring.dst_ff) * parseStringToFloat(players[playerId]['DST FF']);
    totalPoints += parseStringToFloat(scoring.dst_td) * parseStringToFloat(players[playerId]['DST TD']);
    totalPoints += parseStringToFloat(scoring.dst_sf) * parseStringToFloat(players[playerId]['DST SAFETY']);
    totalPoints += calculatePointsAllowed(scoring, players[playerId]['DST PA']);
    totalPoints += calculateYardsAllowed(scoring, players[playerId]['DST YDS AGN']);
  }
  return totalPoints;
}

//Calculate DST Points Allowed
export function calculatePointsAllowed(scoring, pointsAllowedPerSeason) {
  const gamesInSeason = 17;
  const pointsAllowedPerGame = Math.round(parseStringToFloat(pointsAllowedPerSeason) / gamesInSeason);
  if (pointsAllowedPerGame === 0) {
    return parseStringToFloat(scoring.dst_pa_0) * gamesInSeason;
  } else if (1 <= pointsAllowedPerGame && pointsAllowedPerGame <= 5) {
    return parseStringToFloat(scoring.dst_pa_1_5) * gamesInSeason;
  } else if (6 <= pointsAllowedPerGame && pointsAllowedPerGame <= 10) {
    return parseStringToFloat(scoring.dst_pa_6_10) * gamesInSeason;
  } else if (11 <= pointsAllowedPerGame && pointsAllowedPerGame <= 15) {
    return parseStringToFloat(scoring.dst_pa_11_15) * gamesInSeason;
  } else if (16 <= pointsAllowedPerGame && pointsAllowedPerGame <= 20) {
    return parseStringToFloat(scoring.dst_pa_16_20) * gamesInSeason;
  } else if (21 <= pointsAllowedPerGame && pointsAllowedPerGame <= 25) {
    return parseStringToFloat(scoring.dst_pa_21_25) * gamesInSeason;
  } else if (26 <= pointsAllowedPerGame && pointsAllowedPerGame <= 30) {
    return parseStringToFloat(scoring.dst_pa_26_30) * gamesInSeason;
  } else if (31 <= pointsAllowedPerGame && pointsAllowedPerGame <= 35) {
    return parseStringToFloat(scoring.dst_pa_31_35) * gamesInSeason;
  } else if (36 <= pointsAllowedPerGame && pointsAllowedPerGame <= 40) {
    return parseStringToFloat(scoring.dst_pa_36_40) * gamesInSeason;
  } else if (41 <= pointsAllowedPerGame) {
    return parseStringToFloat(scoring.dst_pa_41_plus) * gamesInSeason;
  }
}

//Calculate Yards Allowed
export function calculateYardsAllowed(scoring, yardsAllowedPerSeason) {
  const gamesInSeason = 17;
  const yardsAllowedPerGame = Math.round(parseStringToFloat(yardsAllowedPerSeason) / gamesInSeason);
  if (yardsAllowedPerGame <= 49) {
    return parseStringToFloat(scoring.dst_ya_49) * gamesInSeason;
  } else if (50 <= yardsAllowedPerGame && yardsAllowedPerGame <= 99) {
    return parseStringToFloat(scoring.dst_ya_50_99) * gamesInSeason;
  } else if (100 <= yardsAllowedPerGame && yardsAllowedPerGame <= 149) {
    return parseStringToFloat(scoring.dst_ya_100_149) * gamesInSeason;
  } else if (150 <= yardsAllowedPerGame && yardsAllowedPerGame <= 199) {
    return parseStringToFloat(scoring.dst_ya_150_199) * gamesInSeason;
  } else if (200 <= yardsAllowedPerGame && yardsAllowedPerGame <= 249) {
    return parseStringToFloat(scoring.dst_ya_200_249) * gamesInSeason;
  } else if (250 <= yardsAllowedPerGame && yardsAllowedPerGame <= 299) {
    return parseStringToFloat(scoring.dst_ya_250_299) * gamesInSeason;
  } else if (300 <= yardsAllowedPerGame && yardsAllowedPerGame <= 349) {
    return parseStringToFloat(scoring.dst_ya_300_349) * gamesInSeason;
  } else if (350 <= yardsAllowedPerGame && yardsAllowedPerGame <= 399) {
    return parseStringToFloat(scoring.dst_ya_350_399) * gamesInSeason;
  } else if (400 <= yardsAllowedPerGame && yardsAllowedPerGame <= 449) {
    return parseStringToFloat(scoring.dst_ya_400_449) * gamesInSeason;
  } else if (450 <= yardsAllowedPerGame && yardsAllowedPerGame <= 499) {
    return parseStringToFloat(scoring.dst_ya_450_499) * gamesInSeason;
  } else if (500 <= yardsAllowedPerGame) {
    return parseStringToFloat(scoring.dst_ya_500_plus) * gamesInSeason;
  }
}
