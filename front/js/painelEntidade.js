function get_eventos(){
        $.ajax({
            headers: { "Accept": "application/json" },
            type: "GET",
            crossDomain: true,
            url: "http://localhost:3004/api/evento",
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
                xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
            },
            success: function(msg) {
                console.log(msg);
                // console.log(msg.token);
                // sessionStorage.setItem('token', msg.token);
                // window.location.href = '../pages/painelEntidade.html';
            }
        });
};

get_eventos();