window.addEventListener("DOMContentLoaded", function () {
  // Recupera os registros do localStorage
  var registros = JSON.parse(localStorage.getItem("registros")) || [];

  // Seleciona a tabela onde os registros serão exibidos
  var tabela = document.getElementById("registros-table");
  var tbody = tabela.querySelector("tbody"); // Seleciona o elemento <tbody>

  // Função para criar as linhas da tabela com base nos registros filtrados
  function criarLinhas(registrosFiltrados) {
    // Limpa as linhas existentes na tabela
    tbody.innerHTML = "";

    // Itera sobre os registros filtrados e cria as linhas da tabela
    registrosFiltrados.forEach(function (registro, index) {
      var row = tbody.insertRow();
      var dataCell = row.insertCell();
      var valorCell = row.insertCell();
      var acaoCell = row.insertCell();
      var dataFormatada = formatarData(registro.data);

      dataCell.textContent = dataFormatada;
      valorCell.textContent = "R$ " + registro.valor;

      // Cria o botão de remover
      var removerBotao = document.createElement("button");
      removerBotao.textContent = "Remover";
      removerBotao.classList.add("remover-button");

      // Adiciona o evento de clique ao botão de remover
      removerBotao.addEventListener("click", function () {
        // Remove a linha da tabela
        tabela.deleteRow(index);

        // Remove o registro do array de registros
        registrosFiltrados.splice(index, 1);

        // Atualiza os registros no localStorage
        localStorage.setItem("registros", JSON.stringify(registrosFiltrados));

        // Atualiza as linhas da tabela com base nos registros filtrados atualizados
        criarLinhas(registrosFiltrados);
      });

      // Adiciona o botão de remover à célula de ação
      acaoCell.appendChild(removerBotao);
    });
  }

  // Função para formatar a data no estilo brasileiro (dd/mm/aaaa)
  function formatarData(data) {
    var partes = data.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  // Função para filtrar os registros com base no valor do campo de busca
  function filtrarRegistros() {
    var filtro = document.getElementById("search-input").value.toLowerCase();
    var registrosFiltrados = registros.filter(function (registro) {
      return (
        registro.data.toLowerCase().includes(filtro) ||
        registro.valor.toLowerCase().includes(filtro)
      );
    });

    // Cria as linhas da tabela com base nos registros filtrados
    criarLinhas(registrosFiltrados);
  }

  // Adiciona o evento de digitação no campo de busca
  var searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keyup", filtrarRegistros);

  // Inicialmente, cria as linhas da tabela com base em todos os registros
  criarLinhas(registros);
});
