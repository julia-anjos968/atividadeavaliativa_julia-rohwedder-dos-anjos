import express from "express";
import dotenv from "dotenv";
import streamersRoutes from "./src/routes/streamersRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req,res)=> {
    res.send("servidor funcionando")
});

app.use("/streamers", streamersRoutes);

app.get("/streamers/:plataforma", (req, res) => {
    const id = parseInt(req.params.id);
  
    const streamer = streamers.find((s) => s.id === id);
  
    if (streamer) {
    res.status(200).json(streamer);
  } else {
    res.status(404).json({
      mensagem: "Plataforma nao encontrada!",
    });
  }
  });
  
  
  
  app.get("/streamers/categoria/:categoria", (req,res) => {
      let categoria = req.params.categoria;
      categoria = categoria.toLowerCase();
  
      const categoriasFiltradas = streamers.filter(s => s.categoria.toLowerCase().includes(categoria));
  
      if(categoriasFiltradas) {
          res.status(200).json(categoriasFiltradas);
      } else {
          res.status(404).json ({
              mensagem: "Categoria nao encontrada!"
          })
      }
  
  
  })
  
  app.get("/streamers/pais/:pais", (req,res) => {
      let pais = req.params.pais;
      pais = pais.toLowerCase();
  
      const paisFiltrados = streamers.filter(s => s.pais.toLowerCase().includes(pais));
  
      if(paisFiltrados) {
          res.status(200).json(paisFiltrados);
      } else {
          res.status(404).json ({
              mensagem: "Pais nao encontrado!"
          })
      }
  
  
  })
  
  app.get("/streamers/seguidores/:seguidores", (req, res) => {
      let seguidores = req.params.seguidores;
      seguidores = seguidores.toLowerCase();

      const seguidoresFiltrados = streamers.filter(s => s.seguidores.toLowerCase().includes(seguidores));
  
      if(seguidoresFiltrados) {
          res.status(200).json(seguidoresFiltrados);
      } else {
          res.status(404).json({
              mensagem: "seguidores nao encontrados!"
          })
      }
  })

app.listen(serverPort, () => {
    console.log(`servidor rodando em http://localhost:${serverPort}`);
});