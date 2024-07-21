const path = require("path");
const multer = require("multer"); // biblioteca para fazer o upload
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..","..", "tmp"); //pasta temporária
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); //onde irá ficar a imagem

const MULTER = { 

    storage: multer.diskStorage({// Recebe duas propriedades: onde o arquivo vai ser enviado e o nome do arquivo
        destination: TMP_FOLDER, // Pasta de destino temporária para o upload
        
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex"); // gerando um hash aleatório 
            const fileName = `${fileHash}-${file.originalname}`; // Combinando o nome da imagem com o hash para evitar imagens duplicadas

            return callback(null, fileName);
        },
    }),
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}