function valCpf(value){
    value = value.replace('.','');
    value = value.replace('.','');
    cpf = value.replace('-','');
    
    while(cpf.length < 11) cpf = "0"+ cpf;
    
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    
    for (i=0; i<11; i++){
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
    b = 0;
    c = 11;
    for (y=0; y<10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

    return retorno;
}

function buscar_certificados(event){
    // 1. Ver se CPF é valido
    var cpf = document.getElementById('cpf').value;
    // console.log(cpf);
    if(valCpf(cpf)) {
        sessionStorage.setItem('cpf', cpf);
        window.location.href = 'pages/certificados.html';
    } else {
        alert("Digite um CPF válido!");
    }
}