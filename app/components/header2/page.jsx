'use client'

import React from 'react'
import Image from 'next/image';
import styles from './header2.module.css';
import { BiSolidGroup } from 'react-icons/bi';
import { BiSolidHome } from 'react-icons/bi';
import { GiRetroController } from 'react-icons/gi';
import { SiLinktree } from 'react-icons/si';
import Link from 'next/link';

function Header2({ changeDisplay }) {

const meuLink = "https://linktr.ee/joao.senai"


    return (
        <div>
            <main className={styles.headernovo}>
                <div className={styles.icons}>
                <Link className={styles.a} href="/">
                    <BiSolidHome className={styles.icon}  />
                </Link>
                </div>
                <div className={styles.icons}>
                <Link className={styles.a} href="/sobrenos" target='parent'>
                <BiSolidGroup className={styles.icon}/>
                </Link>
                </div>
                <div className={styles.icons}>
                <Link className={styles.a} href="/">
                    <Image className={styles.icon} src={'/LOGO-octopusBlack.png'} width={50} height={50}></Image>
                </Link>
                </div>
                <div className={styles.icons}>
                <Link className={styles.a} onClick={changeDisplay} href="#">
                <GiRetroController className={styles.icon} />
                </Link>
                </div>
                <div className={styles.icons}>
                <Link className={styles.a} href={meuLink} target='_blank'>
                <SiLinktree className={styles.icon} />
                </Link>
                </div>
                
            </main>
        </div>
    )
}

export default Header2;