const multer = require('multer');
const path = require('path');
const { supabase, BUCKET_NAME } = require('./supabase.config');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToSupabase = async (file) => {
    const fileName = `${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

    if (error) throw error;

    const { data } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(fileName);

    return data.publicUrl;
};

module.exports = {
    upload,
    uploadToSupabase,
};