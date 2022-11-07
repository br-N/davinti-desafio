const express = require("express");
const contatoRoutes = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

// Create
contatoRoutes.post("/contato", async (req, res) => {
  try {
    const { nome, idade, numero } = req.body;

    const data = await prisma.contato.create({
      data: {
        nome,
        idade,
        Telefone: {
          create: { numero },
        },
      },
      include: {
        Telefone: true,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Read All
contatoRoutes.get("/contato", async (req, res) => {
  try {
    const data = await prisma.contato.findMany({
      include: {
        Telefone: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Read One
contatoRoutes.get("/contato/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!intId) {
      return res.status(400).json("Id é obrigatório.");
    }

    const data = await prisma.contato.findUnique({
      where: {
        id: intId,
      },
      include: {
        Telefone: true,
      },
    });

    if (!data) {
      return res.status(404).json("Contato não existe.");
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update
contatoRoutes.patch("/contato", async (req, res) => {
  try {
    const { id, nome, idade } = req.body;

    if (!id) {
      return res.status(400).json("Id é obrigatório.");
    }

    const contatoExiste = await prisma.contato.findUnique({ where: { id } });
    if (!contatoExiste) {
      return res.status(404).json("Contato não existe.");
    }

    const data = await prisma.contato.update({
      where: {
        id,
      },
      data: {
        nome,
        idade,
      },
      include: {
        Telefone: true,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete
contatoRoutes.delete("/contato/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!intId) {
      return res.status(400).json("Id é obrigatório.");
    }

    const contatoExiste = await prisma.contato.findUnique({
      where: { id: intId },
    });

    if (!contatoExiste) {
      return res.status(404).json("Contato não existe.");
    }

    await prisma.contato.delete({ where: { id: intId } });

    const date = new Date();
    const message =
      `O contato cujo id é ${intId} foi deletado em ${date}` + "\n";
    fs.appendFile("log.txt", message, (err) => {
      if (err) {
        console.err;
        return;
      }
    });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = contatoRoutes;
