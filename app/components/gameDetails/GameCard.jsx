"use client";
import React from 'react';
import styles from './GameCard.module.css';
import { BsTrashFill } from 'react-icons/bs';
import { BiSolidEditAlt } from 'react-icons/bi';
import Link from 'next/link';

function GameCard({ game, removeGame, editGame }) {
  // let test = ''
  // if (game.genres[0].name) {
  //   test = game.genres.map((genre) => genre.name).join(", ")
  // } else {
  //   test = game.genres.join(", ")
  // }

  // let test2 = '';
  // if (game.parent_platforms[0].platform.name) {
  //   test2 = game.parent_platforms.map((platform) => platform.platform.name).join(", ")
  // } else {
  //   test2 = game.parent_platforms.join(", ")
  // }

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
            game.genres.join(", ")
          }
        </p>
        <p className={styles.platforms}>
          {
            // Verify if exists platform.name
            game.platforms.join(", ")
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
