import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { letterPoints } from '../WordPath.utils';

interface InfoDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function InfoDialog({ open, setOpen }: InfoDialogProps) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        Welcome to <b>Word Node</b>!
      </DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box>
          <Typography variant="h6" mb={1}>
            How to play
          </Typography>
          <Typography variant="body2" mb={2}>
            Connect letter nodes to create words and earn points! Choose a starting letter then
            continue building your word by clicking additional letters. Once you've created a word,
            click <b>ENTER</b> to submit it and lock in your points!
          </Typography>
          <Typography variant="body2" mb={2}>
            Keep submitting words until the total cost of your words (the length of the path between
            all the letters) exceeds the total points of your words (summed from all letters, see
            each letter's value below). The remaining movement value tracks your cumulative total
            points minus cost plus 5 movement to start.
          </Typography>
          <Typography variant="body2" mb={2}>
            While creating a word you can experiment with options and undo your choices with the{' '}
            <b>DELETE</b> button, but once you submit your word you can't go back and change it.
          </Typography>
          <Typography variant="body2" mb={2}>
            Legal words are words that appear in the Merriam Webster dictionary that have not
            already been submitted.
          </Typography>

          <Typography variant="h6" mb={1}>
            Points per Letter
          </Typography>
          {[1, 2, 3, 4].map((value) => (
            <Typography key={value} variant="body2" mb={1}>
              {Object.keys(letterPoints)
                .filter((key) => letterPoints[key] === value)
                .join(',')}
              : {value} points
            </Typography>
          ))}
          <Typography variant="subtitle2" mt={2}>
            Created by Ian Stewart. Check out my main site and contact me at{' '}
            <Link href="/" underline="none">
              ianpstewart.com
            </Link>
            .
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <Button variant="outlined" sx={{ borderRadius: 10 }} onClick={() => setOpen(false)}>
          Let's Play
        </Button>{' '}
      </DialogActions>
    </Dialog>
  );
}

export default InfoDialog;
