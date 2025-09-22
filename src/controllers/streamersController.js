import dados from "../models/dados.js";
const { streamers } = dados;

const getAllStreamers = (req, res) => {
    res.status(200).json({
        total: streamers.length,
        streamers: streamers
    })
}

const getById = (req, res) => {
    let id = parseInt(req.params.id);

    const streamer = streamers.find(s => s.id === id);

    if (streamer) {
        res.status(200).json({
            success: true,
            streamer: streamer
        })
    }

    res.status(400).json({
        success: false,
        message: "Streamer nao encontrado!"
    })
}

const createStreamer = (req, res) => {
    const { nome, plataforma, categoria, seguidores, ultimoStream, linguagem, pais, ativo } = req.body;

    const paisLista = ["Brasil", "Estados Unidos", "Espanha", "Estados Unidos", "Canadá", "Estados Unidos", "Brasil", "Brasil", "Canadá", "Espanha"];

    const plataformaLista = ["twitch", "youtube"];

    if (!nome || nome <= 2 || nome >= 21 ) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nome' é obrigatório e deve estar entre 3 e 20 caracteres!"
        });
    }

    if (!plataforma) {
        return res.status(400).json({
            success: false,
            message: "O campo 'plataforma' é obrigatório para criar um sistema de streamer!"
        });
    }

    if (!categoria) {
        return res.status(400).json({
            success: false,
            message: "O campo 'categoria' é obrigatório para criar um sistema de streamer!"
        });
    }

    if (!seguidores || seguidores < 0) {
        return res.status(400).json({
            success: false,
            message: "O campo 'seguidores' é obrigatório e nao pode ser negativo!"
        });
    }

    if (!ultimoStream) {
        return res.status(400).json({
            success: false,
            message: "O campo 'ultimoStream' é obrigatório para criar um sistema de streamer"
        });
    }

    if (!linguagem) {
        return res.status(400).json({
            success: false,
            message: "O campo 'linguagem' é obrigatório para criar um sistema de streamer!"
        });
    }

    if (!pais) {
        return res.status(400).json({
            success: false,
            message: "O campo 'pais' é obrigatório para criar um sistema de streamer!"
        });
    }

    if (!ativo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'ativo' é obrigatório para criar um sistema de streamer!"
        });
    }

    const novoStreamer = {
        id: streamers.length + 1,
        nome: nome,
        plataforma: plataforma,
        categoria: categoria,
        seguidores: seguidores,
        ultimoStream: ultimoStream,
        linguagem: linguagem,
        pais: pais,
        ativo: ativo
    }

    streamers.push(novoStreamer);

    res.status(201).json({
        success: true,
        message: "Streamer cadastrado com sucesso!",
        streamer: novoStreamer
    })
}

const deleteStreamer = (req, res) => {
    let id = parseInt(req.params.id);

    const streamerParaRemover = streamers.find(s => s.id === id);

    if(!streamerParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Esse personagem nao existe, ${id}`
        })
    }

    const streamersFiltrados = streamers.filter(streamer => streamer.id !== id);

    streamers.splice(0, streamers.length, ...streamersFiltrados);

    res.status(200).json ({
        success: true,
        message: "O streamer foi removido com sucesso",
        streamerRemovido: streamerParaRemover
    })
}

const updateStreamer = (req, res) => {
    const id = parseInt(req.params.id);

    const { nome, plataforma, categoria, seguidores, ultimoStream, linguagem, pais, ativo } = req.body;

    const idParaEditar = id;

    if(isNaN(idParaEditar)) {
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser um número válido!"
        })
    }

    const streamerExiste = streamers.find(streamer => streamer === idParaEditar);

    if (!streamerExiste) {
        return res.status(400).json({
            success: false,
            message: `Streamer com id: ${id} nao existe.`
        })
    }

    const streamersAtualizados = streamers.map(streamer => streamer.id === idParaEditar ? {
        ...streamer,
        ...(nome && {nome}),
        ...(plataforma && {plataforma}),
        ...(categoria && {categoria}),
        ...(seguidores && {seguidores}),
        ...(ultimoStream && {ultimoStream}),
        ...(linguagem && {linguagem}),
        ...(pais && {pais}),
        ...(ativo && {ativo})
    } : streamer)

    const streamerNovo = streamers.find(streamer => streamer.id === idParaEditar);

    res.status(200).json({
        success: true,
        message: `Dados do streamer ID ${idParaEditar} atualizados com sucesso!`,
        streamer: streamerNovo
    })
}

export {getAllStreamers, getById, createStreamer, deleteStreamer, updateStreamer};