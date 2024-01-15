import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';

import {
  getRemainingCost,
  getSubmittedWordsCost,
  getSubmittedWordsPoints,
  getWordCost,
  getWordPoints,
} from '../WordPath.utils';
import { WordPathContext } from '../WordPathContext';
import styles from './WordPathHeader.module.scss';

function WordPathHeader() {
  const { currentWord, submittedWords, warningMessage, setWarningMessage } =
    useContext(WordPathContext);

  return (
    <>
      <Box className="text-center">
        <Typography variant="h6" mb={1}>
          Current Word
        </Typography>
        <Box className="flex justify-center items-center gap-1 h-10">
          <Typography variant="h3">{currentWord.map((cell) => cell.letter).join('')}</Typography>
          <Typography variant="h3" fontWeight={400} className={styles.cursor} />
        </Box>
      </Box>

      {warningMessage && (
        <Alert
          severity="warning"
          onClose={() => {
            setWarningMessage(null);
          }}>
          {warningMessage}
        </Alert>
      )}

      <Box className="flex justify-between gap-5">
        <Box className="text-center flex-1">
          <Typography variant="body2">Total</Typography>
          <Typography variant="body2" mb={1}>
            Points
          </Typography>
          <Typography variant="h6">
            {getSubmittedWordsPoints(submittedWords)} (+{getWordPoints(currentWord)})
          </Typography>
        </Box>
        <Box className="text-center flex-1">
          <Typography variant="body2">Total Cost</Typography>
          <Typography variant="body2" mb={1}>
            of Words
          </Typography>
          <Typography variant="h6">
            {getSubmittedWordsCost(submittedWords)} (+{getWordCost(currentWord)})
          </Typography>
        </Box>
        <Box className="text-center flex-1">
          <Typography variant="body2" mb={1}>
            Remaining Movement
          </Typography>
          <Typography variant="h6">{getRemainingCost(submittedWords, currentWord)}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default WordPathHeader;
