//register

document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio do formulário

    var formData = new FormData(this);
    var registro = {
      data: formData.get("data"),
      valor: formData.get("valor")
    };

    // Recupera os registros existentes do localStorage
    var registrosAntigos = JSON.parse(localStorage.getItem("registros")) || [];

    // Adiciona o novo registro aos registros existentes
    registrosAntigos.push(registro);

    // Salva os registros atualizados no localStorage
    localStorage.setItem("registros", JSON.stringify(registrosAntigos));

    // Redireciona para a página de consumo (consumption.html)
    window.location.href = "./consumption.html";
  });


  










