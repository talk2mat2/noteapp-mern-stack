const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require('axios')
const UserSchema = require("../models/userMoodel");

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function getYear(){
  const d = new Date()
var amountOfYearsRequired = 1;
const time=d.setFullYear(d.getFullYear() + amountOfYearsRequired);
const year= new Date(time)
return year
}
function getDays(days){
  var d = new Date();
  const time=d.setDate(d.getDate() + days);
  const times= new Date(time)
  return times
}
exports.Login = async function (req, res) {
  const Password = req.body.password;
  const Email = req.body.email;
  if (!Password || !Email) {
    return res.status(404).send({ message: "password and email is required" });
  }

  if (!validateEmail(Email)) {
    return res
      .status(404)
      .json({ message: "user with this account is not registered" });
  }

  UserSchema.findOne({ Email }, async function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(404).json({
        message:
          "user with this email is not registered with us, concider registering",
      });
    } else if (user) {
      const match = await user.verifyPassword(Password);

      if (!match) {
        return res
          .status(401)
          .json({ message: "Error! , the entered password is not correct." });
      } else {
        user.Password = "";
        return res.json({
          userdata: user,
          token: jwt.sign({ user: user }, process.env.JWTKEY, {
            expiresIn: "17520hr",
          }),
        });
      }
    }
  });
};

exports.CheckIsRegistered = (req, res) => {
  const Email = req.body.email;

  UserSchema.findOne({ Email }, async function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(404).json({
        error: true,
        message: "This email is not registered on this site",
      });
    } else if (user) {
      res.status(200).json({
        error: false,
        message: "user is registered",
      });
    }
  });
};

exports.Register = async (req, res) => {
  const Password = req.body.password;
  const Email = req.body.email;

  if (!validateEmail(Email)) {
    return res
      .status(404)
      .json({ message: "pls use a valid email address to register" });
  }

  if (!Password || !Email) {
    return res.status(404).json({
      message: "oops! you didnt fill all values required,kindly try again",
    });
  }

  const existingUser = await UserSchema.findOne({ Email: Email });
  if (existingUser) {
    return res.status(401).json({
      message: `a user with email ${Email}is already registred, try to login`,
    });
  }

  try {
    const Passwordhash = bcrypt.hashSync(Password, 10);
    const newUser = new UserSchema({
      Email,
      Password: Passwordhash,
    });
    await newUser.save();
    //first level referrer
    //authenticate user here Login
    this.Login(req, res);
  } catch (err) {
    console.log(err);
    return res.status(501).send({
      message: "error occured pls try again or contact admin",
      err: err,
    });
  }
};

exports.UpdateMyAcctNumber = async (req, res) => {
  const { bank_Name, bank_Acct_Number } = req.body;
  if (!bank_Name) {
    return res.status(404).json({ message: "pls provide your bank_Name" });
  }
  if (!bank_Acct_Number) {
    return res.status(404).json({ message: "pls provide bank_Acct_Number" });
  }
  if (bank_Acct_Number && bank_Acct_Number.length > 15) {
    return res.status(404).json({ message: "account nmber is invalid" });
  }

  const params = { bank_Name, bank_Acct_Number };

  UserSchema.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: params,
    },
    { new: true, useFindAndModify: false }
  )
    .select("-Password")
    .then((user) => {
      return res.json({
        userdata: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ err: "an error occured,unable to send" });
    });
  // bank_Name: { type: String },
  // bank_Acct_Number: { type: String },
};

exports.UpdateClient = (req, res) => {
  UserSchema.findById(req.body.id)
    .then((user) => {
      return res.json({
        userdata: user,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send({ err: "an error occured,unable to send" });
    });
};

exports.ConfirmPaymentReceived = async (req, res) => {
  const { payerId } = req.body;

  if (!payerId) {
    console.log("no payer id provided");
    return res.status(404).json({ message: "pls provide your payerId" });
  }
  UserSchema.findById(req.body.id)
    .then((user) => {
      // console.log(user);
      user.downLiners.map(async (payers) => {
        if (payers._id === payerId) {
          // console.log(payers);
          // payers[payers._Id].paymentStatus = true;
          payers["paymentStatus"] = true;
          await user.save();
          UserSchema.findById(payerId)
            .then(async (resdata) => {
              resdata.paymentConfirmed = true;
              await resdata.save();
            })
            .catch((err) => {
              console.log(err);
              return res.status(501).json({ message: "an error occured" });
            });
          this.UpdateClient(req, res);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(404)
        .json({ message: "an error occured try again or contact admin" });
    });
};

// exports.UpdateUserData = async function (req, res) {
//   const {

//   } = req.body;
//   // for (values in req.body) {
//   //   if (req.body[values] === "Null") return (req.body[values] = null);
//   // }
//   const params = {

//   };
//   for (let prop in params) {
//     if (
//       params[prop] === "null" ||
//       params[prop] === undefined ||
//       params[prop] === null
//     ) {
//       delete params[prop];
//     }
//   }
//   // console.log(params);
//   UserSchema.findByIdAndUpdate(
//     { _id: req.body.id },
//     {
//       $set: params,
//     },
//     { new: true, useFindAndModify: false }
//   )
//     .select("-Password")
//     .then((user) => {
//       return res.json({
//         userdata: user,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(401).send({ err: "an error occured,unable to send" });
//     });
// };

exports.handleUpgradePlans=async(req,res)=>{
  const {plan,plan_date, payment_response} = req.body;
 
  if(!plan || !plan_date){
    return res.status(501).json({
message:"plan  or plan method not provided",
status:false,
    })
  }
  //we validate to allow only three type of plan
  if(plan!=='Basic'&& plan!=='Premium' &&plan!=='Business'){
    
    return res.status(501).json({
message:"invalid plan selected",
status:false
    })
  }
 try{
  const isPaid = await axios.get(
    `https://api.flutterwave.com/v3/transactions/${payment_response.transaction_id}/verify`,
    {
      headers: { Authorization: `Bearer ${process.env.FLUTTER_SECRET_KEY}` },
    }
  );
  if (!isPaid.data.status === "success") {
    return res
      .status(501)
      .json({ message: "payment wasnt successfull, try again",status:false });
  }

  if (isPaid.data.status === "success") {
  const expire_date=plan_date==="month"?getDays(30):plan_date==="year"?getYear():""
  const today=new Date()
const params={
plans:plan,
expire_date,
purchase_date:today,
payment_response
}


 UserSchema.findByIdAndUpdate(
  { _id: req.body.id },
  {
    $set: params,
  },
  { new: true, useFindAndModify: false }
)
  .select("-Password")
  .then((user) => {
    return res.status(200).json({
      userdata: user,
      status:true
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(401).send({ err: "an error occured,unable to send" });
  });
  }
 }
 catch(err){
   console.log(err)
 }

}