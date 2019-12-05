const sharp = require('sharp');


const roundedCorners = Buffer.from(
    `
        <svg>
        <rect x="0" fill="none" y="0" width="800" height="200" rx="50" ry="50"/>
            <text x="10" y="40"  style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">
                ESSE É UM CERTIFICADO TOP DEMAIS vamos agora testar até onde vai este carai aqui muito locão aaaa aaaa aaaaa
            </text>

            <text x="10" y="80"  style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">
                ESSE É UM CERTIFICADO TOP DEMAIS vamos agora testar até onde vai este carai aqui muito locão aaaa aaaa aaaaa
            </text>

            <text x="10" y="120"  style="font-family: Times New Roman; font-size: 20; stroke: none; fill: black; text-align: center">
                ESSE É UM CERTIFICADO TOP DEMAIS vamos agora testar até onde vai este carai aqui muito locão aaaa aaaa aaaaa
             </text>
        </svg>
    `
  );

// const blends = ['clear', 'source', 'over', 'in', 'out', 'atop', 'dest', 'dest-over', 'dest-in', 'dest-out', 'dest-atop', 'xor', 'add', 'saturate', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'colour-dodge', 'color-dodge', 'colour-burn','color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion'];

// for (let blend of blends) {
    const roundedCornerResizer =
      sharp('hdc.jpg')
        // .resize('200', 200)
        .composite([{
          input: roundedCorners,
          blend: 'atop'
        }])
        .toFile('artop-cu.jpg')
// }
   
//   readableStream
//     .pipe(roundedCornerResizer)
//     .pipe(writableStream);