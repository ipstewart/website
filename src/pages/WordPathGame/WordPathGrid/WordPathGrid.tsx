import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useContext, useEffect } from 'react';

import { Cell, SelectedPath } from '../WordPath.schema';
import { getRemainingCost, getWordCost, getWordPoints } from '../WordPath.utils';
import { WordPathContext } from '../WordPathContext';
import { fetchDefinitions } from '../api/api';
import styles from './WordPathGrid.module.scss';

function WordPathGrid() {
  const {
    lettersGrid,
    currentWord,
    submittedWords,
    currentWordPath,
    setLettersGrid,
    setCurrentWord,
    setCurrentWordPath,
    setSubmittedWords,
    setWarningMessage,
  } = useContext(WordPathContext);

  useEffect(() => {
    generateLetterGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateSelectionMatrix = (cells: Cell[]) => {
      const path: SelectedPath[] = [];
      let prevCell: Cell | null = null;
      cells.forEach((cell) => {
        if (!prevCell) {
          prevCell = cell;
          return;
        }

        let rowDistance = Math.abs(cell.row - prevCell.row);
        let colDistance = Math.abs(cell.col - prevCell.col);

        let currentRowPosition = cell.row;
        let currentColPosition = cell.col;

        while (colDistance !== 0) {
          if (rowDistance !== 0) {
            const newRowPosition =
              currentRowPosition < prevCell.row ? currentRowPosition + 1 : currentRowPosition - 1;
            const newColPosition =
              currentColPosition < prevCell.col ? currentColPosition + 1 : currentColPosition - 1;
            path.push({
              row1: currentRowPosition,
              col1: currentColPosition,
              row2: newRowPosition,
              col2: newColPosition,
              selected: 1,
            });
            rowDistance -= 1;
            colDistance -= 1;
            currentRowPosition = newRowPosition;
            currentColPosition = newColPosition;
          } else {
            const newColPosition =
              currentColPosition < prevCell.col ? currentColPosition + 1 : currentColPosition - 1;
            path.push({
              row1: currentRowPosition,
              col1: currentColPosition,
              row2: currentRowPosition,
              col2: newColPosition,
              selected: 1,
            });
            colDistance -= 1;
            currentColPosition = newColPosition;
          }
        }

        while (rowDistance !== 0) {
          const newRowPosition =
            currentRowPosition < prevCell.row ? currentRowPosition + 1 : currentRowPosition - 1;
          path.push({
            row1: currentRowPosition,
            col1: currentColPosition,
            row2: newRowPosition,
            col2: currentColPosition,
            selected: 1,
          });
          rowDistance -= 1;
          currentRowPosition = newRowPosition;
        }
        prevCell = cell;
      });
      setCurrentWordPath(path);
    };

    updateSelectionMatrix(currentWord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  const newGame = () => {
    setSubmittedWords([]);
    setCurrentWord([]);
    generateLetterGrid();
  };

  const generateLetterGrid = (rows = 6, cols = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        row.push(characters[randomIndex]);
      }
      grid.push(row);
    }
    setLettersGrid(grid);
  };

  const submitWord = async () => {
    const word = currentWord.map((cell) => cell.letter).join('');

    const isValidWord = async (word: string) => {
      const wordDefinitions = await fetchDefinitions(word);
      const isInDict =
        Array.isArray(wordDefinitions) &&
        wordDefinitions.length > 0 &&
        typeof wordDefinitions[0] !== 'string';

      let isValid = true;
      if (!isInDict) {
        setWarningMessage(`${word} is not in the dictionary`);
        isValid = false;
      } else if (submittedWords.map((word) => word.word).includes(word)) {
        setWarningMessage(`${word} has already been submitted`);
        isValid = false;
      } else {
        setWarningMessage(null);
      }
      return isValid;
    };

    if (await isValidWord(word)) {
      setSubmittedWords([
        ...submittedWords,
        { word, points: getWordPoints(currentWord), cost: getWordCost(currentWord) },
      ]);
      setCurrentWord([]);
    }
  };

  const isLetterSelected = (row: number, col: number) => {
    return currentWord.some((cell) => cell.row === row && cell.col === col);
  };

  const isMostRecentSelected = (row: number, col: number) => {
    const lastSelected = [...currentWord].pop();
    return lastSelected && lastSelected.row === row && lastSelected.col === col;
  };

  const getButtonBackgroundColor = (row: number, col: number) => {
    if (isMostRecentSelected(row, col)) {
      return 'green';
    } else if (isLetterSelected(row, col)) {
      return 'orange';
    }
    return 'transparent';
  };

  const getButtonColor = (row: number, col: number) => {
    if (isMostRecentSelected(row, col) || isLetterSelected(row, col)) {
      return 'white';
    } else {
      return isDisabled(row, col) ? 'gray' : 'black';
    }
  };

  const getPathWidth = (row1: number, col1: number, row2: number, col2: number) => {
    const path1 = currentWordPath.find(
      (d) => d.row1 === row1 && d.col1 === col1 && d.row2 === row2 && d.col2 === col2,
    );
    const path2 = currentWordPath.find(
      (d) => d.row1 === row2 && d.col1 === col2 && d.row2 === row1 && d.col2 === col1,
    );

    if (path1 || path2) {
      return path1?.selected || path2?.selected ? 'var(--path-thickness)' : '0px';
    } else {
      return '0px';
    }
  };

  const isDisabled = (row: number, col: number) => {
    const remainingCost = getRemainingCost(submittedWords, currentWord);
    const lastCell = [...currentWord].pop();
    const costToMove = lastCell
      ? Math.max(Math.abs(lastCell.row - row), Math.abs(lastCell.col - col))
      : 0;
    return costToMove > remainingCost;
  };

  return (
    <>
      <Box className="flex flex-col">
        {lettersGrid.map((row, rowIndex) => (
          <Box key={rowIndex} className="flex">
            {row.map((letter, colIndex) => (
              <Box key={colIndex} className="flex">
                <Box>
                  <IconButton
                    disabled={isDisabled(rowIndex, colIndex)}
                    onClick={() =>
                      setCurrentWord([
                        ...currentWord,
                        { letter: lettersGrid[rowIndex][colIndex], row: rowIndex, col: colIndex },
                      ])
                    }
                    className={styles.letterButton}
                    sx={{
                      border: '2px solid #e0e0e0',
                      color: getButtonColor(rowIndex, colIndex),
                      backgroundColor: getButtonBackgroundColor(rowIndex, colIndex),
                      '&:hover': {
                        backgroundColor: getButtonBackgroundColor(rowIndex, colIndex),
                      },
                      '&:disabled': {
                        color: getButtonColor(rowIndex, colIndex),
                        backgroundColor: getButtonBackgroundColor(rowIndex, colIndex),
                      },
                    }}>
                    {letter}
                  </IconButton>
                  {rowIndex !== lettersGrid.length - 1 && (
                    <Box
                      className={styles.verticalPath}
                      sx={{
                        width: getPathWidth(rowIndex, colIndex, rowIndex + 1, colIndex),
                      }}
                    />
                  )}
                </Box>
                <Box className="relative">
                  {colIndex !== row.length - 1 && (
                    <Box
                      className={styles.horizontalPath}
                      sx={{
                        height: getPathWidth(rowIndex, colIndex, rowIndex, colIndex + 1),
                      }}
                    />
                  )}
                  {colIndex !== row.length - 1 && rowIndex !== lettersGrid.length - 1 && (
                    <Box
                      className={`${styles.diagonalPath} -rotate-45`}
                      sx={{
                        width: getPathWidth(rowIndex, colIndex, rowIndex + 1, colIndex + 1),
                      }}
                    />
                  )}
                  {colIndex !== row.length - 1 && rowIndex !== lettersGrid.length - 1 && (
                    <Box
                      className={`${styles.diagonalPath} rotate-45`}
                      sx={{
                        width: getPathWidth(rowIndex, colIndex + 1, rowIndex + 1, colIndex),
                      }}
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box className="flex justify-center gap-2">
        <Button variant="outlined" sx={{ borderRadius: 10 }} onClick={submitWord}>
          Enter
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: 10 }}
          onClick={() => setCurrentWord([...currentWord].slice(0, -1))}>
          Delete
        </Button>
        <Button variant="outlined" color="secondary" sx={{ borderRadius: 10 }} onClick={newGame}>
          New Game
        </Button>
      </Box>
    </>
  );
}

export default WordPathGrid;
