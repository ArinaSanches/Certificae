//TODO: Pegar as info da entidade e povoar
function editar_entidade(e){
    e.preventDefault();
    if(document.getElementById('formulario').checkValidity()){
        var nome = document.getElementById('inputNome').value;
        var email = document.getElementById('inputEmail').value;
        var descricao = document.getElementById('descricao').value;
        var senha = document.getElementById('inputPassword').value;
        
        var send_data = {"nome": nome, "login": email, "descricao": descricao, "password": senha, "foto": "aaaa"};
        
        const token = sessionStorage.getItem('token');
        const id = sessionStorage.getItem('id_entidade');

        $.ajax({
            headers: { "Accept": "application/json" },
            type: "PUT",
            crossDomain: true,
            url: "http://localhost:3004/api/entidade/"+id,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(send_data),
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization','Bearer ' + token);
            },
            success: function(msg) {
                window.location.href = '../pages/painelEntidade.html';
            }
        });
    } else {
        alert("Campos inválidos!");
    };
};



function excluir_entidade(e){
    console.log("ENTERI AQUI")
    // e.preventDefault();
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id_entidade');

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
                window.location.href = '../pages/painelEntidade.html';
            }
        });
    } 