import { ThemeProvider } from '@emotion/react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { CssBaseline, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { useMemo, useState } from 'react';

import { wordPathTheme } from '../../styles/word-path-theme';
import InfoDialog from './InfoDialog/InfoDialog';
import { Cell, SelectedPath, SubmittedWords } from './WordPath.schema';
import { WordPathContext } from './WordPathContext';
import styles from './WordPathGame.module.scss';
import WordPathGrid from './WordPathGrid/WordPathGrid';
import WordPathHeader from './WordPathHeader/WordPathHeader';
import WordPathList from './WordPathList/WordPathList';

function WordPathGame() {
  const [lettersGrid, setLettersGrid] = useState<string[][]>([]);

  const [currentWord, setCurrentWord] = useState<Cell[]>([]);
  const [currentWordPath, setCurrentWordPath] = useState<SelectedPath[]>([]);
  const [submittedWords, setSubmittedWords] = useState<SubmittedWords[]>([]);

  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const wordPathProviderValue = useMemo(
    () => ({
      lettersGrid,
      currentWord,
      currentWordPath,
      submittedWords,
      warningMessage,
      setLettersGrid,
      setCurrentWord,
      setCurrentWordPath,
      setSubmittedWords,
      setWarningMessage,
    }),
    [
      lettersGrid,
      currentWord,
      currentWordPath,
      submittedWords,
      warningMessage,
      setLettersGrid,
      setCurrentWord,
      setCurrentWordPath,
      setSubmittedWords,
      setWarningMessage,
    ],
  );

  return (
    <ThemeProvider theme={wordPathTheme}>
      <CssBaseline />
      <WordPathContext.Provider value={wordPathProviderValue}>
        <div className={styles.wordPathGame}>
          <Box className="w-full flex justify-center" my={5}>
            <Box className="relative flex flex-col items-center gap-6">
              <Box className="absolute -top-2 right-0">
                <IconButton
                  aria-label="info"
                  className="absolute"
                  onClick={() => setOpenInfoDialog(true)}>
                  <HelpOutlineIcon />
                </IconButton>
                <InfoDialog open={openInfoDialog} setOpen={setOpenInfoDialog} />
              </Box>

              <WordPathHeader />

              <WordPathGrid />

              <WordPathList />
            </Box>
          </Box>
        </div>
      </WordPathContext.Provider>
    </ThemeProvider>
  );
}

export default WordPathGame;
