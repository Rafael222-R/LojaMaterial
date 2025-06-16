const Pedido = require('../models/Pedido')
const Produto = require('../models/Produtos')

async function criar(req, res) {
  try {
    const { funcionario, cliente, produtos } = req.body;

    let total = 0;
    const produtosAtualizados = [];

    for (const item of produtos) {
      const produtoDB = await Produto.findById(item.produto);
      if (produtoDB) {
        const preco = produtoDB.preco;
        total += item.quantidade * preco;

        produtosAtualizados.push({
          produto: item.produto,
          quantidade: item.quantidade,
          preco: preco,
        });
      } else {
        return res.status(400).json({ erro: `Produto não encontrado: ${item.produto}` });
      }
    }

    const pedido = new Pedido({
      funcionario,
      cliente,
      produtos: produtosAtualizados,
      valorTotal: total,
    });

    console.log('Pedido a ser enviado:', pedido);

    const pedidoCriado = await pedido.save();
    res.status(201).json(pedidoCriado);

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ erro: 'Erro ao criar pedido.' });
  }
}

async function buscarTodos(req, res) {
  const pedidos = await Pedido.find()
    .populate({ path: 'funcionario', select: 'nome' })
    .populate({ path: 'cliente', select: 'nome' })
    .populate({ path: 'produtos.produto', select: 'nome' }); // **corrigido**

  res.json(pedidos);
}

async function buscarPorID(req, res) {
  const pedido = await Pedido.findById(req.params.id)
    .populate({ path: 'funcionario', select: 'nome' })
    .populate({ path: 'cliente', select: 'nome' })
    .populate({ path: 'produtos.produto', select: 'nome' }); // **adicionado**

  if (pedido) {
    res.json(pedido);
  } else {
    res.status(404).json({ mensagem: "Pedido não encontrado!" });
  }
}

async function atualizar(req, res) {
  const { funcionario, cliente, produtos } = req.body; // **mudei de items para produtos**

  let valorTotal = 0;
  for (const item of produtos) {
    const produtoDB = await Produto.findById(item.produto);
    if (produtoDB) {
      valorTotal += item.quantidade * produtoDB.preco;
    }
  }

  const pedidoAtualizado = await Pedido.findByIdAndUpdate(
    req.params.id,
    { funcionario, cliente, produtos, valorTotal }, // **produtos aqui**
    { new: true }
  );

  if (pedidoAtualizado) {
    res.json({
      mensagem: "Pedido atualizado com sucesso!",
      pedidoAtualizado,
    });
  } else {
    res.status(404).json({ mensagem: "Pedido não encontrado!" });
  }
}

async function excluir(req, res) {
  const pedidoExcluido = await Pedido.findByIdAndDelete(req.params.id);
  if (pedidoExcluido) {
    res.json({
      mensagem: "Pedido excluído com sucesso!",
      pedidoExcluido,
    });
  } else {
    res.status(404).json({ mensagem: "Pedido não encontrado!" });
  }
}

module.exports = {
  buscarTodos,
  buscarPorID,
  criar,
  atualizar,
  excluir,
};
