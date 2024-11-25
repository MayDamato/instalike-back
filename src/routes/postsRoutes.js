//Rotas
import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../../src/controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origun: "http//localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos enviados pelo multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo por simplicidade
        cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
})

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ storage: storage });
// Em sistemas Linux ou macOS, pode-se usar apenas:
// const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    // Permite que o servidor receba dados no formato JSON nas requisições
    app.use(express.json());
    app.use(cors(corsOptions));

    // Rota para recuperar uma lista de todos os posts
    app.get("/posts", listarPosts); //Chama a função controladora apropriada

    // Rota para criar (POST) um novo post
    app.post("/posts", postarNovoPost); // Chama a função controladora para criação de posts

    // Rota para upload de imagem (assumindo uma única imagem chamada"imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;