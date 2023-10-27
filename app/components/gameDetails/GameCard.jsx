"use client";
import React from 'react';
import styles from './GameCard.module.css';
import { BsTrashFill } from 'react-icons/bs';
import { BiSolidEditAlt } from 'react-icons/bi';
import Link from 'next/link';

function GameCard({ game, removeGame, editGame }) {
  let test = ''
  if (game.genres[0].name) {
    test = game.genres.map((genre) => genre.name).join(", ")
  } else {
    test = game.genres.join(", ")
  }

  let platforms = ''
  if(game.platforms[0].platform.name){
    platforms = game.platforms.map((platform) => platform.platform.name).join(",")
  } else{
    platforms = game.platforms.join(",")
  }

  return (
    <div className={styles.card}>
      <div className={styles.imgcards}>
        <img className={styles.gameThumb} src={game.background_image} alt={game.name} />
        <Link className={styles.seeMore} href={`../../games/${game.id}`}>Veja Mais</Link>
      </div>
      <div className={styles.cardInfo}>
        <h2 className={styles.title}>{game.name}</h2>
        <p className={styles.rating}>{game.rating}</p>
        <p className={styles.released}>{game.released}</p>
        <p className={styles.genres}>
          {
            // Verify if exists genre.name
            test
          }
        </p>
        <p className={styles.platforms}>
          {
            // Verify if exists platform.name
            platforms
          }
        </p>
      </div>
      <div className={styles.contaierbuttons}>
        <button className={styles.button} value={game.name}>
          <BsTrashFill onClick={() => removeGame(game.id)} />
        </button>
        <button className={styles.button} value={game.name}>
          <BiSolidEditAlt onClick={() => editGame(game.id)} />
        </button>
      </div>
    </div>
  );
}

export default GameCard;
