export interface Cell {
  letter: string;
  row: number;
  col: number;
}

export interface SubmittedWords {
  word: string;
  cost: number;
  points: number;
}

export interface SelectedPath {
  row1: number;
  col1: number;
  row2: number;
  col2: number;
  selected: number;
}
