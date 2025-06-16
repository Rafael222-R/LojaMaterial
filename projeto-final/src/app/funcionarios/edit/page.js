'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { FaCheck, FaArrowLeft } from 'react-icons/fa'
import * as yup from 'yup'
import ReactInputMask from 'react-input-mask'

export default function funcionarioEditPage(props) {

    console.log(props.searchParams._id)
    const id = props.searchParams._id

    const router = useRouter()

  const [cargos, setCargos] = useState([])



  function salvar(dados) {
    console.log(dados)
    axios.put('http://localhost:3000/funcionarios/'+ id, dados)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

      alert("Funcionario Editado com Sucesso!")
      router.push('/funcionarios')

  }
  useEffect(() => {
    axios.get('http://localhost:3000/cargos')
    .then(res =>{
        console.log(res.data)
        setCargos(res.data)
    })
    .catch(err => {
        console.log(err)
    })
  },[])


  const initialValues = {
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    dataContratacao: '',
    dataNascimento: '',
    genero: '',
    endereco: {
      cep: '',
      uf: '',
      localidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: '',
    },
    cargo: '',
    foto:''

  }

  const validationSchema = yup.object().shape({
    nome: yup
      .string("Campo precisa ser um texto")
      .required("Campo obrigatório"),
    cpf: yup
      .string("Campo precisa ser um texto")
      .required("Campo obrigatório"),
    email: yup
      .string("Campo precisa ser um texto")
      .email("E-mail inválido")
      .required("Campo obrigatório"),
    telefone: yup
      .string("Campo precisa ser um texto")
      .required("Campo obrigatório"),
    dataContratacao: yup
      .date("Data inválida")
      .required("Campo obrigatório"),
    dataNascimento: yup
      .date("Data inválida")
      .required("Campo obrigatório"),
    genero: yup
      .string("Campo precisa ser um texto")
      .required("Campo obrigatório"),
    cargo: yup
      .string("Campo precisa ser um texto")
      .required("Campo obrigatório"),
    foto: yup
      .string("Campo precisa ser um texto")
      .required("Campo obrigatório"),
      endereco: yup.object().shape({
        cep: yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
        uf: yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
        localidade: yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
        bairro: yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
        logradouro:yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
        numero:yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),
        complemento:yup
        .string("Campo precisa ser um texto")
        .required("Campo obrigatório"),

      })

  })



  return (
    <Pagina titulo={'Cadastro de Funcionario'}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, setValues }) => {

            useEffect(() => {

                axios.get('http://localhost:3000/funcionarios/' + id)
                  .then(res => {
                    console.log(res)
                    setValues(res.data)
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }, [])

              
              return (


                <Form onSubmit={handleSubmit}>
  
                  <div className='text-center mb-2'>
                    <h2>Dados Pessoais</h2>
                    <hr />
                  </div>
  
                  <Row className='mb-2'>
                    <Form.Group as={Col}>
                      <Form.Label>Nome:</Form.Label>
                      <Form.Control
                        name='nome'
                        type='text'
                        value={values.nome}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.nome && !errors.nome}
                        isInvalid={touched.nome && !!errors.nome}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>CPF:</Form.Label>
                      <Form.Control as={ReactInputMask}
                      mask={"999.999.999-99"}
                      placeholder='999.999.999-99'
                        name='cpf'
                        type='text'
                        value={values.cpf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.cpf && !errors.cpf}
                        isInvalid={touched.cpf && !!errors.cpf}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>Telefone:</Form.Label>
                      <Form.Control as={ReactInputMask}
                      mask={"(99) 9 9999-9999"}
                      placeholder='(99) 9 9999-9999'
                        name='telefone'
                        type='text'
                        value={values.telefone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.telefone && !errors.telefone}
                        isInvalid={touched.telefone && !!errors.telefone}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                    </Form.Group>
                    
                  </Row>
  
                  <Row className='mb-2'>
                    <Form.Group as={Col}>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>Genero</Form.Label>
                      <Form.Select
                        name='genero'
                        value={values.genero}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.genero && !errors.genero}
                        isInvalid={touched.genero && !!errors.genero}
                      >
                        <option value=''>Selecione</option>
                        <option value='Masculino'>Masculino</option>
                        <option value='Feminino'>Feminino</option>
                        <option value='Nao Binario'>Nao Binario</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.genero}</Form.Control.Feedback>
                    </Form.Group>
  
                    
                  </Row>
  
                  
                  <Row className='mb-2'>
                    <Form.Group as={Col}>
                      <Form.Label>Data de Contratação:</Form.Label>
                      <Form.Control
                        name='dataContratacao'
                        type='date'
                        value={values.dataContratacao}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.dataContratacao && !errors.dataContratacao}
                        isInvalid={touched.dataContratacao && !!errors.dataContratacao}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.dataContratacao}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>Data de Nascimento:</Form.Label>
                      <Form.Control
                        name='dataNascimento'
                        type='date'
                        value={values.dataNascimento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.dataNascimento && !errors.dataNascimento}
                        isInvalid={touched.dataNascimento && !!errors.dataNascimento}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
  
                  <Row className='mb-2'>
                    <Form.Group as={Col}>
                      <Form.Label>Cargo:</Form.Label>
                      <Form.Select
                        name='cargo'
                        value={values.cargo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.cargo && !errors.cargo}
                        isInvalid={touched.cargo && !!errors.cargo}
                      >
                        <option value=''>Selecione</option>
                        {cargos.map(cargo => <option value={cargo._id}>{cargo.nome}</option>)}
  
  
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.cargo}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>Foto:</Form.Label>
                      <Form.Control
                        name='foto'
                        type='string'
                        value={values.foto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.foto && !errors.foto}
                        isInvalid={touched.foto && !!errors.foto}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
                    </Form.Group>
  
  
                  </Row>
  
  
  
                  <div className='text-center mb-2'>
                    <h2>Endereço</h2>
                    <hr />
                  </div>
  
                  <Row className='mb-2'>
                  <Form.Group as={Col}>
                      <Form.Label>Logradouro:</Form.Label>
                      <Form.Control
                        name='endereco.logradouro'
                        type='text'
                        value={values?.endereco?.logradouro}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched?.endereco?.logradouro && !errors?.endereco?.logradouro}
                        isInvalid={touched?.endereco?.logradouro && !!errors?.endereco?.logradouro}
                      />
                      <Form.Control.Feedback type='invalid'>{errors?.endereco?.logradouro}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>Numero:</Form.Label>
                      <Form.Control
                        name='endereco.numero'
                        type='text'
                        value={values?.endereco?.numero}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched?.endereco?.numero && !errors?.endereco?.numero}
                        isInvalid={touched?.endereco?.numero && !!errors?.endereco?.numero}
                      />
                      <Form.Control.Feedback type='invalid'>{errors?.endereco?.numero}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>CEP:</Form.Label>
                      <Form.Control as={ReactInputMask}
                      mask={"99999-999"}
                      placeholder='72275-456'
                        name='endereco.cep'
                        type='text'
                        value={values?.endereco?.cep}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched?.endereco?.cep && !errors?.endereco?.cep}
                        isInvalid={touched?.endereco?.cep && !!errors?.endereco?.cep}
                      />
                      <Form.Control.Feedback type='invalid'>{errors?.endereco?.cep}</Form.Control.Feedback>
                    </Form.Group>
  
                    
                  </Row>
  
                  <Row className='mb-2'>
                    <Form.Group as={Col}>
                      <Form.Label>Cidade:</Form.Label>
                      <Form.Control
                        name='endereco.localidade'
                        type='text'
                        value={values?.endereco?.localidade}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched?.endereco?.localidade && !errors?.endereco?.localidade}
                        isInvalid={touched?.endereco?.localidade && !!errors?.endereco?.localidade}
                      />
                      <Form.Control.Feedback type='invalid'>{errors?.endereco?.localidade}</Form.Control.Feedback>
                    </Form.Group>
  
                    <Form.Group as={Col}>
                      <Form.Label>Bairro:</Form.Label>
                      <Form.Control
                        name='endereco.bairro'
                        type='text'
                        value={values?.endereco?.bairro}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched?.endereco?.bairro && !errors?.endereco?.bairro}
                        isInvalid={touched?.endereco?.bairro && !!errors?.endereco?.bairro}
                      />
                      <Form.Control.Feedback type='invalid'>{errors?.endereco?.bairro}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>UF:</Form.Label>
                      <Form.Control
                        name='endereco.uf'
                        type='text'
                        value={values?.endereco?.uf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched?.endereco?.uf && !errors?.endereco?.uf}
                        isInvalid={touched?.endereco?.uf && !!errors?.endereco?.uf}
                      />
                      <Form.Control.Feedback type='invalid'>{errors?.endereco?.uf}</Form.Control.Feedback>
                    </Form.Group>
  
                  </Row>
           
                  <Row className='mb-2'>
                    <Form.Group as={Col}>
                      <Form.Label>Complemento:</Form.Label>
                      <Form.Control
                        name='endereco.complemento'
                        type='text'
                        value={values?.endereco?.complemento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched?.endereco?.complemento && !errors?.endereco?.complemento}
                        isInvalid={touched?.endereco?.complemento && !!errors?.endereco?.complemento}
                      />
                      <Form.Control.Feedback type='invalid'>{errors?.endereco?.complemento}</Form.Control.Feedback>
                    </Form.Group>
  
  
                  </Row>
  
                  <Form.Group className='text-end'>
                    <Button className='me-2' href='/funcionarios'><FaArrowLeft /> Voltar</Button>
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
  