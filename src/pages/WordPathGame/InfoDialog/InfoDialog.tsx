import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

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
            Adding new letters to a word has a cost, which is the length of the path between the
            last letter in your current word and next letter. As you build a word you will see the
            amount of points it will earn (based on Scrabble points per word) and its total cost in
            the parentheses at the top. Once you lock in a word it will add those to your cumulative
            total.
          </Typography>
          <Typography variant="body2" mb={2}>
            Your remaining movement is the total number of nodes you can traverse before it is game
            over. Remaining movement is your total points minus your total cost plus 5. It'll
            continue going up as long as you create words worth more points than they cost!
          </Typography>
          <Typography variant="body2" mb={2}>
            While creating a word you can experiment with options and undo your choices with the{' '}
            <b>DELETE</b> button, but once you submit your word you can't go back and change it.
          </Typography>
          <Typography variant="body2" mb={2}>
            Legal words are words that appear in the Merriam Webster dictionary that have not
            already been submitted.
          </Typography>
          <Typography variant="subtitle2">
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
