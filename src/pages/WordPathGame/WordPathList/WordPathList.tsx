import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';

import { WordPathContext } from '../WordPathContext';

function WordPathList() {
  const { submittedWords } = useContext(WordPathContext);

  return (
    <>
      {submittedWords.length > 0 && (
        <Box className="flex gap-10">
          <Box>
            <Typography variant="body2">WORD</Typography>
            {submittedWords.map((word) => (
              <Typography key={word.word} variant="body2">
                {word.word}
              </Typography>
            ))}
          </Box>

          <Box>
            <Typography variant="body2">POINTS</Typography>
            {submittedWords.map((word) => (
              <Typography key={word.word} variant="body2">
                {word.points}
              </Typography>
            ))}
          </Box>

          <Box>
            <Typography variant="body2">COST</Typography>
            {submittedWords.map((word) => (
              <Typography key={word.word} variant="body2">
                {word.cost}
              </Typography>
            ))}
          </Box>

          <Box>
            <Typography variant="body2">NET</Typography>
            {submittedWords.map((word) => (
              <Typography key={word.word} variant="body2">
                {word.points - word.cost}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

export default WordPathList;
