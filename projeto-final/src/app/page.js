'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardImg, Carousel, Col, Row } from 'react-bootstrap'

export default function page() {

  const [imagem, setImagem] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/produtos')
      .then(res => {
        console.log(res.data)
        setImagem(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])
  return (
    <Pagina titulo={"Nossos Produtos a Pronta entrega"}>


    
      <Row className='mb-2'>
        <Carousel>

          {imagem.map(
            imagens => (
              <Carousel.Item >
                <CardImg style={{
                  width: '600px',
                  height: '400px',
                  
                }} src={imagens.foto} />
                <Carousel.Caption className='text-dark py-2'>
                  <h3>{imagens.nome}</h3>
                  <p>{imagens.descricao}</p>

                </Carousel.Caption>
              </Carousel.Item>
            )
          )}

        </Carousel>
      </Row>

      <Row>
        <p> Produtos em Oferta </p>
      </Row>



    </Pagina>
  )
}
