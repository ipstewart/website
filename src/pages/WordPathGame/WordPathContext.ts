import { createContext } from 'react';

import { Cell, SelectedPath, SubmittedWords } from './WordPath.schema';

export type WordPathContext = {
  lettersGrid: string[][];
  currentWord: Cell[];
  currentWordPath: SelectedPath[];
  submittedWords: SubmittedWords[];
  warningMessage: string | null;

  setLettersGrid: (grid: string[][]) => void;
  setCurrentWord: (word: Cell[]) => void;
  setCurrentWordPath: (path: SelectedPath[]) => void;
  setSubmittedWords: (words: SubmittedWords[]) => void;
  setWarningMessage: (message: string | null) => void;
};

export const WordPathContext = createContext<WordPathContext>({
  lettersGrid: [],
  currentWord: [],
  currentWordPath: [],
  submittedWords: [],
  warningMessage: null,

  setLettersGrid: () => {},
  setCurrentWord: () => {},
  setCurrentWordPath: () => {},
  setSubmittedWords: () => {},
  setWarningMessage: () => {},
});
