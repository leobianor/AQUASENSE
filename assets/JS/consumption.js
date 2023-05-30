window.addEventListener("DOMContentLoaded", function () {
  // Recupera os registros do localStorage
  var registros = JSON.parse(localStorage.getItem("registros")) || [];

  // Seleciona a tabela onde os registros serão exibidos
  var tabela = document.getElementById("registros-table");
  var tbody = tabela.querySelector("tbody"); // Seleciona o elemento <tbody>

  // Define as configurações de ordenação inicial
  var sortColumn = "data";
  var sortOrder = "asc";

  // Função para criar as linhas da tabela com base nos registros filtrados
  function criarLinhas(registrosFiltrados) {
    // Ordena os registros com base na coluna e ordem atual
    registrosFiltrados.sort(function (a, b) {
      if (sortColumn === "data") {
        return sortOrder === "asc" ? new Date(a.data) - new Date(b.data) : new Date(b.data) - new Date(a.data);
      } else if (sortColumn === "valor") {
        var valorA = parseFloat(a.valor.replace("R$ ", "").replace(",", "."));
        var valorB = parseFloat(b.valor.replace("R$ ", "").replace(",", "."));

        return sortOrder === "asc" ? valorA - valorB : valorB - valorA;
      }

      return 0;
    });

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

  // Função para alterar a ordem de ordenação
  function toggleOrder(column) {
    if (column === sortColumn) {
      sortOrder = sortOrder === "asc" ? "desc" : "asc";
    } else {
      sortColumn = column;
      sortOrder = "asc";
    }

    // Atualiza as linhas da tabela com base nos registros filtrados atualizados
    criarLinhas(registros);
  }

  // Adiciona o evento de clique aos botões de ordenação
  var orderButtons = document.querySelectorAll(".order-button");
  orderButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var column = button.getAttribute("data-column");
      toggleOrder(column);
    });
  });

  // Função para filtrar os registros com base no valor do campo de busca
  function filtrarRegistros() {
    var filtro = document.getElementById("search-input").value.toLowerCase();
    var registrosFiltrados = registros.filter(function (registro) {
      var dataFormatada = formatarData(registro.data).toLowerCase();
      return (
        dataFormatada.includes(filtro) ||
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

  // Verifica se o número total de registros é maior ou igual a 36 e remove o primeiro registro se necessário
  if (registros.length >= 6) {
    registros.splice(0, 1);
    localStorage.setItem("registros", JSON.stringify(registros));
  }

  // Inicialmente, cria as linhas da tabela com base em todos os registros
  criarLinhas(registros);
});
