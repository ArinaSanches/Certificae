const $tableID = $('#tableTexto');
const $tableParticipacaoID = $('#tableParticipacao');
const id = JSON.parse(sessionStorage.getItem('id_evento'))['id_evento'];
var elemento;
var botao;
var nome;

var textos = []
var participacoes = []

function get_textos(){
    $.ajax({
        headers: { "Accept": "application/json" },
        type: "GET",
        crossDomain: true,
        url: "http://localhost:3004/api/texto?id_evento="+ id,
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
        },
        success: function(msg) {
            textos = msg['docs'];
            carregarTextos();
        }
    });
};

function carregarTextos(){
    if(textos.length > 0){
        textos.forEach((texto, index) => {
            var novoTexto = "<tr>" +
                        "<td class='pt-3-half texto salvo' contenteditable='false'>"+texto['texto'] +"</td>" +
                        "<td class='pt-3-half numero' contenteditable='false'>"+texto['numero'] +"</td>" +
                        "<td>"+
                        "<span class='table-add'><button type='button'" +
                            "<button type='button'class='btn btn-danger btn-rounded btn-sm my-0' id="+texto['_id']+"><i class='fa fa-trash'></i></button>"+
                        "</td>"+
                    "</tr>"
            $('#tabelaTexto').append(novoTexto);
        });
    }
}

function get_participações(){
    $.ajax({
        headers: { "Accept": "application/json" },
        type: "GET",
        crossDomain: true,
        url: "http://localhost:3004/api/participacao?id_evento="+ id,
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
        },
        success: function(msg) {
            participacoes = msg['docs'];
            carregarParticipacoes();
        }
    });
}

function carregarParticipacoes(){
    if(participacoes.length > 0){~
        participacoes.forEach((participacao, index) => {
            var novaParticipacao = "<tr>" +
                                "<td class='pt-3-half nome salvo' contenteditable='false'>"+participacao['nome_pessoa']+"</td>" +
                                "<td class='pt-3-half cpf' contenteditable='false'>"+participacao['cpf']+"</td>" +
                                "<td class='pt-3-half texto' contenteditable='false'>"+participacao['texto']+"</td>" +
                                "<td class='pt-3-half ch' contenteditable='false'>"+participacao['horas']+"</td>" +
                                "<td>"+
                                "<span class='table-add'><button type='button'" +
                                    "<button type='button'class='btn btn-danger btn-rounded btn-sm my-0' id="+participacao['_id']+"><i class='fa fa-trash'></i></button>"+
                                "</td>"+
                            "</tr>"
            $('#tabelaParticipacao').append(novaParticipacao);
        });    
    }
}

