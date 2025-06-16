const yup = require('yup')

const schema = yup.object().shape(

    {
          nome: yup
        .string("Campo nome precisa ser um texto")
        .required("Campo nome é obrigatório"),

    descricao: yup
        .string("Campo descrição precisa ser um texto")
        .required("Campo descrição é obrigatório"),

    salario: yup
        .string("Campo salário precisa ser um texto") 
        .required("Campo salário é obrigatório"),

    habilidade: yup
        .string("Campo habilidade precisa ser um texto")
        .required("Campo habilidade é obrigatório"),

    status_cargo: yup
        .string("Campo status precisa ser um texto")
        .required("Campo status é obrigatório"),

    departamento: yup
        .string("Campo departamento precisa ser um texto")
        .required("Campo departamento é obrigatório"),

    nivel_hierarquico: yup
        .string("Campo nível hierárquico precisa ser um texto")
        .required("Campo nível hierárquico é obrigatório"),

    data_criacao: yup
        .date("Data de criação inválida")
        .required("Campo data de criação é obrigatório"),

    }
)

function validarCargo (req,res, next) {
    schema.validate(req.body, {abortEarly: false} ).then(() => next ()).catch(err => res.status(400).json (
        {
            mensagem: "Erro na validação dos Campos",
            erro: err.errors
        }
    ))
}

module.exports = {
    validarCargo
}