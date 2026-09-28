// B.1 - DEFINIÇÃO DOS DADOS (JSON)

const catalogo = [
    {
        id: 1,
        titulo: "Interestelar",
        tipo: "filme",
        ano: 2014,
        generos: ["ficção científica", "drama", "aventura"],
        nota: 9.5,
        assistido: true
    },
    {
        id: 2,
        titulo: "Breaking Bad",
        tipo: "serie",
        ano: 2008,
        generos: ["drama", "crime"],
        nota: 9.8,
        assistido: true
    },
    {
        id: 3,
        titulo: "O Senhor dos Anéis",
        tipo: "filme",
        ano: 2001,
        generos: ["fantasia", "aventura", "ação"],
        nota: 9.2,
        assistido: false
    },
    {
        id: 4,
        titulo: "Stranger Things",
        tipo: "serie",
        ano: 2016,
        generos: ["ficção científica", "terror", "drama"],
        nota: 8.7,
        assistido: false
    },
    {
        id: 5,
        titulo: "Matrix",
        tipo: "filme",
        ano: 1999,
        generos: ["ação", "ficção científica"],
        nota: 8.9,
        assistido: true
    },
    {
        id: 6,
        titulo: "The Last of Us",
        tipo: "serie",
        ano: 2023,
        generos: ["drama", "aventura"],
        nota: 9.0,
        assistido: false
    }
];


// B.2 - ACESSO E LEITURA DOS DADOS

console.log("========== CATÁLOGO ==========");
console.log(catalogo);

// Título do primeiro item
console.log("Título do primeiro item:", catalogo[0].titulo);

// Ano do último item
console.log("Ano do último item:", catalogo[catalogo.length - 1].ano);

// Segundo gênero do terceiro item
if (catalogo[2].generos.length >= 2) {
    console.log(
        "Segundo gênero do terceiro item:",
        catalogo[2].generos[1]
    );
} else {
    console.log("O terceiro item não possui um segundo gênero.");
}


// A) forEach - Listagem de todos os títulos

console.log("\n========== LISTA DE TÍTULOS ==========");

catalogo.forEach(function(item) {
    console.log(`- [${item.tipo}] ${item.titulo} (${item.ano})`);
});


// B) map - Títulos em caixa alta
const titulosEmCaixaAlta = catalogo.map(function(item) {
    return item.titulo.toUpperCase();
});

console.log("\n========== TÍTULOS EM CAIXA ALTA ==========");
console.log(titulosEmCaixaAlta);


// C) filter - Itens não assistidos
const naoAssistidos = catalogo.filter(function(item) {
    return item.assistido === false;
});

console.log("\n========== NÃO ASSISTIDOS ==========");
console.log("Quantidade de itens não assistidos:", naoAssistidos.length);



// D) find - Primeiro item com nota >= 9
const itemNotaAlta = catalogo.find(function(item) {
    return item.nota >= 9;
});

console.log("\n========== PRIMEIRA NOTA >= 9 ==========");

if (itemNotaAlta) {
    console.log(`Título: ${itemNotaAlta.titulo}`);
    console.log(`Nota: ${itemNotaAlta.nota}`);
} else {
    console.log("Nenhum item possui nota maior ou igual a 9.");
}


// E) reduce - Cálculo das médias

// Soma de todas as notas
const somaNotas = catalogo.reduce(function(total, item) {
    return total + item.nota;
}, 0);

// Média geral
const mediaGeral = somaNotas / catalogo.length;


// Filtra os assistidos e calcula a soma das notas
const assistidos = catalogo.filter(function(item) {
    return item.assistido === true;
});

const somaNotasAssistidos = assistidos.reduce(function(total, item) {
    return total + item.nota;
}, 0);

// Média dos assistidos
const mediaAssistidos = assistidos.length > 0
    ? somaNotasAssistidos / assistidos.length
    : 0;

console.log("\n========== MÉDIAS ==========");
console.log("Média geral:", mediaGeral.toFixed(2));
console.log("Média dos assistidos:", mediaAssistidos.toFixed(2));



// F) some e every - Checagens
const existeAntesDe2000 = catalogo.some(function(item) {
    return item.ano < 2000;
});

const todosTemGenero = catalogo.every(function(item) {
    return item.generos.length >= 1;
});

console.log("\n========== CHECAGENS ==========");
console.log("Existe algum item lançado antes de 2000?", existeAntesDe2000);
console.log("Todos os itens possuem pelo menos 1 gênero?", todosTemGenero);


// B.4 - SAÍDA NA TELA (DOM)
const quantidadeFilmes = catalogo.filter(function(item) {
    return item.tipo === "filme";
}).length;
const quantidadeSeries = catalogo.filter(function(item) {
    return item.tipo === "serie";
}).length;


// Ranking dos 3 maiores valores de nota
const ranking = [...catalogo]
    .sort(function(a, b) {
        return b.nota - a.nota;
    })
    .slice(0, 3);
let rankingHTML = "<ol>";

ranking.forEach(function(item) {
    rankingHTML += `
        <li>
            ${item.titulo} - Nota: ${item.nota.toFixed(1)}
        </li>
    `;
});

rankingHTML += "</ol>";


// Exibição do resumo na div#output
const output = document.getElementById("output");
output.innerHTML = `
    <h2>Resumo do Catálogo</h2>

    <p><strong>Total de itens:</strong> ${catalogo.length}</p>

    <p><strong>Quantidade de filmes:</strong> ${quantidadeFilmes}</p>

    <p><strong>Quantidade de séries:</strong> ${quantidadeSeries}</p>

    <p><strong>Quantidade de não assistidos:</strong> ${naoAssistidos.length}</p>

    <p><strong>Média geral das notas:</strong> ${mediaGeral.toFixed(2)}</p>

    <h3>Top 3 - Maiores notas</h3>
    ${rankingHTML}
`;