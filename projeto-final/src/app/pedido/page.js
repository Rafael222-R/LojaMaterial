'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPlusCircle, FaPen, FaTrash } from 'react-icons/fa'

export default function PedidoPage() {
  const [pedidos, setPedidos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/pedido')
      .then(res => {
        console.log(res.data)
        setPedidos(res.data)
      })
      .catch(err => {
        console.log('Erro ao buscar pedidos:', err)
      })
  }, [])

  function excluir(pedido) {
    if (window.confirm('Deseja realmente excluir esse pedido?')) {
      axios.delete(`http://localhost:3000/pedido/${pedido._id}`)
        .then(() => {
          alert('Pedido excluído com sucesso!')

          // Atualizar lista após exclusão
          axios.get('http://localhost:3000/pedido')
            .then(res => {
              setPedidos(res.data)
            })
            .catch(err => {
              console.error('Erro ao atualizar a lista:', err)
            })
        })
    }
  }

  return (
    <Pagina titulo="Carrinho de Compras">
      <div className="text-end mb-2">
        <Button href="/pedido/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Funcionário</th>
            <th>Total da Compra</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido._id}>
              <td>{pedido?.cliente?.nome}</td>
              <td>{pedido?.funcionario?.nome}</td>
              <td>R$ {(pedido.valorTotal?.toFixed(2)) || '0.00'}</td>
              <td className="text-center">
                <Button
                  className="me-2"
                  href={`/pedido/edit?id=${pedido._id}`}
                  
                >
                  <FaPen />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => excluir(pedido)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
