import {PuzzleCreator} from "./PuzzleCreator";
/*
  to run:
  from commandLine
  C:\> ts-node PuzzleCreatorRunner
*/

let puzzleCreator : PuzzleCreator = new PuzzleCreator();
let moves : number[] = [];
moves = puzzleCreator.createRandomPositions(5);
console.log(moves)
console.log(puzzleCreator.getInitialBoard(moves));

moves = puzzleCreator.createDailyRandomPositions();
console.log(moves)
console.log(puzzleCreator.getInitialBoard(moves));
