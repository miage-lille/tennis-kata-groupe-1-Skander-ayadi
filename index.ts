import { isSamePlayer, Player } from './types/player';
import { Advantage, Point, PointsData, Score, FortyData } from './types/score';
import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};

// Exercice 1 :
export const pointToString = (point: Point): string =>{

  switch (point.kind) {
    case 'LOVE':
      return '0';
    case 'FIFTEEN':
      return '15';
    case 'THIRTY':
      return '30';
  };

}

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case 'POINTS':
      return pointToString(score.pointsData.PLAYER_ONE) + ' - ' + pointToString(score.pointsData.PLAYER_TWO);
    case 'FORTY':
      return '40 - 40';
    case 'DEUCE':
      return 'DEUCE';
    case 'ADVANTAGE':
      return 'Advantage ' + score.player;
    case 'GAME':
      return 'Game ' + score.player;
  }
}

export function advantage(player: Player): Advantage {
  return {
    kind: 'ADVANTAGE',
    player: player
  };
}

export function game(player: Player): Score {
  return {
    kind: 'GAME',
    player: player
  };
}

export function deuce(): Score {
  return {
    kind: 'DEUCE'
  };
}

export function forty(player: Player, otherPoint: Point): Score {
  return {
    kind: 'FORTY',
    fortyData: {
      player: player,
      otherPoint: otherPoint
    }
  };
}

export function thirty(): Point {
  return {
    kind: 'THIRTY'
  };
}

export function fifteen(): Point {
  return {
    kind: 'FIFTEEN'
  };
}

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};


export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if(isSamePlayer(advantagedPlayed, winner)){
    return game(winner);
  } else {
    return deuce();
  }
};


export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    matchOpt(
      () => deuce(),
      p => forty(currentForty.player, p) as Score
    )
  );
};


export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none;
  }
};

export const scoreWhenGame = (winner: Player): Score => {
  throw new Error('not implemented');
};

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const newPoints = { ...current };

  if (winner === 'PLAYER_ONE') {
    switch (current.PLAYER_ONE.kind) {
      case 'LOVE':
        newPoints.PLAYER_ONE = { kind: 'FIFTEEN' };
        break;
      case 'FIFTEEN':
        newPoints.PLAYER_ONE = { kind: 'THIRTY' };
        break;
      case 'THIRTY':
        return { kind: 'FORTY', fortyData: { player: 'PLAYER_ONE', otherPoint: current.PLAYER_TWO } };
    }
  } else {
    switch (current.PLAYER_TWO.kind) {
      case 'LOVE':
        newPoints.PLAYER_TWO = { kind: 'FIFTEEN' };
        break;
      case 'FIFTEEN':
        newPoints.PLAYER_TWO = { kind: 'THIRTY' };
        break;
      case 'THIRTY':
        return { kind: 'FORTY', fortyData: { player: 'PLAYER_TWO', otherPoint: current.PLAYER_ONE } };
    }
  }

  return { kind: 'POINTS', pointsData: newPoints };
};

export const score = (currentScore: Score, winner: Player): Score => {
  throw new Error('not implemented');
};
