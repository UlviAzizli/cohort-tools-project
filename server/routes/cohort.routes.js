const express = require("express");
const router = express.Router();
const Cohort = require("../models/Cohort.model");

router.post("/", async (req, res) => {
  try {
    const cohort = new Cohort(req.body);
    await cohort.save();
    res.status(201).json(cohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findById(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndUpdate(
      req.params.cohortId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json(cohort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:cohortId", async (req, res) => {
  try {
    const cohort = await Cohort.findByIdAndDelete(req.params.cohortId);
    if (!cohort) {
      return res.status(404).json({ error: "Cohort not found" });
    }
    res.json({ message: "Cohort deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
