const Aboutus = require("../models/Aboutus");

exports.GetAboutUs = async (req, res) => {
  await Aboutus.find({})
    .then((item) => {
      return res
        .status(200)
        .json({ userData: item, status: true, mesage: "succes" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).json({
        userData: { business: 0, premium: 0 },
        status: false,
        mesage: "not found",
      });
    });
};

exports.setAboutUs = async (req, res) => {
  const { title, body } = req.body;
  const newAboutus = new Aboutus({
     title,
    body,
  });

  await newAboutus.save((err, success) =>
    res.status(200).json({ userData: success, status: true, mesage: "success" })
  );
};

///deleteAboutUs
exports.deleteAboutUs = async (req, res) => {
  await Aboutus.findByIdAndDelete(req.params.id)
    .then((item) => {
      return res
        .status(200)
        .json({ userData: item, status: true, mesage: "succes" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).json({
        userData: { business: 0, premium: 0 },
        status: false,
        mesage: "not found",
      });
    });
};