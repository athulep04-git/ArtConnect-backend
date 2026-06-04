const Request = require("../models/requestModel");

exports.addRequest = async (req, res) => {
  const userId = req.payload;
  const { artType, description, budget, deadline, address } = req.body;
  const referenceImage = req.file
    ? `http://localhost:3000/uploads/${req.file.filename}`
    : "";
  try {
    const newRequest = new Request({
      userId,
      artType,
      description,
      budget,
      deadline,
      referenceImage,
      address,
    });
    await newRequest.save();
    res.status(200).json({message: "Request sent successfully",newRequest,});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
