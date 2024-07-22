const fs = require('fs');

const path = require('path');

function createUploadsDirectory() {
    const uploadsDir = path.join(__dirname, '../uploads');
    
    // Check if uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
        // Create uploads directory if it doesn't exist
        fs.mkdirSync(uploadsDir);
        console.log('Uploads directory created');
    }
}

module.exports = createUploadsDirectory;
