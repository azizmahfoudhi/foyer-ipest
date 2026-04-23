const prisma = require('../config/db');

const createReclamation = async (req, res) => {
  try {
    const { title, description } = req.body;
    const reclamation = await prisma.reclamation.create({
      data: {
        title,
        description,
        createdById: req.user.id,
      },
    });
    res.status(201).json(reclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReclamations = async (req, res) => {
  try {
    const reclamations = await prisma.reclamation.findMany({
      include: {
        createdBy: { select: { name: true } },
        technician: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reclamations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, technicianId } = req.body;
    const reclamation = await prisma.reclamation.update({
      where: { id },
      data: {
        status,
        technicianId,
      },
    });
    res.json(reclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createReclamation, getReclamations, updateReclamation };
