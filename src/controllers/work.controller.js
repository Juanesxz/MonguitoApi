import Work from "../models/work_register.model.js";

export const getworks = async (req, res) => {
    const work = await Work.find({
        workerId: req.user.id
    }).populate("workerId");
    res.json(work);
};


export const createWork = async (req, res) => {
    const { workDate, workTitle, workColor } = req.body;
    console.log(req.user);
    const newWork = new Work({
        workerId: req.user.id,
        workDate,
        workTitle,
        workColor
    })

    const savedWork = await newWork.save()
    res.json(savedWork)
};


export const getWork = async (req, res) => {
    const work = await Work.findById(req.params.id)
    if (!work) return res.status(404).json({ message: "Work not found" })
    res.json(work)
}
export const deleteWork = async (req, res) => {
    const work = await Work.findByIdAndDelete(req.params.id)
    if (!work) return res.status(404).json({ message: "Work not found" })
    return res.sendStatus(204)
}
export const updateWork = async (req, res) => {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!work) return res.status(404).json({ message: "Work not found" })
    res.json(work)
}