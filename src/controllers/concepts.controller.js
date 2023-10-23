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
    console.log(req.params);
    console.log(req.body);
    const work = await concepts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!work) return res.status(404).json({ message: "Work not found" })
    res.json(work)

}






