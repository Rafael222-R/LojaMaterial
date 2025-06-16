'use client'
import Pagina from '@/components/Pagina';
// client/src/App.js
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { FaPlusCircle, FaPen, FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';

export default function cargoPage(props) {


    const [cargos, setCargos] = useState([]);


    useEffect(() => {
        // Fazendo a requisição GET para o backend  
        axios.get('http://localhost:3000/cargos')
            //then manipular a respostar certa
            .then(res => {
                console.log(res.data)
                setCargos(res.data)
            })
            // catch manipular o error
            .catch(err => {
                console.log(err)
            })


    }, []);

    function excluir(cargo) {
        if (window.confirm(`Deseja realmente excluir ${cargo.nome}`)) {
            axios.delete(`http://localhost:3000/cargos/${cargo._id}`)
                .then(() => {
                    alert("Cargo excluído com sucesso!");

                    // Atualiza a lista de cargos após exclusão
                    axios.get('http://localhost:3000/cargos')
                        .then(res => {
                            setCargos(res.data);  // Atualiza a lista de cargos no estado
                        })
                        .catch(err => {
                            console.error("Erro ao atualizar a lista:", err);
                        });
              
                })
        }


    }

    return (

        <Pagina titulo={'Cargos'}>

            <div className='text-end mb-2'>
                <Button href='/cargos/form'><FaPlusCircle /> Cadastro</Button>
            </div>



            <Row >
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descricao</th>
                            <th>Habilidade</th>
                            <th>Açoes</th>



                        </tr>
                    </thead>
                    <tbody>
                        {cargos.map(cargo => {
                            return (
                                <tr>
                                    <td>{cargo.nome}</td>
                                    <td>{cargo.descricao}</td>
                                    <td>{cargo.habilidade}</td>
                                    <td className='text-center'>
                                        {/* Botões das ações */}
                                        <Button className='me-2' href={`/cargos/edit?_id=${cargo._id}`}><FaPen /></Button>
                                        <Button variant='danger' onClick={() => excluir(cargo)}><FaTrash /></Button>
                                    </td>


                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Row>


        </Pagina>
    );
}


