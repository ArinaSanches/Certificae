function login(e){
    e.preventDefault();
    if(document.getElementById('formulario').checkValidity()){
        var email = document.getElementById('inputEmail').value;
        var senha = document.getElementById('inputPassword').value;
        var send_data = {"login": email, "password": senha};
        console.log(send_data);

        $.ajax({
            headers: { "Accept": "application/json" },
            type: "POST",
            crossDomain: true,
            url: "http://localhost:3001/api/authenticate",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(send_data),
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            success: function(msg) {
                console.log(msg);
                // window.location.href = '../pages/painelEntidade.html';
            }
        });
    } else {
        alert("Campos inválidos!");
    };
};