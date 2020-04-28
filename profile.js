var fragmentoNome  = '{{NOME}}'; 
var fragmentoRacf  = '{{RACF}}';
var fragmentoEmail = '{{EMAIL}}';
var fragmentoSetor = '{{SETOR}}';
                      
var fragmentoFoto   = '<img src="{{LINKFOTO}}" width="100%">';
var fragmentoPedido = '<div class="col-12">'+
                         ' {{DATAPEDIDO}} {{NUMPEDIDO}} {{OBSERVACOES}}'+
                      '</div>';


function novoPedido(){
    window.location = "novopedido.html";
}
// este metodo eh um dos mais trabalhosos, pois ele pega a informacao do usuario
// e tem que preencher praticamente a pagina toda.
function carregaUser(){
    var userStr = localStorage.getItem("user");
    if (!userStr){  // se nao tiver isso no localStorage, redireciona para o index (login)
        window.location = "index.html";
    }
    else{

        // se o usuario existe armazenado, eu pego, converto-o para JSON
        var user = JSON.parse(userStr);
        // e comeco a preencher as diferentes secoes da minha pagina
        // secao do perfil
        var strNome  = fragmentoNome.replace("{{NOME}}",user.nome);
        var strRacf  = fragmentoRacf.replace("{{RACF}}",user.racf);
        var strEmail = fragmentoEmail.replace("{{EMAIL}}",user.email);
        var strSetor = fragmentoSetor.replace("{{SETOR}}",user.setor);

        document.getElementById("nome").innerHTML = strNome;
        document.getElementById("racf").innerHTML = strRacf;
        document.getElementById("email").innerHTML = strEmail;
        document.getElementById("setor").innerHTML = strSetor;
        // secao da foto
        document.getElementById("fotoUser").innerHTML = 
            fragmentoFoto.replace("{{LINKFOTO}}",user.linkFoto);

        // secao dos pedidos
        var strPedidos="";
        for (i=0; i<user.pedidos.length; i++){
            let pedidoatual = fragmentoPedido;
            strPedidos += pedidoatual.replace("{{DATAPEDIDO}}",user.pedidos[i].dataPedido)
                                     .replace("{{NUMPEDIDO}}",user.pedidos[i].numPedido)   
                                     .replace("{{OBSERVACOES}}",user.pedidos[i].observacoes);
        }
        document.getElementById("pedidos").innerHTML = strPedidos;
    }

    
}