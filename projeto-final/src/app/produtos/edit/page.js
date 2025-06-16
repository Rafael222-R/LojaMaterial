'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import * as Yup from 'yup'
import { useEffect } from 'react'
import ReactInputMask from 'react-input-mask'

export default function ProdutosformPage(props) {

    
    const router = useRouter()

    console.log(props.searchParams.id)
    const id = props.searchParams.id


    function salvar(dados) {
        console.log(dados)
        axios.put('http://localhost:3000/produtos/' + id, dados)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })


        alert("Produto Editado com Sucesso!")
        router.push('/produtos')

    }


    const initialValues = {
        nome: '',
        descricao: '',
        codigo_barras: '',
        peso: '',
        preco: '',
        categoria: '',
        fabricante: '',
        foto: ''

    }

    const validationSchema = Yup.object().shape({
        nome: Yup
            .string("Campo nome precisa ser um texto")
            .required("Campo nome é Obrigatorio"),
        descricao: Yup
            .string("Campo nome precisa ser um texto")
            .required("Campo nome é Obrigatorio"),
        codigo_barras: Yup
            .string("Campo nome precisa ser um texto")
            .min(12, "O codigo de Barras deve conter no minimo 12 digitos")
            .required("Campo Codigo de Barras é Obrigatorio"),
        peso: Yup
            .number("Campo salario precisa ser numerico")
            .required("Campo peso é Obrigatorio"),
        preco: Yup
            .number("Campo salario precisa ser numerico")
            .required("Campo peso é Obrigatorio"),
        categoria: Yup
            .string("Campo nome precisa ser um texto")
            .required("Campo nome é Obrigatorio"),
        fabricante: Yup
            .string("Campo nome precisa ser um texto")
            .required("Campo nome é Obrigatorio"),
        foto: Yup
            .string("Campo nome precisa ser um texto")
            .required("Campo nome é Obrigatorio"),

    })

    return (
        <Pagina titulo={'Edição de Produtos'}>

            <Formik

                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={salvar}

            >{
                    ({ values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset, setValues }) => {


                        useEffect(() => {
                            axios.get('http://localhost:3000/produtos/' + id)
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
                                        <Form.Label>Descricao:</Form.Label>
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
                                        <Form.Label>Codigo de Barras:</Form.Label>
                                        <Form.Control as={ReactInputMask}
                                            mask={'999999999999'}
                                            placeholder='999999999999'
                                            name='codigo_barras'                                          
                                            min={12}
                                            value={values.codigo_barras}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.codigo_barras && !errors.codigo_barras}
                                            isInvalid={touched.codigo_barras && errors.codigo_barras}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.codigo_barras}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Peso:</Form.Label>
                                        <Form.Control as={ReactInputMask}
                                            mask={'99.99'}
                                            placeholder='99.99'
                                            name='peso'
                                            type='text'
                                            value={values.peso}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.peso && !errors.peso}
                                            isInvalid={touched.peso && errors.peso}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.peso}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Preço:</Form.Label>
                                        <Form.Control as={ReactInputMask}
                                            mask={'99.99'}
                                            placeholder='99.99'
                                            name='preco'
                                            type='text'
                                            value={values.preco}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.preco && !errors.preco}
                                            isInvalid={touched.preco && errors.preco}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
                                    </Form.Group>

                                </Row>

                                <Row className='mb-2'>


                                    <Form.Group as={Col}>
                                        <Form.Label>Categoria:</Form.Label>
                                        <Form.Control
                                            name='categoria'
                                            type='text'
                                            value={values.categoria}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.categoria && !errors.categoria}
                                            isInvalid={touched.categoria && errors.categoria}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.categoria}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Fabricante:</Form.Label>
                                        <Form.Control
                                            name='fabricante'
                                            type='text'
                                            value={values.fabricante}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.fabricante && !errors.fabricante}
                                            isInvalid={touched.fabricante && errors.fabricante}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.fabricante}</Form.Control.Feedback>
                                    </Form.Group>


                                </Row>
                                <Row className='mb-2'>
                                    <Form.Group as={Col}>
                                        <Form.Label>Foto:</Form.Label>
                                        <Form.Control
                                            name='foto'
                                            type='text'
                                            value={values.foto}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isValid={touched.foto && !errors.foto}
                                            isInvalid={touched.foto && errors.foto}
                                        />
                                        <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>


                                <Form.Group className='text-end'>
                                    <Button className='me-2' href='/produtos'><FaArrowLeft /> Voltar</Button>
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