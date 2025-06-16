'use client'
import React from 'react'
import { Container, Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default function Pagina({ titulo, children }) {
    return (

        <>
            <Navbar  bg="primary" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/"><img
          src=" data:image/png;base64,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 "            // Imagem da logo
          alt="MinhaMarca Logo"   
          width="30"              
          height="30"           
          className="d-inline-block align-top"
        />
        {' '}Meu Trabalho </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/produtos">Produtos</Nav.Link>
                            <Nav.Link href="/cargos">Cargo</Nav.Link>
                            <Nav.Link href="/funcionarios">Funcionario</Nav.Link>
                            <Nav.Link href="/clientes">Clientes</Nav.Link>
                            <Nav.Link href="/pedido">Pedidos</Nav.Link>
                           
                        </Nav>
                        <Form className="d-flex">
                            
                            <Button variant="outline-success" href='/pedido/form'> Carrinho de Compras</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="bg-secondary text-center text-white py-2">
               <h1> {titulo} </h1>
            </div>

            <Container className='mt-2 '>
                {children}
            </Container>



        </>
    )
}
