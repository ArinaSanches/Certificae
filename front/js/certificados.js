$('.collapse').collapse()

var certificados = [


];
// { "evento": x, "local_img": x}
// 


function gerar_componente_device(certificado, id_linha) {
    console.log(certificado);
    $('#' + id_linha).append(
        // "<div class='row'>" +
          "<div class='col-md-4'>" +
              "<img class='img-fluid rounded mb- mb-md-0' src='../../backend/temp/certificados/"+ certificado['nome_img_certificado'] +"' alt=''>" + // BOTAR IMAGEM
          "</div>" +
          "<div class='col-md-4'>" +
            "<h3>" +  certificado['evento'] +"</h3>" + // BOTAR NOME DO EVENTO
            "<a class='btn btn-primary' href='../../backend/temp/certificados/" + certificado['nome_img_certificado'] +"' download= ='../../backend/temp/certificados/" + certificado['nome_img_certificado'] +"'>Download certificado</a>" + 
          "</div>" +
        // "</div>" +
        "<hr>" 
    );    
}


function atualizar_tela() {
    console.log(certificados)
    var id;
    certificados.forEach((certificado, index) => {
        $("#conteudo").append("<div id = row_" + id + " class='row'> </div>");
        gerar_componente_device(certificado, "row_" + id);
    });
};


function get_certificados(){
    $.ajax({
        headers: { "Accept": "application/json" },
        type: "GET",
        crossDomain: true,
        url: "http://localhost:3004/api/certificados/"+ sessionStorage.getItem('cpf'),
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function(xhr) {
            xhr.withCredentials = true;
            // xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.getItem('token'));
        },
        success: function(msg) {
            certificados = msg;
            atualizar_tela();
        }
    });
};


$(document).ready(function() {
    get_certificados();
});