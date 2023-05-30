window.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".form");
    var inputEmail = document.querySelector(".input");
    var textareaMensagem = document.querySelector("textarea");
    var buttonEnviar = document.querySelector("button");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita o envio do formulário
  
      var email = inputEmail.value;
      var mensagem = textareaMensagem.value;
  
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
      // para o servidor ou realizar qualquer outra ação desejada
  
      // Exemplo de exibição dos dados no console
      console.log("Email:", email);
      console.log("Mensagem:", mensagem);
  
      // Limpa os campos do formulário após o envio
      inputEmail.value = "";
      textareaMensagem.value = "";
    });
  });
  