const token = sessionStorage.getItem('token');
const id = JSON.parse(sessionStorage.getItem('id_evento'))['id_evento'];
console.log(id)


$.ajax({
    headers: { "Accept": "application/json" },
    type: "GET",
    crossDomain: true,
    url: "http://localhost:3004/api/evento/"+id,
    processData: false,
    contentType: false,
    beforeSend: function(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('Authorization','Bearer ' + token);
    },
    success: function(msg) {
        // console.log(msg);
        var dataInicio = msg["dataInicio"].split('T')[0]
        var dataFim = msg["dataFim"].split('T')[0]

        document.getElementById('inputNome').value = msg.nome;
        document.getElementById('inputDataInicio').value = dataInicio;
        document.getElementById('inputdDataFim').value = dataFim;
        document.getElementById('inputDescricao').value = msg.descricao;
    }
});

function editar_evento(e){
    e.preventDefault();
    if(document.getElementById('formulario').checkValidity()){
        var nome = document.getElementById('inputNome').value;
        var dataInicio = document.getElementById('inputDataInicio').value;
        var dataFim = document.getElementById('inputdDataFim').value;
        var descricao = document.getElementById('inputDescricao').value;
        var img = $('#inputFoto')[0].files[0];
        var imgBack = $('#inputBackground')[0].files[0];

        var formData = new FormData();
        formData.append("nome", nome);
        formData.append("dataFim", dataFim);
        formData.append("dataInicio",dataInicio);
        formData.append("descricao",descricao);
        formData.append("id_entidade",sessionStorage.getItem('id_entidade'))
        formData.append('file', img);
        formData.append('file', imgBack);        
        
        $.ajax({
            headers: { "Accept": "application/json" },
            type: "PUT",
            crossDomain: true,
            url: "http://localhost:3004/api/evento/"+id,
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization','Bearer ' + token);
            },
            success: function(msg) {
                console.log(msg);
                window.location.href = '../pages/painelEntidade.html';
            }
            });
        } else {
            alert("Campos inválidos!");
    };        
        
};


function excluir_evento(e){
    const token = sessionStorage.getItem('token');
        $.ajax({
            headers: { "Accept": "application/json" },
            type: "DELETE",
            crossDomain: true,
            url: "http://localhost:3004/api/evento/"+id,
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization','Bearer ' + token);
            },
            success: function(msg) {
                
            }
        }).always(function(msg) {
            console.log("EXCLUIU");
            console.log(msg);
            alert("Evento deletado com sucesso!");
            window.location.href = '../pages/painelEntidade.html';
          });
    } 