'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios';
import { Formik } from 'formik'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import ReactInputMask from 'react-input-mask';

export default function CargosEditPage(props) {

  const router = useRouter()

    console.log(props.searchParams._id)
    const id = props.searchParams._id

    function salvar(dados) {
        console.log(dados)
        axios.put('http://localhost:3000/cargos/'+ id , dados)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        } )


    alert("Cargo Editado com Sucesso!")
    router.push('/cargos')

    }
 
  // Campos do form e valores iniciais(default)
  const initialValues = {
    nome: "",
    descricao: '',
    salario: '',
    habilidade: "",
    status_cargo: "",
    departamento:'',
    nivel_hierarquico:'',
    data_criacao:'',

  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup
    .string("Campo nome precisa ser um texto")
    .required( "Campo nome é Obrigatorio"),
    descricao: Yup
    .string("Campo nome precisa ser um texto")
    .required( "Campo nome é Obrigatorio"),
    salario: Yup
    .string("Campo salario precisa ser numerico")
    .required("Campo Salario é Obrigatorio"),
    habilidade: Yup
    .string("Campo nome precisa ser um texto")
    .required( "Campo nome é Obrigatorio"),
    status_cargo: Yup
    .string("Campo nome precisa ser um texto")
    .required( "Campo nome é Obrigatorio"),
    departamento: Yup
    .string("Campo nome precisa ser um texto")
    .required( "Campo nome é Obrigatorio"),
    nivel_hierarquico: Yup
    .string("Campo nome precisa ser um texto")
    .required( "Campo nome é Obrigatorio"),
    data_criacao: Yup
    .date("Data Inválida")
    .required( "Campo nome é Obrigatorio"),
  })

  return (
    <Pagina titulo={"Edição de Cargo "}>

      {/* Formulário */}    

      <Formik
        // Atributos do formik
        // Se for edição, coloca os dados de cursoEditado
        // Se for nova, colocar o initialValues com os valores vazios
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {/* construção do template do formulário */}
        {
          // os valores e funções do formik
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, setValues }) => {

            // ações do formulário
            // debug
            // console.log("DEBUG >>>")
            // console.log({values, errors, touched})
            useEffect(() =>{
                axios.get('http://localhost:3000/cargos/'+ id)
                .then(res => {
                    console.log(res)
                    setValues(res.data)
                })
                .catch(err => {
                    console.log(err)
                } )
            },[])


            // retorno com o template jsx do formulário
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome do cargo:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Descrição do cargo:</Form.Label>
                    <Form.Control
                      name='descricao'
                      type='text'
                      value={values.descricao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.descricao && !errors.descricao}
                      isInvalid={touched.descricao && errors.descricao}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Salário do cargo:</Form.Label>
                    <Form.Control as={ReactInputMask}
                    mask={'R$ 9999'}
                    placeholder='R$ 1500'
                      name='salario'
                      type='text'
                      value={values.salario}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.salario && !errors.salario}
                      isInvalid={touched.salario && errors.salario}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.salario}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Habilidade necessária para o cargo:</Form.Label>
                    <Form.Control
                      name='habilidade'
                      type='text'
                      value={values.habilidade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.habilidade && !errors.habilidade}
                      isInvalid={touched.habilidade && errors.habilidade}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.habilidade}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Status do cargo:</Form.Label>
                    <Form.Select
                      name='status_cargo'
                      value={values.status_cargo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.status_cargo && !errors.status_cargo}
                      isInvalid={touched.status_cargo && errors.status_cargo}
                    >
                      <option value=''>Selecione</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.status_cargo}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Nivel Hierarquico:</Form.Label>
                    <Form.Select
                      name='nivel_hierarquico'
                      value={values.nivel_hierarquico}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nivel_hierarquico && !errors.nivel_hierarquico}
                      isInvalid={touched.nivel_hierarquico && errors.nivel_hierarquico}
                    >
                      <option value=''>Selecione</option>
                      <option value="Jénior">Jénior</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Sênior">Sênior</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.nivel_hierarquico}</Form.Control.Feedback>
                  </Form.Group>

                </Row>

                <Row className='mb-2'>
                <Form.Group as={Col}>
                    <Form.Label>Departamento:</Form.Label>
                    <Form.Control
                      name='departamento'
                      type='text'
                      min={1412}
                      value={values.departamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.departamento && !errors.departamento}
                      isInvalid={touched.departamento && errors.departamento}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.departamento}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Data de Criação:</Form.Label>
                    <Form.Control
                      name='data_criacao'
                      type='date'
                      value={values.data_criacao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.data_criacao && !errors.data_criacao}
                      isInvalid={touched.data_criacao && errors.data_criacao}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.data_criacao}</Form.Control.Feedback>
                  </Form.Group>
                </Row>


                {/* botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/cargos'><FaArrowLeft /> Voltar</Button>
                  <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                </Form.Group>



              </Form>
            )

          }
        }
      </Formik>

    </Pagina>
  )
}