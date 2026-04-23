const prisma = require('../config/db');

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const absenceCount = await prisma.absence.count();
    const restaurantCount = await prisma.restaurantLog.count();
    const reclamationCount = await prisma.reclamation.count({ where: { status: 'PENDING' } });

    res.json({
      users: userCount,
      absences: absenceCount,
      restaurant: restaurantCount,
      pendingReclamations: reclamationCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, deleteUser, getStats };
