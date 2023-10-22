import concepts from "../models/concepts.model.js";



export const createconcepts = async (req, res) => {
    const { conceptstitle, propertyconcept } = req.body;
    try {
        const newconcepts = new concepts({
            conceptstitle,
            propertyconcept
        });
        const savedconcepts = await newconcepts.save();
        res.json(savedconcepts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getconcepts = async (req, res) => {
    const concept = await concepts.find();
    res.json(concept);
}

export const updateconcepts = async (req, res) => {
    const { id } = req.params;
    const { conceptstitle, propertyconcept } = req.body;
    const concepts = await concepts.findById(id);
    if (!concepts) return res.status(404).json({ message: "Concepts not found" });
    concepts.conceptstitle = conceptstitle;
    concepts.propertyconcept = propertyconcept;
    const updatedconcepts = await concepts.save();
    res.json(updatedconcepts);
}





