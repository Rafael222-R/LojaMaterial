const mongoose = require("mongoose");
const { number } = require("yup");

const schema = new mongoose.Schema(
  {
  funcionario: {
      type: mongoose.Types.ObjectId,
      ref: 'funcionario',
      required: true,
    },
    cliente: {
      type: mongoose.Types.ObjectId,
      ref: 'cliente',
      required: true,
    },
    produtos: [
      {
        produto: {
          type: mongoose.Types.ObjectId,
          ref: 'produto',
          required: true,
        },
        quantidade: {
          type: Number,
          required: true,
          min: 1,
        },
        preco: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    valorTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Pedido = mongoose.model("pedido", schema);

module.exports = Pedido;
