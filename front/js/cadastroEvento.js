function cadastrarEvento(e){
    e.preventDefault();
    if(document.getElementById('formulario').checkValidity()){
        var nome = document.getElementById('inputNome').value;
        var dataInicio = document.getElementById('inputDataInicio').value;
        var dataFim = document.getElementById('inputDataFim').value;
        var descricao = document.getElementById('inputDescricao').value;
        var send_data = {"nome": nome, "descricao": descricao, "dataInicio": dataInicio, "dataFim": dataFim};
        $.ajax({
            headers: { "Accept": "application/json" },
            type: "POST",
            crossDomain: true,
            url: "http://localhost:3001/api/evento",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(send_data),
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            success: function(msg) {
                console.log(msg);
                window.location.href = '../pages/painelEntidade.html';
            }
        });       
    } else  console.log("OLA!!!");
}

var cadastrar = document.getElementById('botaoCadastrar');
cadastrar.onclick = cadastrarEvento;


