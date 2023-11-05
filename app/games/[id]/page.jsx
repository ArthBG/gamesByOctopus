"use client";
import { fetchApiDetails } from '@/data/apiconsumer';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import Header from '@/app/components/header/header';
import Link from 'next/link';
import Header2 from '@/app/components/header2/page';


const FormateDateBr = (date) => {
    const dateFormated = new Date(date);
    const day = dateFormated.getDate();
    const month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    return `${day}/${month}/${year}`;
}


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
            <div className={styles.header} >
                <Header />

            </div>
            <div className={styles.Header2}>
                <Header2 />
            </div>
            <div className={styles.back}>
            <div className={styles.back2}>
            <div className={styles.imageContainer}>
                <img className={styles.gameThumb} src={games.background_image} alt={games.name} height={540} width={1250} />
            </div>
                {games.website ? (
                    <Link className={styles.h1} href={games.website} target='blank'>{games.name}</Link>
                ) : (
                    null
                )}




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
            <div className={styles.flexdiv}>
            <div className={styles.leftsidediv}>
            <div className={styles.age}>
                <h5 className={styles.h5age}>Classificação Etária:</h5>
                <p className={styles.faixa}> {games.esrb_rating ? games.esrb_rating.name : "Não disponível"}</p>
            </div>

            <div className={styles.publishers}>
                <h5 className={styles.h3}>Publicado por:</h5>
                <p className={styles.rating}>{games.publishers ? games.publishers[0].name : "Não disponível"}</p>
            </div>
            

            <div className={styles.descricao}>
                <p className={styles.h2}>{games.name}</p>
                <p className={styles.description}>{games.description_raw}</p>
            </div>

            </div>
            <div className={styles.sidediv}>
            <h5 className={styles.h6g}>Gêneros do jogo:</h5>
            <div className={styles.genresContainer}>
            {games.genres ? (
                games.genres.map((genre) => (

                    <div className={styles.genrediv}>
                        <p className={styles.genres}>{genre.name}</p>
                    </div>



                ))
            ) : null}
            </div>

            <div className={styles.data}>
                <h3 className={styles.h3}>Data de lançamento:</h3>
                <h6 className={styles.released}> {FormateDateBr(games.released)}</h6>

            </div>
            <h5 className={styles.h3}>Lojas disponíveis:</h5>
            <div className={styles.lojas}>
            {games.stores ? (
                games.stores.map((store) => (

                    <div className={styles.storediv}>
                        <p className={styles.stores}>{store.store.name}</p>
                    </div>

                ))
            ) : null}
            </div>


          
            <h5 className={styles.h6h}>Desenvolvedores:</h5>
            <div className={styles.devs}>
            {games.developers ? (
                games.developers.map((developers) => (

                    <div className={styles.devs}>

                        <p className={styles.developers}>{developers.name}</p>
                    </div>

                ))
            ) : null}
            </div>
            </div>
            </div>
            </div>
        </div>

         
    );
};

export default gameDescription;
