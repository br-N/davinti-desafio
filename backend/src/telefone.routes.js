const express = require("express");
const telefoneRoutes = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
telefoneRoutes.post("/telefone", async (req, res) => {
  try {
    const { idContato, numero } = req.body;

    const data = await prisma.telefone.create({
      data: {
        idContato,
        numero,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Read All
telefoneRoutes.get("/telefone", async (req, res) => {
  try {
    const data = await prisma.telefone.findMany();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Read One
telefoneRoutes.get("/telefone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!intId) {
      return res.status(400).json("Id é obrigatório.");
    }

    const data = await prisma.telefone.findUnique({
      where: {
        id: intId,
      },
    });

    if (!data) {
      return res.status(404).json("Telefone não existe.");
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update
telefoneRoutes.patch("/telefone", async (req, res) => {
  try {
    const { id, idContato, numero } = req.body;

    if (!id) {
      return res.status(400).json("Id é obrigatório.");
    }

    const telefoneExiste = await prisma.telefone.findUnique({ where: { id } });
    if (!telefoneExiste) {
      return res.status(404).json("Telefone não existe.");
    }

    const data = await prisma.telefone.update({
      where: {
        id,
      },
      data: {
        idContato,
        numero,
      },
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete
telefoneRoutes.delete("/telefone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const intId = parseInt(id);

    if (!intId) {
      return res.status(400).json("Id é obrigatório.");
    }

    const telefoneExiste = await prisma.telefone.findUnique({
      where: { id: intId },
    });

    if (!telefoneExiste) {
      return res.status(404).json("Telefone não existe.");
    }

    await prisma.telefone.delete({ where: { id: intId } });

    return res.status(200).send();
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = telefoneRoutes;
