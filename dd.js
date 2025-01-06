const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://medusa:8RB2QKdStaeapkVQ@cluster0.hykx6.mongodb.net/binDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const siteSchema = new mongoose.Schema({
    domain: String,
    bins: [String],
});

const Site = mongoose.model("Site", siteSchema, "sites");

// API Endpoint to get BINs for a specific domain
app.get("/bins/:domain", async (req, res) => {
    try {
        const site = await Site.findOne({ domain: req.params.domain });
        if (site) {
            res.json(site);
        } else {
            res.status(404).json({ message: "No BINs found for this domain" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
