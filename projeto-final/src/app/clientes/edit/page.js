'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Form, Row, Col , Button} from 'react-bootstrap'
import { FaCheck,FaArrowLeft } from 'react-icons/fa'
import ReactInputMask from 'react-input-mask'
import * as yup from 'yup'


export default function clientesFormPage(props) {

    console.log(props.searchParams._id)
    const id = props.searchParams._id

    const router = useRouter()

    function salvar(dados) {
        console.log(dados)
        axios.put('http://localhost:3000/clientes/' + id, dados)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    alert('Cliente Editado com Sucesso!')
    router.push('/clientes')

    }

   

    const initialValues = {

        nome: '',
        cpf: '',
        rg: '',
        telefone: '',
        email: '',
        dataNascimento:'',
        status_cliente:'',
        endereco: {
            cep: '',
            uf: '',
            localidade: '',
            bairro: '',
            logradouro: '',
            numero: '',
            complemento: '',
        }
        
    }

    const validationSchema = yup.object().shape({
        nome: yup
            .string("Campo precisa ser um texto")
            .required("Campo obrigatório"),
        cpf: yup
            .string("Campo precisa ser um texto")
            .required("Campo obrigatório"),
        telefone: yup
            .string("Campo precisa ser um texto")
            .required("Campo obrigatório"),
            email: yup
            .string("Campo precisa ser um texto")
            .required("Email obrigatório"),
            dataNascimento: yup
            .date("Campo precisa ser um texto")
            .required("Email obrigatório"),
            status_cliente: yup
            .string("Campo precisa ser um texto")
            .required("Email obrigatório"),
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
        <Pagina titulo={'Edição de clientes'}>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={salvar}

            >
                {
                    ({ values, errors, touched, handleChange, handleSubmit, handleBlur , setValues}) => {

                        useEffect(() => {
                            axios.get('http://localhost:3000/clientes/' + id)
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
                                    <hr/>
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
                                            isInvalid={touched.nome && errors.nome}
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
                                            isInvalid={touched.cpf && errors.cpf}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.cpf}</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>RG:</Form.Label>
                                        <Form.Control as={ReactInputMask}
                                        mask={"9.999.999"}
                                        placeholder='1.234.567'
                                            name='rg'
                                            type='text'
                                            value={values.rg}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.rg && !errors.rg}
                                            isInvalid={touched.rg && errors.rg}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.rg}</Form.Control.Feedback>
                                    </Form.Group>


                                </Row>

                                <Row className='mb-2'>
                                    <Form.Group as={Col}>
                                        <Form.Label>Telefone:</Form.Label>
                                        <Form.Control as={ReactInputMask}
                                        mask={"(99) 9 9999-9999"}
                                        placeholder='(61) 9 9999-9999'
                                            name='telefone'
                                            type='text'
                                            value={values.telefone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.telefone && !errors.telefone}
                                            isInvalid={touched.telefone && errors.telefone}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            name='email'
                                            type='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={touched.email && errors.email}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                                    </Form.Group>


                                </Row>
                                <Row className='mb-2'>
                                    <Form.Group as={Col}>
                                        <Form.Label>Data de Nascimento:</Form.Label>
                                        <Form.Control
                                            name='dataNascimento'
                                            type='date'
                                            value={values.dataNascimento}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.dataNascimento && !errors.dataNascimento}
                                            isInvalid={touched.dataNascimento && errors.dataNascimento}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Status do cliente:</Form.Label>
                                        <Form.Select
                                            name='status_cliente'
                                            value={values.status_cliente}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.status_cliente && !errors.status_cliente}
                                            isInvalid={touched.status_cliente && errors.status_cliente}
                                            >
                                                <option value=''>Selecione</option>
                                                <option value='Ativo'>Ativo</option>
                                                <option value='Inativo'>Inativo</option>
                                            </Form.Select>
                                        <Form.Control.Feedback type='invalid'>{errors.status_cliente}</Form.Control.Feedback>
                                    </Form.Group>


                                </Row>
                                <div className='text-center mb-2'>  
                                    <h2>Endereço</h2>
                                    <hr/>
                                </div>

                                <Row className='mb-2'>
                                    <Form.Group as={Col}>
                                        <Form.Label>Cep:</Form.Label>
                                        <Form.Control as={ReactInputMask}
                                        mask={"99999-999"}
                                        placeholder='99999-999'
                                            name='endereco.cep'
                                            type='text'
                                            value={values?.endereco?.cep}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched?.endereco?.cep && !errors?.endereco?.cep}
                                            isInvalid={touched?.endereco?.cep && errors?.endereco?.cep}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors?.endereco?.cep}</Form.Control.Feedback>
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
                                            isInvalid={touched?.endereco?.uf && errors?.endereco?.uf}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors?.endereco?.uf}</Form.Control.Feedback>
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
                                            isInvalid={touched?.endereco?.localidade && errors?.endereco?.localidade}
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
                                            isInvalid={touched?.endereco?.bairro && errors?.endereco?.bairro}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors?.endereco?.bairro}</Form.Control.Feedback>
                                    </Form.Group>


                                </Row>
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
                                            isInvalid={touched?.endereco?.logradouro && errors?.endereco?.logradouro}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors?.endereco?.logradouro}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Número:</Form.Label>
                                        <Form.Control
                                            name='endereco.numero'
                                            type='text'
                                            value={values?.endereco?.numero}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched?.endereco?.numero && !errors?.endereco?.numero}
                                            isInvalid={touched?.endereco?.numero && errors?.endereco?.numero}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors?.endereco?.numero}</Form.Control.Feedback>
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
                                            isInvalid={touched?.endereco?.complemento && errors?.endereco?.complemento}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors?.endereco?.complemento}</Form.Control.Feedback>
                                    </Form.Group>

                                
                                </Row>
                                <Form.Group className='text-end'>
                                    <Button className='me-2' href='/clientes'><FaArrowLeft /> Voltar</Button>
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
