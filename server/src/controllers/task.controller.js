const prisma = require('../config/db');

// Assignments
const createAssignment = async (req, res) => {
  try {
    const { userId, dortoirId, type, shift, date } = req.body;
    const assignment = await prisma.assignment.create({
      data: {
        userId,
        dortoirId,
        type,
        shift,
        date: new Date(date),
      },
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssignments = async (req, res) => {
  try {
    const { userId, date } = req.query;
    const where = {};
    if (userId) where.userId = userId;
    if (date) {
        const start = new Date(date);
        start.setHours(0,0,0,0);
        const end = new Date(date);
        end.setHours(23,59,59,999);
        where.date = { gte: start, lte: end };
    }

    const assignments = await prisma.assignment.findMany({
      where,
      include: {
        user: { select: { name: true } },
        dortoir: true,
        absences: true,
        restaurantLogs: true,
      },
    });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Absences
const logAbsence = async (req, res) => {
  try {
    const { assignmentId, studentCount, absentCount, observations } = req.body;
    const absence = await prisma.absence.create({
      data: {
        assignmentId,
        studentCount,
        absentCount,
        observations,
      },
    });
    
    await prisma.assignment.update({
      where: { id: assignmentId },
      data: { completed: true }
    });

    res.status(201).json(absence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Restaurant
const logRestaurant = async (req, res) => {
  try {
    const { assignmentId, type, studentCount, observations } = req.body;
    const log = await prisma.restaurantLog.create({
      data: {
        assignmentId,
        type,
        studentCount,
        observations,
      },
    });

    await prisma.assignment.update({
      where: { id: assignmentId },
      data: { completed: true }
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAssignment, getAssignments, logAbsence, logRestaurant };
