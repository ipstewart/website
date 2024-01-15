import { Cell, SubmittedWords } from './WordPath.schema';

export const letterPoints: { [key: string]: number } = {
  A: 1,
  B: 2,
  C: 2,
  D: 1,
  E: 1,
  F: 3,
  G: 1,
  H: 3,
  I: 1,
  J: 4,
  K: 4,
  L: 1,
  M: 2,
  N: 1,
  O: 1,
  P: 2,
  Q: 4,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 3,
  W: 3,
  X: 4,
  Y: 3,
  Z: 4,
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
