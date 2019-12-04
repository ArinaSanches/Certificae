var eventos = []

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
                eventos = msg['docs'];
                atualizar_tela();

                // console.log(msg.token);
                // sessionStorage.setItem('token', msg.token);
                // window.location.href = '../pages/painelEntidade.html';
            }
        });
};

function atualizar_tela() {
    console.log(eventos)
    var id;
    eventos.forEach((evento, index) => {
        if (index % 3 === 0) { // se for o número par, eu inicio uma nova row
            id = index + 1;
            $("#conteudo").append("<div id = row_" + id + " class='row'> </div>");
        }
        gerar_componente_device(evento, "row_" + id);
    });
};

function gerar_componente_device(evento, id_linha) {
    var dataInicio = evento["dataInicio"].split('T')[0]
    var dataFim = evento["dataFim"].split('T')[0]


    $('#' + id_linha).append("<div class='column'>"+
        "<div class='card' style='max-width: 540px;'>" +
            "<div class='row no-gutters'>" +
                "<div class='col-md-4'>" +
                "<img src='../../backend/temp/uploads/"+ evento['foto'] +"' id ='imagemCard' class='card-img' alt='...'>"+
                "</div>" +
                "<div class='col-md-8'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>" + evento["nome"] + "</h5>" +
                    "<p class='card-text'>" + dataInicio + " - " + dataFim +"</p>" +
                    "<a href='../pages/editarEvento.html'><button class='btn btn-lg  text-uppercase font-weight-bold mb-1' type='submit' id='botao'><i class='fa fa-pencil'></i></button></a>"+
                "</div>" +
                "</div>" +
            "</div>" +
        "</div>"+
    "</div>"

    );
}


$(document).ready(function() {
    get_eventos();
});
