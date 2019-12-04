function cadastrar_entidade(e){
    e.preventDefault();
    if(document.getElementById('formulario').checkValidity()){
        var nome = document.getElementById('inputNome').value;
        var email = document.getElementById('inputEmail').value;
        var descricao = document.getElementById('inputDescricao').value;
        var senha = document.getElementById('inputPassword').value;
        var send_data = {"nome": nome, "login": email, "descricao": descricao, "password": senha, "foto": "aaaa"};
        // console.log(send_data);

        $.ajax({
            headers: { "Accept": "application/json" },
            type: "POST",
            crossDomain: true,
            url: "http://localhost:3004/api/entidade",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(send_data),
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            success: function(msg) {
                sessionStorage.setItem('token', msg.token);
                sessionStorage.setItem('id_entidade', msg.entidade._id);
                window.location.href = '../pages/painelEntidade.html';
            }
        });
    } else {
        alert("Campos inválidos!");
    };
};