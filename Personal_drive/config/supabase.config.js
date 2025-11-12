const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;

const uploadToSupabase = async (file) => {
    const { originalname, mimetype, buffer } = file;

    const path = require('path');
    const { v4: uuidv4 } = require('uuid');
    
    const extension = path.extname(originalname);
    const baseName = path.basename(originalname, extension);

    const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
    const uniqueFilename = `${baseName}-${uniqueSuffix}${extension}`;

    const filePath = `uploads/${uniqueFilename}`;

    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, buffer, {
            contentType: mimetype,
            upsert: true // Add this to allow overwriting
        });

    if (error) {
        console.error('Supabase upload error:', error);
        throw error;
    }

    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;

    return {
        message: "File uploaded successfully",
        publicUrl,
        path: filePath,
    };
};

const removeFileFromSupabase = async (filePath) => {
    const { error } = await supabase
        .storage
        .from(BUCKET_NAME)
        .remove([filePath]);
    
    if (error) {
        console.error('Supabase remove error:', error);
        throw error;
    }
};

// Export everything properly
module.exports = {
    supabase,
    BUCKET_NAME,
    uploadToSupabase,
    removeFileFromSupabase,
};