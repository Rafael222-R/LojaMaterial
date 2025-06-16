'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap'
import { FaPlusCircle, FaPen,FaTrash } from 'react-icons/fa'

export default function clientesPage() {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/clientes')
            .then(res => {
                console.log(res.data)
                setClientes(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    function excluir(cliente) {

        if (window.confirm(`Deseja realmente excluir ${cliente.nome}`)) {
          axios.delete(`http://localhost:3000/clientes/${cliente._id}`)
              .then(() => {
                  alert("Cargo excluído com sucesso!");
      
                  // Atualiza a lista de cargos após exclusão
                  axios.get('http://localhost:3000/clientes')
                      .then(res => {
                          setClientes(res.data);  // Atualiza a lista de cargos no estado
                      })
                      .catch(err => {
                          console.error("Erro ao atualizar a lista:", err);
                      });
            
              })
      }
        
      }

    

    return (
        <Pagina>

            <div className='text-end mb-2'>
                <Button href='/clientes/form'><FaPlusCircle /> Novo</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>

                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => {
                        return (
                            <tr>
                                <td>{cliente.nome}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefone} </td>
                                <td className='text-center'>
                                    {/* Botões das ações */}
                                    <Button className='me-2' href={`/clientes/edit?_id=${cliente._id}`}><FaPen /></Button>
                                    <Button variant='danger' onClick={() => excluir(cliente)}><FaTrash /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>



        </Pagina>
    )
}
