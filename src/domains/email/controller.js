const Email = require("./model");
const nodemailer = require('nodemailer');

// Create a transporter using SMTP (e.g., Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.COMPANY_EMAIL, // Your email address
    pass: process.env.COMPANY_PASS, // Your email password (app-specific password if 2FA enabled)
  },
});

// Create a new email and send it
const createEmail = async (data) => {
  const { name, senderEmail, subject, message } = data;
  try {
    // Save the email data into MongoDB (Email model)
    const email = new Email({
      name, senderEmail, subject, message
    });

    // Define email options
    const mailOptions = {
      from: senderEmail,               // Sender's email (user's email)
      to: 'info@gbemisolayussufffoundation.org', // The company's email address
      subject,                         // Subject of the email
      text: message,                   // Email body (message)
    };

    // Send email using async/await (wrap nodemailer in a promise)
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return reject(error); // Reject if error occurs
        }
        resolve(info); // Resolve if email is sent successfully
      });
    });

    // Save email to the database after it is sent
    await email.save();

    return email; // Return the saved email document

  } catch (err) {
    console.error('Error:', err);
    throw err; // Rethrow error to be handled elsewhere
  }
};

// Get all emails
const getAllEmail = async () => {
  try {
    const emails = await Email.find();
    return emails;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow error for further handling
  }
};

// Get a single email by its ID
const getSingleEmail = async (_id) => {
  try {
    const email = await Email.findOne({ _id });
    return email;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow error for further handling
  }
};

// Update an email by ID
const updateEmail = async (emailId, data) => {
  try {
    const email = await Email.updateOne({ _id: emailId }, data);
    return email;
  } catch (err) {
    throw err; // Rethrow error for further handling
  }
};

// Delete an email by ID
const deleteEmail = async (emailId) => {
  try {
    const email = await Email.deleteOne({ _id: emailId });
    return { email };
  } catch (err) {
    throw err; // Rethrow error for further handling
  }
};

module.exports = {
  createEmail,
  getAllEmail,
  getSingleEmail,
  updateEmail,
  deleteEmail
};
