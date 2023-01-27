const noteModal = require("../modals/note");


const createNote = async (req,res) => {

    const {title, description} = req.body;

    const newNote = noteModal({
        title:title,
        description: description,
        userId: req.userId
    });

    try {

        await newNote.save();
        res.status(201).json(newNote);
    
    } catch (error) {

        console.log(error)
        res.status(500).json({msg: "something wnet wrong"})
        
    }
}

const updateNote = async (req,res) => {

    const id = req.params.id;
    const {title, description} = req.body;

    let newNote ={
        title : title,
        description: description,
        userId: req.userId
    }

    try {
        await noteModal.findByIdAndUpdate(id, newNote, {new: true})
        res.status(200).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "something wnet wrong"})
        
    }

}

const deleteNote = async (req,res) => {
    const id = req.params.id;
    try {
        
        let note = await noteModal.findByIdAndRemove(id);
        res.status(202).json(note)

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "something wnet wrong"})
        
    }


}

const getNote = async (req,res) => {

    try{

        let notes = await noteModal.find({userId: req.userId});
        res.status(200).json(notes)

    }catch(error){
        console.log(error)
        res.status(500).json({msg: "something wnet wrong"})
    }

}

module.exports = {createNote, updateNote, getNote, deleteNote}