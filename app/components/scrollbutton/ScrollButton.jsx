"use client";
import { useEffect, useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import styles from '@/app/page.module.css';

const ScrollButton = () => {
    return window.scrollY > 200 ? (
        <div className={styles.scrollbtn} onClick={() => window.scrollTo(0, 0)}>
          <IoIosArrowUp className={styles.icons} />
        </div>
      ) : (
        <div className={styles.scrollbtn} onClick={() => window.scrollTo(0, 100000)}>
          <IoIosArrowDown className={styles.icons} />
        </div>
      )
}

export default ScrollButton;
