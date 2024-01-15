import GitHubIcon from '@mui/icons-material/GitHub';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Footer() {
  return (
    <Box
      className="p-3 flex justify-center flex-wrap gap-3 border"
      sx={{
        borderTop: '1px solid #e0e0e0',
      }}>
      <Button
        variant="contained"
        disableElevation
        href="mailto:stewart.p.ian@gmail.com"
        startIcon={<SendIcon />}>
        Email
      </Button>
      <Button
        variant="contained"
        disableElevation
        target="_blank"
        href="https://github.com/ipstewart"
        startIcon={<GitHubIcon />}>
        GitHub
      </Button>
      <Button
        variant="contained"
        disableElevation
        target="_blank"
        href="https://www.linkedin.com/in/ian-p-stewart/"
        startIcon={<LinkedInIcon />}>
        LinkedIn
      </Button>
      <Button
        variant="contained"
        disableElevation
        target="_blank"
        href="https://open.spotify.com/user/ianps737?si=f450137fffcd4c5b"
        startIcon={<LibraryMusicIcon />}>
        Spotify
      </Button>
    </Box>
  );
}

export default Footer;
