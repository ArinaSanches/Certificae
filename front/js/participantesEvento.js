const $tableID = $('#tableTexto');
const $tableParticipacaoID = $('#tableParticipacao');

var elemento;
var botao;

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

    var table = $('#tabelaTexto');

    table.find('tr').each(function(indice){
        var texto = $(this).find('.texto').text();
        var send_data = {"id_evento": sessionStorage.getItem('id_entidade'), "texto": texto};
        elemento = $(this).find('.numero')

        if(texto != ' '){ 
            console.log("ENTROU")
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
                    elemento.replaceWith("<td class='pt-3-half numero' contenteditable='false'>"+msg['numero']+"</td>");
                }
            });
        }
    
    });
          
}

function eliminarTexto(){
    $(this).parents('tr').detach();
}


function registrarParticipacao(){
    var table = $('#tabelaParticipacao');

    table.find('tr').each(function(indice){
        console.log($(this))
        var nome = $(this).find('.nome').text();
        var cpf = $(this).find('.cpf').text();
        var texto = $(this).find('.texto').text();
        var ch = $(this).find('.ch').text();   
        var send_data = {"id_evento": sessionStorage.getItem('id_entidade'), "nome_pessoa": nome, "cpf":cpf, "horas":ch, "texto":texto};
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
                console.log("ok")
            }
        });        
    });    
}

function eliminarParticipacao(){
    $(this).parents('tr').detach();
}

$('#adicionarTexto').on('click', 'i', () => {
    $('#tabelaTexto').append(newTr);   
});

$('#addParticipacao').on('click', 'i', () => {
    $('#tabelaParticipacao').append(newTrParticipacao);   
});

$tableID.on('click', '#botaoCadastrarTexto', registrarTexto);

$tableID.on('click', '.btn-danger', eliminarTexto);

$tableParticipacaoID.on('click', '#botaoCadastrar', registrarParticipacao);

$tableParticipacaoID.on('click', '.btn-danger', eliminarParticipacao);


/*
    function registrarTexto(){
    
    var $item = $(this).closest("tr").find(".texto").text(); 
    elemento = $(this).closest("tr").find(".numero");
    botao = $(this).closest("tr").find(".btn-success");

    var send_data = {"id_evento": sessionStorage.getItem('id_entidade'), "texto": $item};
    
    if($item != ' '){    
        $.ajax({
            headers: { "Accept": "application/json" },
            type: "POST",
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
                elemento.replaceWith("<td class='pt-3-half numero' contenteditable='false'>"+msg['numero']+"</td>");
                botao.replaceWith("<button type='button'class='btn btn-danger btn-rounded btn-sm my-0'><i class='fa fa-trash'></i></button>");
            }
        });
    
    }
}
*/








 

