'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button,Table    } from 'react-bootstrap'
import { FaPlusCircle,FaPen,FaTrash} from 'react-icons/fa'


export default function funcionariosPage(props) {

    console.log(props)

const [funcionarios, setFuncionarios]= useState([])


useEffect(() =>{
    axios.get('http://localhost:3000/funcionarios')
    .then(res =>{
        console.log(res.data)
        setFuncionarios(res.data)
        
    })
    .catch(err =>{
        console.log(err)
    })
},[])


function excluir(funcionario) {

  if (window.confirm(`Deseja realmente excluir ${funcionario.nome}`)) {
    axios.delete(`http://localhost:3000/funcionarios/${funcionario._id}`)
        .then(() => {
            alert("Cargo excluído com sucesso!");

            // Atualiza a lista de cargos após exclusão
            axios.get('http://localhost:3000/funcionarios')
                .then(res => {
                    setFuncionarios(res.data);  // Atualiza a lista de cargos no estado
                })
                .catch(err => {
                    console.error("Erro ao atualizar a lista:", err);
                });
      
        })
}
  
}
  return (
    <Pagina titulo={'Funcionario'}>

        <div className='text-end mb-2'> 
            <Button href='/funcionarios/form'><FaPlusCircle/> Novo</Button>
        </div>

        <Table striped bordered hover>
        <thead>
          <tr>
            
            <th>Foto</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Genero</th>
            <th>Cargo</th>
            <th>Ações</th>
        
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => {
            return (
              <tr>
                <td><img src={funcionario.foto} width={60} height={90}/></td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.cpf}</td>
                <td>{funcionario.email}</td>
                <td>{funcionario.telefone} </td>
                <td>{funcionario.genero}</td>
                <td>{funcionario?.cargo?.nome}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/funcionarios/edit?_id=${funcionario._id}`}><FaPen /></Button> 
                  <Button variant='danger' onClick={() => excluir(funcionario)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}
