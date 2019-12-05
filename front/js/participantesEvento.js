const $tableID = $('#tableTexto');
const $tableParticipacaoID = $('#tableParticipacao');
const id = JSON.parse(sessionStorage.getItem('id_evento'))['id_evento'];


var elemento;
var botao;

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

    var table = $('#tabelaTexto');

    table.find('tr').each(function(indice){
        var texto = $(this).find('.texto').text();
        var send_data = {"id_evento": id, "texto": texto};
        elemento = $(this).find('.numero')

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
                                elemento.replaceWith("<td class='pt-3-half numero' contenteditable='false'>"+msg['numero']+"</td>");
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
        if(valCpf(cpf)) { 
            var send_data = {"id_evento": id, "nome_pessoa": nome, "cpf":cpf, "horas":ch, "texto":texto};
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
        } else {
            alert("Digite um CPF válido!");
        }        
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








 

