//register
document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio do formulário

  var formData = new FormData(this);
  var registro = {
    data: formData.get("data"),
    valor: formData.get("valor")
  };

  // Verifica se o valor é positivo
  if (registro.valor < 0) {
    alert("O valor não pode ser negativo.");
    return; // Impede o envio do formulário
  }

  // Recupera os registros existentes do localStorage
  var registrosAntigos = JSON.parse(localStorage.getItem("registros")) || [];

  // Verifica se a data já existe nos registros
  var dataExistente = registrosAntigos.find(function (r) {
    return r.data === registro.data;
  });

  if (dataExistente) {
    alert("Essa data já está cadastrada.");
    return; // Impede o envio do formulário
  }

  // Adiciona o novo registro aos registros existentes
  registrosAntigos.push(registro);

  // Salva os registros atualizados no localStorage
  localStorage.setItem("registros", JSON.stringify(registrosAntigos));

  // Redireciona para a página de consumo (consumption.html)
  window.location.href = "./consumption.html";
});
