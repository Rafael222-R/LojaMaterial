'use client'
import Pagina from '@/components/Pagina'
import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button, Table } from 'react-bootstrap'
import { FaCheck, FaArrowLeft } from 'react-icons/fa'
import * as yup from 'yup'

export default function pedidoFormPage() {

    const router = useRouter()

    const [funcionarios, setFuncionarios] = useState([])
    const [clientes, setClientes] = useState([])
    const [produtos, setProdutos] = useState([])
    const [produtosSelecionados, setProdutosSelecionados] = useState([]); // Para armazenar os produtos do pedido
    const [quantidades, setQuantidades] = useState({}); // Novo estado para gerenciar quantidades individualmente
    const [valorTotal, setTotal] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3000/funcionarios')
            .then(res => setFuncionarios(res.data))
            .catch(err => console.error(err))

        axios.get('http://localhost:3000/clientes')
            .then(res => setClientes(res.data))
            .catch(err => console.error(err))

        axios.get('http://localhost:3000/produtos')
            .then(res => setProdutos(res.data))
            .catch(err => console.error(err))
    }, [])

    // Função para atualizar a quantidade de um produto específico
    function atualizarQuantidade(produtoId, quantidade) {
        setQuantidades(prevQuantidades => ({
            ...prevQuantidades,
            [produtoId]: quantidade
        }));
    }

    // Função para adicionar um produto e atualizar o valorTotal
    function adicionarProduto(produto) {
        const quantidade = quantidades[produto._id] || 1; // Pega a quantidade do estado ou usa 1 como padrão
        const novoProduto = { ...produto, quantidade };
        setProdutosSelecionados(prevProdutos => [...prevProdutos, novoProduto]);

        // Calcula o novo valorTotal com o produto adicionado
        setTotal(prevTotal => prevTotal + (produto.preco * quantidade));
    }

    

    // Função para salvar o pedido
    function salvar(values) {
         if (produtosSelecionados.length === 0) {
        alert("Adicione ao menos um produto ao pedido antes de salvar.");
        return;
    }

    if (valorTotal <= 0) {
        alert("O valor total do pedido deve ser maior que zero.");
        return;
    }
        const pedido = {
            cliente: values.cliente,
            funcionario: values.funcionario,
            produtos: produtosSelecionados.map(produto => ({
                produto: produto._id,
                quantidade: produto.quantidade,
                preco: produto.preco
            })),
            valorTotal
        };

        console.log('Pedido a ser enviado:', pedido);  

        axios.post('http://localhost:3000/pedido', pedido)
            .then(() => {
                alert("Pedido salvo com sucesso!");
                setProdutosSelecionados([]);
                setTotal(0); 
                router.push('/pedido');
            })
            .catch(err => console.error("Erro ao salvar pedido:", err));
    }

    const initialValues = {
        funcionario: '',
        cliente: ''
    }

    const validationSchema = yup.object().shape({
        funcionario: yup.string().required("Funcionario obrigatório"),
        cliente: yup.string().required("Cliente obrigatório")
    })

    return (
        <Pagina titulo={'Pedido'}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => salvar(values)}
            >
                {({ values, errors, touched, handleChange, handleSubmit, handleBlur }) => (
                    <Form onSubmit={handleSubmit}>

                        <Row className='mb-2'>
                            <Form.Group as={Col}>
                                <Form.Label>Vendedor:</Form.Label>
                                <Form.Select
                                    name='funcionario'
                                    value={values.funcionario}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.funcionario && !errors.funcionario}
                                    isInvalid={touched.funcionario && !!errors.funcionario}
                                >
                                    <option value=''>Selecione</option>
                                    {funcionarios.map(funcionario => (
                                        <option key={funcionario._id} value={funcionario._id}>
                                            {funcionario.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.funcionario}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Cliente:</Form.Label>
                                <Form.Select
                                    name='cliente'
                                    value={values.cliente}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isValid={touched.cliente && !errors.cliente}
                                    isInvalid={touched.cliente && !!errors.cliente}
                                >
                                    <option value=''>Selecione</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente._id} value={cliente._id}>
                                            {cliente.nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type='invalid'>{errors.cliente}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <h4>Total do Pedido: R$ {valorTotal.toFixed(2)}</h4> 

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Preço</th>
                                    <th>Quantidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map(produto => (
                                    <tr key={produto._id}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.preco}</td>
                                        <td>
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantidades[produto._id] || 1}
                                                onChange={(e) => atualizarQuantidade(produto._id, Number(e.target.value))}
                                            />
                                        </td>
                                        <td>
                                            <Button onClick={() => adicionarProduto(produto)}>Adicionar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <h3>Produtos Selecionados</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Quantidade</th>
                                    <th>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtosSelecionados.map((produto, index) => (
                                    <tr key={index}>
                                        <td>{produto.nome}</td>
                                        <td>{produto.quantidade}</td>
                                        <td>{produto.preco}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <h4>Total do Pedido: R$ {valorTotal.toFixed(2)}</h4> 

                        <Form.Group className='text-end'>
                            <Button className='me-2' href='/pedido'><FaArrowLeft /> Voltar</Button>
                            <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Pagina>
    );
}
