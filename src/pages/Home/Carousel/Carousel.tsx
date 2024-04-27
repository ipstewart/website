import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import styles from './Carousel.module.scss';

interface CarouselItem {
  title: string;
  description: string;
  icon: number;
}

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number[]>([1, 2]);
  const [prevIndex, setPrevIndex] = useState<number[]>([4, 3]);

  const items: CarouselItem[] = [
    {
      title: 'Interactive Web Development',
      description: 'Build applications using modern web frameworks',
      icon: 0x1f310,
    },
    {
      title: 'UI/UX Design and Research',
      description: 'Create intuitive mockups and lead user testing',
      icon: 0x1f4ca,
    },
    {
      title: 'Full Stack Integration',
      description: 'Develop APIs and databases to tie in with applications',
      icon: 0x1f4bb,
    },
    {
      title: 'Containerization and Deployment',
      description: 'Prepare applications for the cloud with Docker',
      icon: 0x1f433,
    },
    {
      title: 'Mentor and Follow Best Practices',
      description: 'Stay up to date on the latest tech and teach other devs',
      icon: 0x1f393,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, setCurrentIndex]);

  // scroll to next card
  const next = () => {
    const dummyCurrent = currentIndex;
    setCurrentIndex(nextIndex[0]);
    setNextIndex([nextIndex[1], nextIndex[1] + 1 <= items.length - 1 ? nextIndex[1] + 1 : 0]);
    setPrevIndex([dummyCurrent, prevIndex[0]]);
  };

  const getItemClassName = (index: number) => {
    switch (true) {
      case index === currentIndex:
        return `${styles.carouselItem} ${styles.carouselItemCurrent}`;
      case index === prevIndex[1]:
        return `${styles.carouselItem} ${styles.carouselItemTwoPrev}`;
      case index === prevIndex[0]:
        return `${styles.carouselItem} ${styles.carouselItemPrev}`;
      case index === nextIndex[1]:
        return `${styles.carouselItem} ${styles.carouselItemTwoNext}`;
      case index === nextIndex[0]:
        return `${styles.carouselItem} ${styles.carouselItemNext}`;
      default:
        return styles.carouselItem;
    }
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.carousel}>
        {items.map(({ title, description, icon }, index) => (
          <Box key={title} className={getItemClassName(index)}>
            <Box
              className={styles.carouselItemIcon}
              sx={{ backgroundColor: 'primary.light', borderColor: 'primary.main' }}>
              {String.fromCodePoint(icon)}
            </Box>
            <Box
              className={styles.carouselItemBody}
              sx={{ backgroundColor: 'background.default', borderColor: 'primary.main' }}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2">{description}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
