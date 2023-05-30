window.addEventListener("DOMContentLoaded", function () {
  // Recupera os registros do localStorage
  var registros = JSON.parse(localStorage.getItem("registros")) || [];

  // Calcula a média de consumo
  var totalConsumo = 0;
  var maiorData = null;
  var menorData = null;
  var maiorConsumo = null;
  var menorConsumo = null;

  registros.forEach(function (registro) {
    var consumo = Number(registro.valor.replace(",", ".")); // Converter para número considerando o separador decimal
    totalConsumo += consumo;

    var dataRegistro = new Date(registro.data);

    if (!maiorData || consumo > maiorConsumo) {
      maiorData = dataRegistro;
      maiorConsumo = consumo;
    }

    if (!menorData || consumo < menorConsumo) {
      menorData = dataRegistro;
      menorConsumo = consumo;
    }
  });

  var mediaConsumo = totalConsumo / registros.length;

  // Calcula a variação percentual
  var primeiroValor = Number(registros[0].valor.replace(",", "."));
  var ultimoValor = Number(registros[registros.length - 1].valor.replace(",", "."));
  var variacaoPercentual = ((ultimoValor - primeiroValor) / primeiroValor) * 100;

  // Atualiza os valores nos cards no index.html
  document.getElementById("media-consumo").textContent = "R$ " + mediaConsumo.toFixed(2);
  document.getElementById("total-consumo").textContent = "R$ " + totalConsumo.toFixed(2);
  document.getElementById("maior-data").textContent = formatarData(maiorData);
  document.getElementById("menor-data").textContent = formatarData(menorData);
  document.getElementById("variacao-percentual").textContent = variacaoPercentual.toFixed(2) + "%";

  // Função para formatar a data no estilo brasileiro (dd/mm/aaaa)
  function formatarData(data) {
    if (data) {
      var dia = data.getUTCDate().toString().padStart(2, "0");
      var mes = (data.getUTCMonth() + 1).toString().padStart(2, "0");
      var ano = data.getUTCFullYear();
      return dia + "/" + mes + "/" + ano;
    }
    return "";
  }
});
