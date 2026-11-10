const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-livros");
const modelo = document.querySelector("#modelo-livro")
const apiKey = "cv_WOku_lVT5TqWMdQx3wRKwROOM0kvWEj20faOdKCtIFgl727pnq08oMK-X0gRsrWW";
const apiUrl = "https://api-ds.codeverse.dev.br/api/livros";

async function buscarLivros() {
    resposta.textContent = "Carregando livros..."

    try {
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers: {"x-api-key": apiKey}
        });

        if(!retorno.ok) {
            throw new Error("Não foi possivel buscar os livros")
        }
        const resultado = await retorno.json();

        for (const livro of resultado.data) {
            const card = modelo.content.cloneNode(true);

            card.querySelector(".autor").textContent = livro.title;
            card.querySelector(".genero").textContent = livro.genero;
            card.querySelector(".ano_publicacao").textContent = livro.ano_publicacao;
            card.querySelector(".numero_paginas").textContent = livro.numero_paginas;
            
            const imagem = card.querySelector("img");

            if(livro.imageUrl){
                imagem.src = livro.imageUrl;
                imagem.alt = livro.title;
            } else {
                imagem.remove()
            }

            lista.appendChild(card);
        }

        resposta.textContent="";

    } catch (error) {
        resposta.textContent = "Não foi possivel carregar os livros. Tente novamente!"
        console.error(error);
    }
}

buscarLivros();