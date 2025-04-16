const Email = require("./model");
const nodemailer = require('nodemailer');

// Create a new email and send it
const createEmail = async (data) => {
  const { name, email, subject, message } = data;
  let senderEmail = email;
  try {
    // Save the email data into MongoDB (Email model)
    const email = new Email({
      name, senderEmail, subject, message
    });

    // validate input
  if (!name || !senderEmail || !message) {
    throw Error("All fields are required")
  }
  // create email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 100000, // 10 seconds
    logger: true,   // Add this
    debug: true, 
    tls: {
      rejectUnauthorized: false, // ⚠️ disables SSL hostname check
    },
  });

  // email content
  const mailOptions = {
    from: `"Website Contact" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // send to yourself
    replyTo: senderEmail, // allows you to hit "Reply" to contact the user
    subject: `New message from ${name}`,
    html: `
      <h3>Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

    // await transporter.sendMail(mailOptions);
    // Save email to the database after it is sent
    const savePromise = email.save();
    await transporter.sendMail(mailOptions);
    await savePromise;
    
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
