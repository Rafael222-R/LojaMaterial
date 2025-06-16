'use client'
import { useState, useEffect } from 'react';
import Pagina from '@/components/Pagina';
import axios from 'axios';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import * as yup from 'yup';

export default function PedidoEditPage(props) {
  const id = props.searchParams.id;
  const router = useRouter();

  const [funcionarios, setFuncionarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [quantidades, setQuantidades] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [funcResponse, cliResponse, prodResponse, pedidoResponse] = await Promise.all([
          axios.get('http://localhost:3000/funcionarios'),
          axios.get('http://localhost:3000/clientes'),
          axios.get('http://localhost:3000/produtos'),
          axios.get(`http://localhost:3000/pedido/${id}`),
        ]);

        setFuncionarios(funcResponse.data);
        setClientes(cliResponse.data);
        setProdutos(prodResponse.data);

        const pedido = pedidoResponse.data;

        // Montar produtosSelecionados com quantidade e preco do pedido
        const initialProdutosSelecionados = pedido.produtos.map(item => ({
          ...item.produto,
          quantidade: item.quantidade,
          preco: item.preco,
        }));

        setProdutosSelecionados(initialProdutosSelecionados);

        // Inicializar quantidades com base nos produtos selecionados
        const initialQuantities = {};
        pedido.produtos.forEach(item => {
          initialQuantities[item.produto._id] = item.quantidade;
        });
        setQuantidades(initialQuantities);

        // Usar valorTotal correto
        setTotal(pedido.valorTotal);

        setInitialValues({
          cliente: pedido.cliente._id,
          funcionario: pedido.funcionario._id,
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [id]);

  const [initialValues, setInitialValues] = useState({
    funcionario: '',
    cliente: '',
  });

  const validationSchema = yup.object().shape({
    funcionario: yup.string().required('Funcionario obrigatório'),
    cliente: yup.string().required('Cliente obrigatório'),
  });

  function atualizarQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade < 1) return; // mínimo 1

    // Atualiza quantidade no estado quantidades
    setQuantidades(prev => {
      const newQuantidades = { ...prev, [produtoId]: novaQuantidade };

      // Atualiza também no produtosSelecionados para recalcular preço total
      setProdutosSelecionados(prevProdutos => {
        return prevProdutos.map(produto => {
          if (produto._id === produtoId) {
            return { ...produto, quantidade: novaQuantidade };
          }
          return produto;
        });
      });

      return newQuantidades;
    });
  }

  function adicionarProduto(produto) {
    const existe = produtosSelecionados.find(p => p._id === produto._id);
    if (existe) {
      // Se já existe, aumenta a quantidade em 1
      atualizarQuantidade(produto._id, quantidades[produto._id] + 1 || 1);
    } else {
      // Adiciona novo produto com quantidade 1 e preço do produto
      setProdutosSelecionados(prev => [...prev, { ...produto, quantidade: 1, preco: produto.preco }]);
      setQuantidades(prev => ({ ...prev, [produto._id]: 1 }));
    }
  }

  // Recalcular total sempre que produtosSelecionados ou quantidades mudarem
  useEffect(() => {
    let soma = 0;
    produtosSelecionados.forEach(produto => {
      const q = quantidades[produto._id] || produto.quantidade || 1;
      soma += q * produto.preco;
    });
    setTotal(soma);
  }, [produtosSelecionados, quantidades]);

  function salvar(values) {
    const pedido = {
      cliente: values.cliente,
      funcionario: values.funcionario,
      produtos: produtosSelecionados.map(produto => ({
        produto: produto._id,
        quantidade: quantidades[produto._id] || produto.quantidade || 1,
        preco: produto.preco,
      })),
      valorTotal: total,
    };

    axios.put(`http://localhost:3000/pedido/${id}`, pedido)
      .then(() => {
        alert('Pedido atualizado com sucesso!');
        setProdutosSelecionados([]);
        router.push('/pedido');
      })
      .catch(err => console.error('Erro ao atualizar pedido:', err));
  }

  return (
    <Pagina titulo={'Editar Pedido'}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Vendedor:</Form.Label>
                <Form.Select
                  name='funcionario'
                  value={values.funcionario}
                  onChange={handleChange}
                  isInvalid={touched.funcionario && !!errors.funcionario}
                >
                  <option value=''>Selecione</option>
                  {funcionarios.map(funcionario => (
                    <option key={funcionario._id} value={funcionario._id}>
                      {funcionario.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  {errors.funcionario}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Cliente:</Form.Label>
                <Form.Select
                  name='cliente'
                  value={values.cliente}
                  onChange={handleChange}
                  isInvalid={touched.cliente && !!errors.cliente}
                >
                  <option value=''>Selecione</option>
                  {clientes.map(cliente => (
                    <option key={cliente._id} value={cliente._id}>
                      {cliente.nome}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>
                  {errors.cliente}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <h4>Total do Pedido: R$ {total.toFixed(2)}</h4>

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
                    <td>R$ {produto.preco.toFixed(2)}</td>
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
                  <th>Preço Unitário</th>
                  <th>Subtotal</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosSelecionados.map((produto, index) => {
                  const q = quantidades[produto._id] || produto.quantidade || 1;
                  const subtotal = (produto.preco * q).toFixed(2);
                  return (
                    <tr key={index}>
                      <td>{produto.nome}</td>
                      <td>{q}</td>
                      <td>R$ {produto.preco.toFixed(2)}</td>
                      <td>R$ {subtotal}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            // Remover produto
                            setProdutosSelecionados(prev => prev.filter(p => p._id !== produto._id));
                            setQuantidades(prev => {
                              const copy = { ...prev };
                              delete copy[produto._id];
                              return copy;
                            });
                          }}
                        >
                          Remover
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <h4>Total do Pedido: R$ {total.toFixed(2)}</h4>

            <Form.Group className='text-end'>
              <Button className='me-2' href='/pedido'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Salvar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
