// import * as tf from "@tensorflow/tfjs-node";
import fs from "fs";

// Load the TensorFlow.js model
// const Tumour_detect = await tf.loadLayersModel("file://path/to/your/model");

const class_labels = {
  0: "adenocarcinoma",
  1: "large.cell.carcinoma",
  2: "normal",
  3: "squamous.cell.carcinoma",
};

const treatments_dict = {
  0: "Adenocarcinoma is often treated with a combination of surgery, chemotherapy, and targeted therapy.",
  1: "Large cell carcinoma treatment may involve surgery, chemotherapy, and radiation therapy.",
  3: "Squamous cell carcinoma treatment may include surgery, radiation therapy, and immunotherapy.",
};

const preprocess_image = (img_path) => {
  const img = tf.node.decodeImage(fs.readFileSync(img_path));
  const img_array = img.resizeBilinear([224, 224]).toFloat();
  const expanded_img_array = img_array.expandDims(0);
  return expanded_img_array.div(127.5).sub(1.0);
};

const predict = (image_path, model) => {
  const img_array = preprocess_image(image_path);
  const predictions = model.predict(img_array);
  const predicted_class = predictions.argMax(1).dataSync()[0];
  return predicted_class;
};

export const detectTumeur = async (req, res) => {
  const base64Image = req.body.image;
  const imageBuffer = Buffer.from(base64Image, "base64");

  const temp_image_path = "/tmp/image.png";
  fs.writeFileSync(temp_image_path, imageBuffer);

  const predicted_class = predict(temp_image_path, Tumour_detect);
  const predicted_class_label = class_labels[predicted_class];
  const treatment = treatments_dict[predicted_class];

  fs.unlinkSync(temp_image_path);

  res.send({ predicted_class_label, treatment });
};
