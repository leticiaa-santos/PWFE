document.querySelectorAll('.toggle-desc').forEach(botao => {
  botao.addEventListener('click', () => {
    const descricao = botao.closest('.exercicio').querySelector('.descricao-ex');
    descricao.classList.toggle('show');

    botao.textContent = descricao.classList.contains('show') ? '▲' : '▼';
  });
});
