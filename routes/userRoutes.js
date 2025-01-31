const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const path = require("path");
const fs = require("fs");
const { PDFDocument, rgb } = require("pdf-lib");
const nodemailer = require("nodemailer");


// POST route to handle form submission
router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, dob, gName, gEmail, gPhone, ageGroup } = req.body;
        console.log("req.bod : ", req.body);    
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: true, message: "Record already exists please try with new email!" });
        }
        console.log("existingUser : ",existingUser);  
        const newUser = new Users({
            name,
            email,
            phone,
            dob,
            gName,
            gEmail,
            gPhone,
            ageGroup,
        });
        await newUser.save();
        res.status(201).json({ error: false, message: 'Form submitted successfully' });
    } catch (err) {
        res.status(500).json({  error: true, message: 'Error submitting form', error: err });
    }
});


async function editExistingPDF(inputPath, outputPath, options) {
    // Load the existing PDF
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Add new text
    firstPage.drawText(options?.name  || 'Testing', {
        x: 200,
        y: 330,
        size: 27,         
        color: rgb(0, 0, 0), // Red color
    });

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(path.join(__dirname, "", outputPath), modifiedPdfBytes);

    console.log("PDF modified successfully!");
}


// POST route to handle form submission
router.post('/get-card', async (req, res) => {
    try {
        const { name , email } = req.body;
        const filePath = path.join(__dirname, "", "certificate.pdf"); // Adjust the path
        const outputPath = path.join(__dirname, "", "quizcertificate.pdf");
        // Run the function
        await editExistingPDF(filePath, "quizcertificate.pdf", {name});
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: "gmail", // You can use other email providers like Outlook, Yahoo, etc.
            auth: {
                user: process.env.AUTH_MAIL,  // Your email address
                pass: process.env.AUTH_MAIL_PASSWORD   // App password (not your actual password)
            }
        });
       //Email options
        const mailOptions = {
            from: process.env.AUTH_MAIL,
            to: email, // Change to recipient's email
            subject: "Congratulations you got the certificate!",
            text: "Thanks for participating in quiz!",
            attachments: [
                {
                  filename: path.basename(outputPath), // Get filename from path
                  path: outputPath, // File location
                },
              ],
        };
        transporter.sendMail(mailOptions).then((res)=> { console.log(JSON.stringify(res))});     
        res.status(201).json({
            error: false,
            message: `Certificate sent to your mails ${email}!`
        });
    
    } catch (err) {
        console.log(err)
        res.status(500).json({ error:true, message: 'Error submitting form', error: err });
    }
});

module.exports = router;
