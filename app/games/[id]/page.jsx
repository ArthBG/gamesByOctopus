"use client";
import { fetchApiDetails } from '@/data/apiconsumer';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Header from '@/app/components/header/header';


const gameDescription = ({ params }) => {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const gamesFetch = async () => {
            try {
                const dados = await fetchApiDetails(params.id);
                setGames(dados);
            } catch (error) {
                throw error;
            }
        };

        gamesFetch();
    }, []);

    return (
        <div className={styles.container}>
           {/*  <Header /> */}
            <div className={styles.imageContainer}>
                <img className={styles.gameThumb} src={games.background_image} alt={games.name} height={540} width={1200} />
                <h1 className={styles.h1}>{games.name}</h1>
                <div className={styles.divrating}>
                    <p className={styles.rating}>{games.rating}</p>
                </div>

                <div className={styles.platformsContainer}>
                    {games.parent_platforms ? (
                        games.parent_platforms.map((platform) => (
                            <p className={styles.platforms}>{platform.platform.name}</p>
                        ))
                    ) : null}
                </div>
            </div>

            <div className={styles.descricao}>
                <p className={styles.h2}>{games.name} Game</p>
                <p className={styles.description}>{games.description_raw}</p>
                <div className={styles.data}>
                <h3 className={styles.h3}>Data de lançamento:</h3>
            <h6 className={styles.released}>{games.released}</h6>
            </div>
            </div>

            <h6 className={styles.h6g}>Gênero do jogo:</h6>
            {games.genres ? (
                games.genres.map((genre) => (

                    <div className={styles.genrediv}>
                        <p className={styles.genres}>{genre.name}</p>
                    </div>
                ))
            ) : null}

        </div>
    );
};

export default gameDescription;