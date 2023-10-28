"use client";
import React from 'react';
import styles from './GameCard.module.css';
import { BsTrashFill } from 'react-icons/bs';
import { BiSolidEditAlt } from 'react-icons/bi';
import Link from 'next/link';

function GameCard({ game, removeGame, editGame }) {
  
  return (
    <div className={styles.card}>
      <div className={styles.imgcards}>
        <img className={styles.gameThumb} src={game.background_image ? game.background_image : game.background_image} alt={game.name} />
        <Link className={styles.seeMore} href={`../../games/${game.id}`}>Veja Mais</Link>
      </div>
      <div className={styles.cardInfo}>
        <h2 className={styles.title}>{game.name}</h2>
        <p className={styles.rating}>
          {game.rating ? game.rating : "Sem avaliação"}
          </p>
        <p className={styles.released}>
          {game.released ? game.released : "Sem data de lançamento"}
        </p>
        <p className={styles.genres}>
  {Array.isArray(game.genres) ? game.genres.join(", ") : game.genres}
</p>
<p className={styles.platforms}>
  {Array.isArray(game.platforms) ? game.platforms.join(", ") : game.platforms}
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
