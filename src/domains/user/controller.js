const User = require("./model");
const comparedHashedData = require("../../util/compareHashedData");
const sendMail = require("../../util/sendMail");
const hashData = require("../../util/hashData");
const jwt = require("jsonwebtoken");

// signup // create a new user
const createNewUser = async (data) => {
  try {
    const { username, email, password } = data;

    // Checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // A user already exists
      throw Error("User with the provided email already exists");
    }
   else {
      // hash password
      const hashedPassword = await hashData(password);
      // Try to create new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      // save user
      const createdUser = await newUser.save();
      return createdUser;
    }
  } catch (err) {
    // console.log(err)
    throw err;
  }
};

const loginUser = async ({ email, password }, res) => {
  try {
    if (!email || !password) {
      throw Error("Empty fields not allowed");
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw Error("User does not exist");
    }
    const comparedHashedPass = await comparedHashedData(
      password,
      user.password
    );
    if (comparedHashedPass === true) {
      const userRes = {
        _id:user._id,
        username:user.username,
        emailVerification:user.emailVerification,
        email:user.email,
        userType:user.userType
      }
     
      const accessToken = jwt.sign(userRes, "SECRET");
     
      const response = {
        user:userRes,
        accessToken,
      };
      res.json({
        status: "SUCCESS",
        message: "Sigin successful",
        data: response,
      });
    } else {
      throw Error("Invalid Credentials");
    }
  } catch (err) {
    throw err;
  }
};

// logout user
const logoutUser = async ({ userId }) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw Error("User does not exist");
    }
    user.active = false;
    return user;
  } catch (err) {
    throw err;
  }
};
// update user
const updateUser = async (userId, data) => {
  try {
    const user = await User.updateOne({ _id: userId }, data);

    return user;
  } catch (err) {
    throw err;
  }
};
const getSingleUser = async (_id) => {
  try {
    const user = await User.findOne({ _id });
    return user;
  } catch (err) {
    throw err;
  }
};
const getAllUser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw err;
  }
};
// user forget password
const forgetPassword = async ({ email }) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw Error("User does not exists");
    }
        const url =  `${process.env.FRONTEND_BASE_URL}/reset-password.html?userId=${existingUser._id}`
    const mailoptions = {
      from: process.env.AUTH_EMAIL,
      to: existingUser.email,
      subject: "Forget Password Verification",
      html: `
      <div
    style="background-color: #222533; padding: 20px; font-size: 14px; line-height: 1.43; font-family: &quot;Helvetica Neue&quot;, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 10px auto 20px; font-size: 12px; color: #A5A5A5; text-align: center;">If you
        are unable to see this message, <a href="#" style="color: #A5A5A5; text-decoration: underline;">click here to
            view in browser</a></div>
    <div
        style="max-width: 600px; margin: 0px auto; background-color: #fff; box-shadow: 0px 20px 50px rgba(0,0,0,0.05);">
        <table style="width: 100%;">
            <tr>
                <td style="background-color: #fff;"><img alt="" src="img/logo.png" style="width: 70px; padding: 20px">
                </td>
                <td style="padding-left: 50px; text-align: right; padding-right: 20px;"><a href="#"
                        style="color: #261D1D; text-decoration: underline; font-size: 14px; letter-spacing: 1px;">Sign
                        In</a><a href="#"
                        style="color: #7C2121; text-decoration: underline; font-size: 14px; margin-left: 20px; letter-spacing: 1px;">Forgot
                        Password</a></td>
            </tr>
        </table>
        <div style="padding: 60px 70px; border-top: 1px solid rgba(0,0,0,0.05);">
            <h1 style="margin-top: 0px;">Reset Password</h1>
            <div style="color: #636363; font-size: 14px;">
                <p>Click the Link to reset your password</p>
            </div><a href=${url} style="padding: 8px 20px; 
                background-color: #4B72FA; color: #fff;
                 font-weight: bolder;
                  font-size: 16px; 
                  display: inline-block;
                   margin: 20px 0px; 
                   margin-right: 20px; 
                   text-decoration: none;">
                Reset Password
            </a>
            <h4 style="margin-bottom: 10px;">Need Help?</h4>
            <div style="color: #A5A5A5; font-size: 12px;">
                <p>If you have any questions you can simply reply to this email or find our contact information below.
                    Also contact us at <a href="#"
                        style="text-decoration: underline; color: #4B72FA;">test@example.com</a></p>
            </div>
        </div>
        <div style="background-color: #F5F5F5; padding: 40px; text-align: center;">
            <div style="margin-bottom: 20px;"><a href="#" style="display: inline-block; margin: 0px 10px;"><img alt=""
                        src="img/social-icons/twitter.png" style="width: 28px;"></a><a href="#"
                    style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/social-icons/facebook.png"
                        style="width: 28px;"></a><a href="#" style="display: inline-block; margin: 0px 10px;"><img
                        alt="" src="img/social-icons/linkedin.png" style="width: 28px;"></a><a href="#"
                    style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/social-icons/instagram.png"
                        style="width: 28px;"></a></div>
            <div style="margin-bottom: 20px;"><a href="#"
                    style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Contact
                    Us</a><a href="#"
                    style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Privacy
                    Policy</a><a href="#"
                    style="text-decoration: underline; font-size: 14px; letter-spacing: 1px; margin: 0px 15px; color: #261D1D;">Unsubscribe</a>
            </div>
            <div style="color: #A5A5A5; font-size: 12px; margin-bottom: 20px; padding: 0px 50px;">You are receiving this
                email because you signed up for Light Admin. We use Light Admin to send our emails</div>
            <div style="margin-bottom: 20px;"><a href="#" style="display: inline-block; margin: 0px 10px;"><img alt=""
                        src="img/market-google-play.png" style="height: 33px;"></a><a href="#"
                    style="display: inline-block; margin: 0px 10px;"><img alt="" src="img/market-ios.png"
                        style="height: 33px;"></a></div>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                <div style="color: #A5A5A5; font-size: 10px; margin-bottom: 5px;">1073 Madison Ave, suite 649, New York,
                    NY 10001</div>
                <div style="color: #A5A5A5; font-size: 10px;">Copyright 2018 Light Admin template. All rights reserved.
                </div>
            </div>
        </div>
    </div>
        </div>`,
    };
    // save otp record
    await sendMail(mailoptions);
    return {
      userId: existingUser._id,
    };
  } catch (err) {
    throw err;
  }
};
const updatePassword = async ({ userId, password }) => {
  try {
    const user = await User.findOne({ _id: userId }).select('+password');
    if (!user) {
      throw Error("User Account not found");
    }
    // const hashPassword = await hashData(password);
    // user.password = hashPassword;
    user.save();
    return { userId };
  } catch (err) {
    throw err;
  }
};
const deleteUser = async (userId) => {
  try {
    const user = await User.deleteOne({ _id: userId });
    return {
      user,
    };
  } catch (err) {
    throw err;
  }
};
// find users by username or first name or lastname
const findUserById = async (_id) => {
  try {
    const user = await User.findOne({ _id });
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createNewUser,
  updatePassword,
  getAllUser,
  loginUser,
  forgetPassword,
  logoutUser,
  updateUser,
  getSingleUser,
  deleteUser,
  findUserById
};
