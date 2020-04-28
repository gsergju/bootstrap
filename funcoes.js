// funcao so para apagar a mensagem ao clicar nos campos de login/senha
function apagaMsg(){
    document.getElementById("erroMsg").innerHTML = "";  
}

// vou criar uma funcao para autenticar (chamada pelo botao)
function autentica(){
    // recupero os valores digitados nos campos de INPUT
    var login = document.getElementById("txtLogin").value;
    var senha = document.getElementById("txtSenha").value;

    // monto um Objeto JSON com esses dados (para enviar para o BAckend JAVA)
    var msgBody = {
         racf: login,
         senha: senha
    }
    
    console.log(msgBody);

    // tambem preciso montar um cabecalho para indicar o metodo, o corpo e os headers
    var cabecalho = {
        method: 'POST',
        body: JSON.stringify(msgBody),
        headers: {
                'Content-Type': 'application/json'
        }
    }
    var usuario;

    // AJAX - Asynchronous Javascript and XML
    // vou invocar o BackEnd atraves do FETCH
    // ele recebe 2 parametros (o endpoint e o cabecalho) 
    // se eu nao passar cabecalho - o padrao do FETCH eh requisicao GET
    fetch("http://localhost:8080/login/racf",cabecalho)
        .then(res => res.json() )  // se deu certo, pego a resposta e converto para JSON
        .then(res => {             // se deu certo a conversao, armazendo o objeto (em forma de STRING no LocalStorage)
            usuario = res;         // localStorage eh um tipo de "banco de dados" dentro do browser (funciona como um HASH)
            console.log(usuario);
            localStorage.setItem("user",JSON.stringify(usuario));
            window.location = "profile.html"; // ai redireciono para a pagina de perfil   
        })
        .catch(err=>{          // se deu erro (usuario invalido), uso CSS para mostrar a mensagem de erro
            console.log(err);
            document.getElementById("erroMsg").innerHTML="Usuario ou senha INVALIDOS";
        });
}