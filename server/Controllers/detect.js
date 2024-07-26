const fs = require("fs");
const sharp = require("sharp");
const axios = require("axios");
const path = require("path");

const detect = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // You can now access the uploaded file via req.fi
  const imagePath = req.file.path;
  // const imagePath = req.file.path;
  const imgBuffer = fs.readFileSync(imagePath);
  const imgBase64 = imgBuffer.toString("base64");
  const result = await axios({
    method: "POST",
    url: "https://detect.roboflow.com/building-footprint-extraction-mjenm/1",
    params: {
      api_key: "q1DYQt1kflnPVYRL3QaX",
    },
    data: imgBase64,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const response = result.data;

  let image = sharp(imgBuffer);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Create an overlay for bounding boxes
  let overlay = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).png();
  // .toBuffer();

  // Draw each bounding box on the overlay
  for (const prediction of response.predictions) {
    const { x, y, width: boxWidth, height: boxHeight } = prediction;

    const rectangle = await sharp({
      create: {
        width: boxWidth,
        height: boxHeight,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 0.5 },
      },
    })
      .png()
      .toBuffer();

    // overlay.composite([
    //   { input: rectangle, top: y - boxHeight / 2, left: x - boxWidth / 2 },
    // ]);

    overlay = await overlay.composite([
      { input: rectangle, top: y - boxHeight / 2, left: x - boxWidth / 2 },
    ]);
  }

  // Combine the original image with the overlay
  image = await image
    .composite([{ input: await overlay.toBuffer(), blend: "over" }])
    .toBuffer();

  // Save the result
  const outputPath = path.join('/tmp', 'result.png');
  fs.writeFileSync(outputPath, image);

  res.json({ message: "File received and processed", resultImage: outputPath });

  //   res.json({ message: "Hello World", file: imgBase64 });
};
// ------------------------------------------------imagecapture----------------------------//

const captureController = async (req, res) => {
  const img = req.body.image;
  // console.log(img)
  //   res.json({ message: "Hello World captoi" });

  const result = await axios({
    method: "POST",
    url: "https://detect.roboflow.com/building-footprint-extraction-mjenm/1",
    params: {
      api_key: "q1DYQt1kflnPVYRL3QaX",
    },
    data: img,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log(result.data);

  const response = result.data;

  const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
  const imgBuffer = Buffer.from(base64Data, "base64");

  //   const imgBuffer = Buffer.from(img, "base64");

  let image = sharp(imgBuffer);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  // Create an overlay for bounding boxes
  let overlay = await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).png();
  // .toBuffer();

  // Draw each bounding box on the overlay
  for (const prediction of response.predictions) {
    const { x, y, width: boxWidth, height: boxHeight } = prediction;

    const rectangle = await sharp({
      create: {
        width: boxWidth,
        height: boxHeight,
        channels: 4,
        background: { r: 255, g: 0, b: 0, alpha: 0.5 },
      },
    })
      .png()
      .toBuffer();

    // overlay.composite([
    //   { input: rectangle, top: y - boxHeight / 2, left: x - boxWidth / 2 },
    // ]);

    overlay = await overlay.composite([
      { input: rectangle, top: y - boxHeight / 2, left: x - boxWidth / 2 },
    ]);
  }

  // Combine the original image with the overlay
  image = await image
    .composite([{ input: await overlay.toBuffer(), blend: "over" }])
    .toBuffer();

  // Save the result
  const outputPath = "D:\\react\\project\\client\\output\\result.png";
  fs.writeFileSync(outputPath, image);

  res.json({ message: "File received and processed", resultImage: outputPath });
};

module.exports = { detect, captureController };
