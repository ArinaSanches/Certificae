const mongoose = require('mongoose');
const path = require('path');
const Participacao = mongoose.model('Participacao');
const Evento = mongoose.model('Evento');
const Texto = mongoose.model('Texto');
const sharp = require('sharp');



certificados = [];

async function gerar_certificado(texto, img_base, nome_img){
    var textoSVG = ` <svg>
                    <rect x="0" fill="none" y="0" width="800" height="200" rx="50" ry="50"/> `

    var x = 10,
        y = 40,
        i = 0,
        // interacoes = texto.length / 100;
        style = `style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center"`;

    // //TODO: Verificação pra quando for a ultima rodada
    // for(i = 0; i < texto.length; i += 100){
    // console.log(texto.substr(i, i+=99));
    if(texto.length >= 120)
        textoSVG += `<text x="10" y="40" style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">` + texto.substr(i, i+=120) +`</text>`;
    else
        textoSVG += `<text x="10" y="40" style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">` + texto +`</text>`;
    //     x += 
    // }

    textoSVG += `</svg>`;
    const textoBuffer = Buffer.from( textoSVG);


    // const roundedCorners = Buffer.from(
    //     `
    //         <svg>
    //         <rect x="0" fill="none" y="0" width="800" height="200" rx="50" ry="50"/>
    //             <text x="10" y="40"  style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">
    //                 ESSE aaa É UM CERTIFICADO TOP DEMAIS vamos agora testar até onde vai este carai aqui muito locão aaaa aaaa aaaaa uuuuuuuuu 
    //             </text>
    
    //             <text x="10" y="80"  style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">
    //                 ESSE É UM CERTIFICADO TOP DEMAIS vamos agora testar até onde vai este carai aqui muito locão aaaa aaaa aaaaa
    //             </text>
    
    //             <text x="10" y="120"  style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">
    //                 ESSE É UM CERTIFICADO TOP DEMAIS vamos agora testar até onde vai este carai aqui muito locão aaaa aaaa aaaaa
    //              </text>
    //         </svg>
    //     `
    //   );
    
    const img_final = sharp(img_base)
                    .composite([{
                        input: textoBuffer,
                        blend: 'atop'
                    }])
                    .toFile(nome_img);
}

async function get_infos(participacao){
    const texto = await Texto.findOne({ "numero": participacao.texto });
    const evento = await Evento.findById(participacao.id_evento);
    
    var texto_final = texto.texto.replace("@nome", participacao.nome_pessoa);
    texto_final = texto_final.replace("@evento", evento.nome);
    texto_final = texto_final.replace("@horas", participacao.horas);
    texto_final = texto_final.replace("@cpf", participacao.cpf);

    console.log(evento.background);
    console.log(path.resolve("temp/uploads/"+evento.background));
    console.log(path.resolve(evento.background));
    console.log(path.resolve("../temp/uploads/"+evento.background));

    var certificado = {
                'nome': participacao.nome_pessoa,
                'cpf': participacao.cpf,
                'horas': participacao.horas,
                'texto': texto_final,
                'evento': evento.nome,
                'nome_img_certificado': participacao.cpf + '_' + participacao.horas + '_' + evento.nome + ".png"
    }; 

    await gerar_certificado(texto_final, path.resolve("temp/uploads/"+evento.background), path.resolve("temp/certificados/"+certificado.nome_img_certificado));
    return certificado;
}

module.exports = {
    async index(req, res) {
        // checar as querys que pode ser feitas pelos filtros
        var certificados = [];

        // 1. pega as participacoes dele pelo cpf
        const participacoes = await Participacao.find({"cpf": req.params.cpf});
       

        for(participacao of participacoes){
            certificados.push(await get_infos(participacao))
        }
        
        // console.log(certificados);
        
        return res.json(certificados);
    },
};