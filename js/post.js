const form = document.querySelector("#formulario-livro");
const resposta = document.querySelector("#resposta");

const apiKey = 'cv_WOku_lVT5TqWMdQx3wRKwROOM0kvWEj20faOdKCtIFgl727pnq08oMK-X0gRsrWW';
const apiUrl = "https://api-ds.codeverse.dev.br/api/livros";

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const dados = new FormData(form);

    const livro = {
        title: dados.get("title"),
        autor: dados.get("autor"),
        genero: dados.get("genero"),
        ano_publicacao: dados.get("ano_publicacao"),
        numero_paginas: dados.get("numero_paginas"),
        imageUrl: dados.get("imageUrl") || null,
    };
    resposta.textContent = "Enviando livro para a API..."

    try {
        const respostaApi = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "x-api-key": apiKey,
            },

            body: JSON.stringify(livro),
        });

        const texto = await respostaApi.text();
        let resultado;

        try {
            resultado = texto ? JSON.parse(texto) : {};
        } catch (error) {
            resultado = error;
            return;
        }

        if (respostaApi.ok) {
            resposta.textContent = `${resultado.title} foi cadastrado com sucesso.`;
            form.reset();
        }
    } catch (error) {
        console.error(error);
    }
})
