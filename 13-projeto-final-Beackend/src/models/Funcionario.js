const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: true
        },
        dataContratacao: {
            type: String,
            required: true
        },
        dataNascimento: {
            type: String,
            required: true
        },
        genero: {
            type: String,
            required: true
        },
         cargo: {
             type: String,
            required: true
        },
        endereco: {
            cep: String,
            uf: String,
            localidade: String,
            bairro: String,
            logradouro: String,
            numero: String,
            complemento: String
        },
       
        foto: {
            type : String,
            require : true
            
        }
    
    },
     { timestamps: true} )

     const Funcionario = mongoose.model('funcionario' , schema)

     module.exports = Funcionario