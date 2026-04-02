let total = 0;

const botoes = document.querySelectorAll('.adicionar');

botoes.forEach((botao) => {
    botao.addEventListener('click', () => {
        const produto = botao.parentElement;
        const nome = produto.querySelector('h3').textContent;
        const precoTexto = produto.querySelector('.preco').dataset.valor;

        const valor = parseFloat(precoTexto);

        if (botao.classList.contains('adicionado')) {
            botao.classList.remove('adicionado');
            botao.textContent = 'Adicionar';
            produto.classList.remove('selecionado');
            total -= valor;
            removerItem(nome);
        } else {
            botao.classList.add('adicionado');
            botao.textContent = 'Remover';
            produto.classList.add('selecionado');
            total += valor;
            adicionarItem(nome, valor);
        }

        atualizarTotal();
    });
});

const adicionarItem = (nome, valor) => {
    const lista = document.getElementById('lista-pedido');
    const item = document.createElement('li');
    item.id = 'item-' + nome;
    item.innerHTML = `<span>${nome}</span><span>${formatarMoeda(valor)}</span>`;
    lista.appendChild(item);
};

const removerItem = (nome) => {
    const item = document.getElementById('item-' + nome);
    if (item) {
        item.remove();
    }
};

const atualizarTotal = () => {
    document.getElementById('total').textContent = 'Total: ' + formatarMoeda(total);
};

const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

document.getElementById('btn-limpar').addEventListener('click', () => {
    total = 0;
    document.getElementById('lista-pedido').innerHTML = '';
    atualizarTotal();

    botoes.forEach((botao) => {
        botao.classList.remove('adicionado');
        botao.textContent = 'Adicionar';
        botao.parentElement.classList.remove('selecionado');
    });
});
