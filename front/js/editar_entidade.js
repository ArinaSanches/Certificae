
const token = sessionStorage.getItem('token');
const id = sessionStorage.getItem('id_entidade');

$.ajax({
    headers: { "Accept": "application/json" },
    type: "GET",
    crossDomain: true,
    url: "http://localhost:3004/api/entidade/"+ sessionStorage.getItem('id_entidade') ,
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
    },
    success: function(msg) {
        console.log(msg)
        $('#imagEntidade').replaceWith("<li class='nav-header'><img src='../../backend/temp/uploads/"+ msg['foto'] +"' id = 'logo'></li>")
    }
});

$.ajax({
    headers: { "Accept": "application/json" },
    type: "GET",
    crossDomain: true,
    url: "http://localhost:3004/api/entidade/"+id,
    processData: false,
    contentType: false,
    beforeSend: function(xhr) {
        xhr.withCredentials = true;
        xhr.setRequestHeader('Authorization','Bearer ' + token);
    },
    success: function(msg) {
        // console.log(msg);

        document.getElementById('inputNome').value = msg.nome;
        document.getElementById('inputEmail').value = msg.login;
        document.getElementById('descricao').value = msg.descricao;
        document.getElementById('inputPassword').value = msg.password;
    //    $('#inputFoto')[0].files[0] = msg.foto;

    }
});



function editar_entidade(e){
    // e.preventDefault();
    console.log("entrei aqui");
    if(document.getElementById('formulario').checkValidity()){
        var nome = document.getElementById('inputNome').value;
        var email = document.getElementById('inputEmail').value;
        var descricao = document.getElementById('descricao').value;
        var senha = document.getElementById('inputPassword').value;
        var img = $('#inputFoto')[0].files[0];

        var formData = new FormData();
        formData.append("nome", nome);
        formData.append("login", email);
        formData.append("descricao",descricao);
        formData.append('password', senha);
        formData.append('file', img);

        $.ajax({
            headers: { "Accept": "application/json" },
            type: "PUT",
            crossDomain: true,
            url: "http://localhost:3004/api/entidade/"+id,
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization','Bearer ' + token);
            },
            success: function(msg) {
                console.log(msg);
                console.log("entrei aq");
            }
        });
    } else {
        alert("Campos inválidos!");
    };
    // window.location.href = '../pages/painelEntidade.html';
};



function excluir_entidade(e){
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id_entidade');
    console.log("EXCLUIU");

        $.ajax({
            headers: { "Accept": "application/json" },
            type: "DELETE",
            crossDomain: true,
            url: "http://localhost:3004/api/entidade/"+id,
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization','Bearer ' + token);
            },
            success: function(msg) {
                
            }
        }).always(function(msg) {
            console.log("EXCLUIU");
            console.log(msg);
            alert("Entidade deletada com sucesso!");
            window.location.href = '../index.html';
          });
    } 