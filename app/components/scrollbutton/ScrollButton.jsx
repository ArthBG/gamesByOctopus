import { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styles from '@/app/page.module.css';

const ScrollButton = () => {
  const [scrollY, setScrollY] = useState(0);

  // Add an event listener to update the scrollY state
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY > 200 ? (
    <div className={styles.scrollbtn} onClick={() => window.scrollTo(0, 0)}>
      <IoIosArrowUp className={styles.icons} />
    </div>
  ) : (
    <div className={styles.scrollbtn} onClick={() => window.scrollTo(0, 100000)}>
      <IoIosArrowDown className={styles.icons} />
    </div>
  );
}

export default ScrollButton;
