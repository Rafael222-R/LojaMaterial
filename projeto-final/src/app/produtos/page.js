'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table, Col } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ProdutosPage() {

const [produtos, setProdutos] =useState([])


useEffect(() => {
    axios.get('http://localhost:3000/produtos')
    .then(res => {
      console.log(res.data)
      setProdutos(res.data)
    })
    .catch(err =>{
      console.log(err)
    })

}, [])

function excluir(produto) {
  if (window.confirm(`Deseja realmente excluir ${produto.nome}`)) {
      axios.delete(`http://localhost:3000/produtos/${produto._id}`)
          .then(() => {
              alert("produto excluído com sucesso!");

              // Atualiza a lista de produto após exclusão
              axios.get('http://localhost:3000/produtos')
                  .then(res => {
                    setProdutos (res.data);  // Atualiza a lista de produto no estado
                  })
                  .catch(err => {
                      console.error("Erro ao atualizar a lista:", err);
                  });
        
          })
  }
}


  return (
    <Pagina titulo={'Produtos'}>

        <div className='text-end mb-2'>
        <Button href='/produtos/form'><FaPlusCircle /> Novo</Button>
        </div>

<Table striped bordered hover>
        <thead>
          <tr>
            
            <th>Foto</th>
            <th>Nome</th>
            <th>Descricao</th>
            <th>Codigo de Barras</th>
            <th>Peso</th>
            <th>Preço</th>
            <th>Ações</th>
        
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => {
            return (
              <tr>
                <td><img src={produto.foto}width={60} height={90}/></td>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.codigo_barras}</td>
                <td>{produto.peso} Kg</td>
                <td>R$ {produto.preco}</td>
                <td className='text-center '>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/produtos/edit?id=${produto._id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(produto)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>

    </Pagina>
  )
}
