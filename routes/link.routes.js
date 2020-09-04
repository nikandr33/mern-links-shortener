const { Router } = require("express");
const shortid = require("shortid");
const Link = require("../models/Link");
const middlewares = require("../middlewares");
const router = Router();

router.post("/generate", middlewares.auth, async (req, res) => {
  try {
    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) return res.json({ link: existing });

    const to = process.env.BASEURL + "/t/" + code;

    const link = new Link({ from, to, code, owner: req.user.userId });

    await link.save();

    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/", middlewares.auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const link = await Link.findById(id);
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
