"use client";
import React from 'react'
import Styles from './sobrenos.module.css'
import Image from 'next/image';
import Header from '../components/header/header';
import Header2 from '../components/header2/page';
import '@coreui/coreui/dist/css/coreui.min.css';
import { CFooter } from '@coreui/react'
import { CLink } from '@coreui/react'


function SobreNos() {
    return (
        <main className={Styles.main1}>
            <div className={Styles.header}>
                <Header />
            </div>
            <div className={Styles.header2}>
                <Header2 />
            </div>

            <h1 className={Styles.titulo}>Sobre Nós</h1>

            <div className={Styles.container}>

                <div className={Styles.divisao}>

                    <div className={Styles.card}>

                        <a href="https://www.instagram.com/borgesrth" target='_blank'><Image className={Styles.img} src="/pictureprofile.octopus01.png" width={180} height={180} /></a>
                        <p className={Styles.text1}><strong>Nome: </strong>Arthur Borges</p>
                        <p className={Styles.text1}><strong>Idade:</strong> 16 anos</p>
                        <p className={Styles.text1}><strong>Descrição:</strong>Arthur Borges é um membro talentoso e dedicado da equipe Octopus, atuando com maestria como Tech Lead. Sua paixão por futebol e computação o torna um profissional versátil e entusiasmado, equilibrando suas habilidades no mundo virtual e no campo. Residindo na acolhedora Valinhos, São Paulo, Arthur, com seus 16 anos, demonstra um futuro brilhante à frente, onde sua determinação e amor por tecnologia prometem conquistar desafios e conquistas impressionantes.</p>
                    </div>
                    <div className={Styles.card}>
                        <a href="https://www.instagram.com/nicolyval_" target='_blank'> <Image className={Styles.img} src="/123407106.jpg" width={180} height={180} /></a>
                        <p className={Styles.text1}><strong>Nome: </strong> Nicoly Val</p>
                        <p className={Styles.text1}><strong>Idade:</strong> 16 anos</p>
                        <p className={Styles.text1}><strong>Descrição:</strong>Nicoly Val, uma integrante talentosa da equipe Octopus, traz consigo uma paixão singular por literatura e design. Sua apreciação pela palavra escrita e pela estética visual a torna uma força criativa notável. Com 16 anos de idade, Nicoly, residente de Valinhos, São Paulo, é um exemplo de juventude versátil, capaz de unir a arte da escrita à expressão visual de maneira única. Seu comprometimento e criatividade enriquecem nossa equipe e prometem um futuro brilhante, onde literatura e design se entrelaçam para criar experiências cativantes e inspiradoras.</p>
                    </div>
                    <div className={Styles.card}>
                        <a href="https://www.instagram.com/mathh_costa" target='_blank'><Image className={Styles.img} src="/pictureprofile.octopus03.jfif" width={180} height={180} /></a>
                        <p className={Styles.text1}><strong>Nome: </strong> Matheus Zambom</p>
                        <p className={Styles.text1}><strong>Idade:</strong> 17 anos</p>
                        <p className={Styles.text1}><strong>Descrição:</strong> Matheus Zambon, membro dedicado da equipe Octopus, combina sua paixão pela academia e futebol com determinação e vigor notáveis. Aos 16 anos e residente em Valinhos, São Paulo, ele demonstra um comprometimento incansável em todos os seus empreendimentos. Seu entusiasmo contagioso o torna um ativo valioso, prevendo um futuro promissor tanto no esporte como no mundo digital.</p>
                    </div>

                </div>

                <div className={Styles.divisao}>
                    <div className={Styles.card}>
                        <a href="https://www.instagram.com/bela.osouza" target='_blank'><Image className={Styles.img} src="/pictureprofile.octopus04.jfif" width={180} height={180} /></a>
                        <p className={Styles.text1}><strong>Nome: </strong> Isabela Souza</p>
                        <p className={Styles.text1}><strong>Idade:</strong>16 anos</p>
                        <p className={Styles.text1}><strong>Descrição:</strong>Isabela Souza, uma integrante da equipe Octopus, é uma jovem de 16 anos de Valinhos, São Paulo, que tem uma paixão especial pela culinária e maratonas de séries. Ela é conhecida por sua habilidade na cozinha e seu entusiasmo por explorar tramas e personagens através das telas. Sua criatividade e paixão prometem adicionar um toque especial aos projetos futuros da equipe, tornando-os tão envolventes quanto seus pratos culinários e séries favoritas.</p>
                    </div>
                    <div className={Styles.card}>
                        <a href="https://www.instagram.com/joaoo.sntx" target='_blank'><Image className={Styles.img} src="/pictureprofile.octopusme.jfif" width={180} height={180} /></a>
                        <p className={Styles.text1}><strong>Nome: </strong>João Oliveira</p>
                        <p className={Styles.text1}><strong>Idade:</strong>16 anos</p>
                        <p className={Styles.text1}><strong>Descrição:</strong>João Victor, membro entusiasta da equipe Octopus, é apaixonado por futebol e música. Com 16 anos e morando em Valinhos, São Paulo, ele equilibra com maestria sua paixão pelo esporte e pela música. Sua presença na equipe é uma fonte de energia e criatividade, prometendo um futuro brilhante e cheio de conquistas tanto nos campos como no mundo da música.</p>
                    </div>

                </div>

            </div>
            <CFooter>
  <div>
    <CLink href="https://linktr.ee/joao.senai">Octopus</CLink>
    <span> 2023 Todos os direitos reservados</span>
  </div>
  <div>
    <span>Powered by </span>
    <CLink href="https://github.com/Arthursenai/gamesByOctopus">Octopus</CLink>
  </div>
  </CFooter>
        </main>
    )
}

export default SobreNos