function valCpf(value){
    value = value.replace('.','');
    value = value.replace('.','');
    cpf = value.replace('-','');
    
    while(cpf.length < 11) cpf = "0"+ cpf;
    
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    
    for (i=0; i<11; i++){
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
    b = 0;
    c = 11;
    for (y=0; y<10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

    return retorno;
}

const newTr = "<tr>" +
        "<td class='pt-3-half texto' contenteditable='true'> </td>" +
        "<td class='pt-3-half numero' contenteditable='false'> </td>" +
        "<td>"+
        "<span class='table-add'><button type='button'" +
            "<button type='button'class='btn btn-danger btn-rounded btn-sm my-0'><i class='fa fa-trash'></i></button>"+
        "</td>"+
    "</tr>"

const newTrParticipacao = "<tr>" +
        "<td class='pt-3-half nome' contenteditable='true'> </td>" +
        "<td class='pt-3-half cpf' contenteditable='true'> </td>" +
        "<td class='pt-3-half texto' contenteditable='true'> </td>" +
        "<td class='pt-3-half ch' contenteditable='true'> </td>" +
        "<td>"+
        "<span class='table-add'><button type='button'" +
            "<button type='button'class='btn btn-danger btn-rounded btn-sm my-0'><i class='fa fa-trash'></i></button>"+
        "</td>"+
    "</tr>"


function registrarTexto(){

    if($('#tabelaTexto tr:last').length > 0){
        if($('#tabelaTexto tr:last .texto')[0].classList.contains("salvo")){
            alert('Todos os textos já estão cadastrados!')
        }else{
            var texto = $('#tabelaTexto tr:last .texto').text();
            elemento = $('#tabelaTexto tr:last .numero');
            nome = $('#tabelaTexto tr:last .texto');
            botao = $('#tabelaTexto tr:last .btn-danger');

            var send_data = {"id_evento": id, "texto": texto};
    
            if(texto != ' '){ 
                if((texto.match(/@nome/g) || []).length > 0){
                    if((texto.match(/@cpf/g) || []).length > 0){
                        if((texto.match(/@horas/g) || []).length > 0){
                            $.ajax({
                                headers: { "Accept": "application/json" },
                                type: "POST",
                                async: false,
                                crossDomain: true,
                                url: "http://localhost:3004/api/texto",
                                contentType: 'application/json',
                                dataType: 'json',
                                data: JSON.stringify(send_data),
                                beforeSend: function(xhr) {
                                    xhr.withCredentials = true;
                                    xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
                                },
                                success: function(msg) {
                                    nome.replaceWith("<td class='pt-3-half texto salvo' contenteditable='false'>"+msg['texto'] +"</td>")
                                    elemento.replaceWith("<td class='pt-3-half numero' contenteditable='false'>"+msg['numero']+"</td>");
                                    botao.attr("id", msg['_id']);
                                    alert("Texto cadastrado com sucesso!");

                                }
                            });
                        }else{
                            alert("O texto precisa conter @horas!");    
                        }
                    }else{
                        alert("O texto precisa conter @cpf!");    
                    }
                }else{
                    alert("O texto precisa conter @nome!");    
                }
            }
        }  
    }           
}

function eliminarTexto(){
    const token = sessionStorage.getItem('token');
    $.ajax({
        headers: { "Accept": "application/json" },
        type: "DELETE",
        crossDomain: true,
        url: "http://localhost:3004/api/texto/"+this.id,
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader('Authorization','Bearer ' + token);
        },
        success: function(msg) {
            
        }
    }).always(function(msg) {
        window.location.reload();
        alert("Texto eliminado com sucesso!")
    });
}

function registrarParticipacao(){
    var table = $('#tabelaParticipacao');

    if($('#tabelaParticipacao tr:last').length > 0){
        if($('#tabelaParticipacao tr:last .nome')[0].classList.contains("salvo")){
            alert('Todas as participações já estão cadastradas!')
        }else{
            var nome_pessoa = $('#tabelaParticipacao tr:last .nome');
            var cpf = $('#tabelaParticipacao tr:last .cpf');
            var texto = $('#tabelaParticipacao tr:last .texto');
            var ch = $('#tabelaParticipacao tr:last .ch');
            botao = $('#tabelaParticipacao tr:last .btn-danger') 

            if(valCpf(cpf.text())) { 
                var send_data = {"id_evento": id, "nome_pessoa": nome_pessoa.text(), "cpf":cpf.text(), "horas":ch.text(), "texto":texto.text()};
                $.ajax({
                    headers: { "Accept": "application/json" },
                    type: "POST",
                    crossDomain: true,
                    url: "http://localhost:3004/api/participacao",
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(send_data),
                    beforeSend: function(xhr) {
                        xhr.withCredentials = true;
                        xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
                    },
                    success: function(msg) {
                        
                        nome_pessoa.replaceWith("<td class='pt-3-half nome salvo' contenteditable='false'>"+msg['nome_pessoa']+"</td>")
                        $(botao).attr("id", msg['_id']);
                        $(cpf).attr('contenteditable', false)
                        $(texto).attr('contenteditable', false)
                        $(ch).attr('contenteditable', false)
                        alert("Participação cadastrada com sucesso");
                    },
                    error: function(request, status, error) {
                        alert(request.responseText)
                    }
                });
            } else {
                alert("Digite um CPF válido!");
            } 
        }
    }  
}

function eliminarParticipacao(){
    const token = sessionStorage.getItem('token');
    $.ajax({
        headers: { "Accept": "application/json" },
        type: "DELETE",
        crossDomain: true,
        url: "http://localhost:3004/api/participacao/"+this.id,
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
            xhr.setRequestHeader('Authorization','Bearer ' + token);
        },
        success: function(msg) {
            
        }
    }).always(function(msg) {
        window.location.reload();
        alert("Participação eliminada com sucesso!")
    });
}

function verificarLinhaVazia(){
    if($('#tabelaTexto tr:last').length > 0){
        if($('#tabelaTexto tr:last .texto')[0].classList.contains("salvo")){
            return true;
        }else{
            return false;
        }
    }return true;
}

function verificarLinhaVaziaParticipacao(){
    if($('#tabelaParticipacao tr:last').length > 0){
        if($('#tabelaParticipacao tr:last .nome')[0].classList.contains("salvo")){
            return true;
        }else{
            return false;
        }
    }return true;
}

$('#adicionarTexto').on('click', 'i', () => {
    if(verificarLinhaVazia()){
        $('#tabelaTexto').append(newTr);
    }   
});

$('#addParticipacao').on('click', 'i', () => {
    if(verificarLinhaVaziaParticipacao()){
        $('#tabelaParticipacao').append(newTrParticipacao);  
    } 
});

$tableID.on('click', '#botaoCadastrarTexto', registrarTexto);

$tableID.on('click', '.btn-danger', eliminarTexto);

$tableParticipacaoID.on('click', '#botaoCadastrar', registrarParticipacao);

$tableParticipacaoID.on('click', '.btn-danger', eliminarParticipacao);

$(document).ready(function() {
    get_textos();
    get_participações();
});