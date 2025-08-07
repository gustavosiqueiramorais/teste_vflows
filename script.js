// Função para exibir erro no campo
function erroInput(input, message) {
    const formularioItem = input.parentElement;
    const mensagem = formularioItem.querySelector("p");

    mensagem.innerText = message;
    formularioItem.classList.add("error");
}

// Função para limpar mensagens de erro anteriores
function limparErros() {
    const campos = document.querySelectorAll(".conteudo");
    campos.forEach(campo => {
        campo.classList.remove("error");
        const p = campo.querySelector("p");
        if (p) p.innerText = "";
    });
}

// Função para calcular o valor total automaticamente
function calcularValorTotal() {
    const quantidade = document.getElementById("quantidade");
    const valorUnitario = document.getElementById("valorunitario");
    const valorTotal = document.getElementById("valortotal");

    const qtd = parseFloat(quantidade.value.replace(",", ".")) || 0;
    const unitario = parseFloat(valorUnitario.value.replace(",", ".")) || 0;
    const total = qtd * unitario;

    if (!isNaN(total)) {
        valorTotal.value = total.toFixed(2);
    } else {
        valorTotal.value = "";
    }
}

// Aplica máscaras e eventos ao carregar a página
window.addEventListener("DOMContentLoaded", function () {
    // Máscaras
    Inputmask("99.999.999/9999-99").mask(document.getElementById("cnpj"));
    Inputmask("99 - 99999 - 9999").mask(document.getElementById("telefone"));
    Inputmask("99999-999").mask(document.getElementById("cep"));

    // Eventos para calcular o valor total automaticamente
    document.getElementById("quantidade").addEventListener("input", calcularValorTotal);
    document.getElementById("valorunitario").addEventListener("input", calcularValorTotal);
});

// Captura do formulário
const formulario = document.getElementById("formulario");

// Validação e envio do formulário
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Captura dos campos do fornecedor
    const razaosocial = document.getElementById("razaosocial");
    const nomefantasia = document.getElementById("nomefantasia");
    const cnpj = document.getElementById("cnpj");
    const endereco = document.getElementById("endereco");
    const nomecontato = document.getElementById("nomecontato");
    const telefone = document.getElementById("telefone");
    const email = document.getElementById("email");

    limparErros();
    let camposValidos = true;

    // Validações dos campos do fornecedor
    if (razaosocial.value.trim() === "") {
        erroInput(razaosocial, "Campo obrigatório");
        camposValidos = false;
    }

    if (nomefantasia.value.trim() === "") {
        erroInput(nomefantasia, "Campo obrigatório");
        camposValidos = false;
    }

    if (cnpj.value.trim() === "") {
        erroInput(cnpj, "Campo obrigatório");
        camposValidos = false;
    }

    if (endereco.value.trim() === "") {
        erroInput(endereco, "Campo obrigatório");
        camposValidos = false;
    }

    if (nomecontato.value.trim() === "") {
        erroInput(nomecontato, "Campo obrigatório");
        camposValidos = false;
    }

    if (telefone.value.trim() === "") {
        erroInput(telefone, "Campo obrigatório");
        camposValidos = false;
    }

    if (email.value.trim() === "") {
        erroInput(email, "Campo obrigatório");
        camposValidos = false;
    }

    // Se dados do fornecedor estiverem válidos
    if (camposValidos) {
        const fornecedor = {
            razaosocial: razaosocial.value,
            nomefantasia: nomefantasia.value,
            cnpj: cnpj.value,
            endereco: endereco.value,
            contato: {
                nomecontato: nomecontato.value,
                telefone: telefone.value,
                email: email.value
            }
        };

        const json = JSON.stringify(fornecedor, null, 2);
        console.log(json);
    }

    // Captura e validação dos campos do produto
    const descricao = document.getElementById("produto");
    const unidade = document.getElementById("unidademedida");
    const quantidade = document.getElementById("quantidade");
    const valorUnitario = document.getElementById("valorunitario");
    const valorTotal = document.getElementById("valortotal");

    let mensagemErro = "";

    if (descricao.value.trim() === "") {
        mensagemErro += "- O campo Produto é obrigatório.\n";
    }
    if (unidade.value.trim() === "") {
        mensagemErro += "- A Unidade de Medida é obrigatória.\n";
    }
    if (quantidade.value.trim() === "") {
        mensagemErro += "- A Quantidade em Estoque é obrigatória.\n";
    }
    if (valorUnitario.value.trim() === "") {
        mensagemErro += "- O Valor Unitário é obrigatório.\n";
    }
    if (valorTotal.value.trim() === "") {
        mensagemErro += "- O Valor Total é obrigatório (será preenchido automaticamente).\n";
    }

    if (mensagemErro !== "") {
        alert("Preencha os campos obrigatórios do produto:\n\n" + mensagemErro);
    }
});
