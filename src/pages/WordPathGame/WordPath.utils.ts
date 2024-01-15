import { Cell, SubmittedWords } from './WordPath.schema';

const letterPoints: { [key: string]: number } = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

export const getWordCost = (word: Cell[]) => {
  let cost = 0;
  let prevCell: Cell | null = null;
  word.forEach((cell) => {
    cost += prevCell
      ? Math.max(Math.abs(prevCell.row - cell.row), Math.abs(prevCell.col - cell.col))
      : 0;
    prevCell = cell;
  });
  return cost;
};

export const getWordPoints = (word: Cell[]) => {
  const wordText = word.map((cell) => cell.letter).join('');
  let points = 0;
  [...wordText].forEach((c) => {
    points += letterPoints[c];
  });
  return points;
};

export const getSubmittedWordsCost = (words: SubmittedWords[]) => {
  return words.reduce((sum, words) => sum + words.cost, 0);
};

export const getSubmittedWordsPoints = (words: SubmittedWords[]) => {
  return words.reduce((sum, words) => sum + words.points, 0);
};

export const getRemainingCost = (submittedWords: SubmittedWords[], currentWord: Cell[]) => {
  return (
    5 +
    getSubmittedWordsPoints(submittedWords) -
    getSubmittedWordsCost(submittedWords) -
    getWordCost(currentWord)
  );
};
