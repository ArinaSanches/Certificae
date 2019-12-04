function cadastrar_entidade(e){
    e.preventDefault();
    if(document.getElementById('formulario').checkValidity()){
        var nome = document.getElementById('inputNome').value;
        var email = document.getElementById('inputEmail').value;
        var descricao = document.getElementById('inputDescricao').value;
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
            type: "POST",
            crossDomain: true,
            url: "http://localhost:3004/api/entidade",
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            success: function(msg) {
                console.log(msg);
                sessionStorage.setItem('token', msg.token);
                sessionStorage.setItem('id_entidade', msg.entidade._id);
                window.location.href = '../pages/painelEntidade.html';
            }
        });
    } else {
        alert("Campos inválidos!");
    };
};