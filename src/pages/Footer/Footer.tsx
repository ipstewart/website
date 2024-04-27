import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

function Footer() {
  const iconButtonStyle = {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'secondary.main',
      color: 'secondary.contrastText',
    },
  };

  return (
    <Box className="p-3 flex justify-center flex-wrap gap-3">
      <IconButton href="mailto:stewart.p.ian@gmail.com" sx={iconButtonStyle}>
        <SendIcon />
      </IconButton>
      <IconButton target="_blank" href="https://github.com/ipstewart" sx={iconButtonStyle}>
        <GitHubIcon />
      </IconButton>
      <IconButton
        target="_blank"
        href="https://www.linkedin.com/in/ian-p-stewart/"
        sx={iconButtonStyle}>
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
}

export default Footer;
