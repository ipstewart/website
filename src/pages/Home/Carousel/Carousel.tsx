import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import styles from './Carousel.module.scss';

interface CarouselItem {
  title: string;
  description: string;
  icon: number;
}

export function Carousel({ items }: Readonly<{ items: CarouselItem[] }>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number[]>([1, 2]);
  const [prevIndex, setPrevIndex] = useState<number[]>([4, 3]);

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
