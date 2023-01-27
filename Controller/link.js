const { findOne } = require("../model/link");
const Link = require("../model/link");

const getLink = async (request, response) => {
  try {
    const Data = await Link.find();
    response.status(200).json(Data);
  } catch (error) {
    console.log(error);
  }
};

const createLink = async (request, response) => {
  const url = request.body;
  try {
    const link = await Link.create(url);
    response.status(200).json({
      message: "successfully created link",
      data: {
        link: link,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOriginal = async (request, response) => {
  try {
    const url = request.params.id;
    const urlq = await Link.findOne({ Short: url });
    response.send({
      Original: urlq.Long,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createLink,
  getLink,
  getOriginal,
};
