const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer.confing');
const { uploadToSupabase, removeFileFromSupabase } = require("../config/supabase.config");
const filemodel = require('../models/files.model');
const authMiddleware = require('../middlewares/auth');



router.get("/home", authMiddleware, async (req, res) => {
    const userfiles = await filemodel.find({
        user: req.user.userid
    })

    res.render("home", { files: userfiles });
});

router.post("/upload", authMiddleware, upload.single('file'), async (req, res) => {
    const result = await uploadToSupabase(req.file);

    const newfile = await filemodel.create({
        path: result.path,
        originalname: req.file.originalname,
        user: req.user.userid
    })

    res.redirect('/home');
});

router.post('/delete/:id', authMiddleware, async (req, res) => {
    const file = await filemodel.findById(req.params.id); 
    if (!file) return res.status(404).send("File not found");

    await removeFileFromSupabase(file.path);
    await filemodel.findByIdAndDelete(req.params.id);

    res.redirect('/home'); 
});



module.exports = router


// try {
//     const file = req.file;
//     if (!file) return res.status(400).send("No file uploaded");

//     const result = await uploadToSupabase(file);
//     res.status(200).json({
//         message: "File uploaded to Supabase successfully",
//         data: result,
//     });
// } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ error: "Failed to upload file to Supabase" });
// }