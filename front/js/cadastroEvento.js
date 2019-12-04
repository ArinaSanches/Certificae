function cadastrarEvento(e){
    e.preventDefault();
    if(document.getElementById('formulario').checkValidity()){
        var nome = document.getElementById('inputNome').value;
        var dataInicio = document.getElementById('inputDataInicio').value;
        var dataFim = document.getElementById('inputDataFim').value;
        var descricao = document.getElementById('inputDescricao').value;
        var file = document.getElementById("inputFoto").value;
        //var send_data = {"nome": nome, "descricao": descricao, "dataInicio": dataInicio, "dataFim": dataFim, "file": file };
        var formData = new FormData();
        formData.append("nome", nome);
        formData.append("dataFim", dataFim);
        formData.append("dataInicio",dataInicio);
        formData.append("descricao",descricao);
        formData.append("id_entidade",sessionStorage.getItem('id_entidade'))
        formData.append('file', $('#inputFoto')[0].files[0]);
        formData.append('file', $('#inputBackground')[0].files[0]);

        $.ajax({
            headers: { "Accept": "application/json" },
            type: "POST",
            crossDomain: true,
            url: "http://localhost:3004/api/evento",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
            },
            success: function(msg) {
                console.log(msg);
            }
        });       
    } else  console.log("OLA!!!");
}

var cadastrar = document.getElementById('botaoCadastrar');
cadastrar.onclick = cadastrarEvento;





