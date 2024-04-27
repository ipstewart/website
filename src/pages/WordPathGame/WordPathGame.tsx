import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useMemo, useState } from 'react';

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

  const [openInfoDialog, setOpenInfoDialog] = useState(true);

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
  );
}

export default WordPathGame;
