const express = require("express");
const router = express.Router();
const Student = require("../models/Student.model");

router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
