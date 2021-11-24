const Privacies = require("../models/privacies");

exports.GetPrivacies = async (req, res) => {

  await Privacies.find({})
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
exports.deletePrivacy = async (req, res) => {

  await Privacies.findByIdAndDelete(req.params.id)
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

exports.setPrivacies = async (req, res) => {
  const { title, body } = req.body;

  const newPrivacies = new  Privacies({
     title,
    body,
  });
  await newPrivacies.save((err, success) =>
    res.status(200).json({ userData: success, status: true, mesage: "success" })
  );
};
