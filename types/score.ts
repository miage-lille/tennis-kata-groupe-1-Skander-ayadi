import { Player } from './player';


// Exerice 0: Write all type constructors of Points, Deuce, Forty and Advantage types.
export type Love = {
  kind: 'LOVE';
};

export type Fifteen = {
  kind: 'FIFTEEN';
};

export type Thirty = {
  kind: 'THIRTY';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: FortyData;
};

export type Deuce = {
  kind: 'DEUCE';
};


export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Point = Love | Fifteen | Thirty;

export type FortyData = {
  player: Player; // The player who have forty points
  otherPoint: Point; // Points of the other player
};


export type Game = {
  kind: 'GAME';
  player: Player; // Player has won
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});




export type Score = Points | Forty | Deuce | Advantage | Game;


