import Work from "../models/work_register.model.js";
import { startOfMonth, endOfMonth } from 'date-fns';



export const getworks = async (req, res) => {
    const { workDate, workerId } = req.query; // Obtener workDate e isHoliday de la solicitud
    const query = {
        workerId
    };
    console.log(req.user.id);
    if (workDate) {
        const now = new Date(workDate)

        console.log(startOfMonth(now), endOfMonth(now))

        query.workDate = {
            $gte: startOfMonth(now),
            $lte: endOfMonth(now)
        };
    } else {
        res.status(401).json({ message: "You neet a date" });
        return
    }
    const works = await Work.find(query);
    res.json(works);
};


export const createWork = async (req, res) => {
    const { workDate, isHoliday, isWeekend, id } = req.body;
    console.log(req.user);
    const newWork = new Work({
        workerId: id,
        workDate,
        isHoliday,
        isWeekend
    })

    const savedWork = await newWork.save()
    res.json(savedWork)
};


export const getWork = async (req, res) => {
    console.log(req.params);
    const work = await Work.find({ workerId: req.params.id })
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