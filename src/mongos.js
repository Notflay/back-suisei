import mongoose, { mongo, Schema } from "mongoose";
import express from "express";
import { config } from "dotenv";
import axios from "axios";
import indexRoutes from "./controllers/Controll";
import cors from "cors";
import { Modelproduct } from "./model/model";

config();

const app = express();

try {
  mongoose.connect(process.env.MONGODB_URL);
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function crear() {
  try {
    let ropas = [];
    let lista = [];
    const modelsResponse = await axios.get(
      "https://api.kaituperu.com/api/ModelProducts"
    );

    let x = 15;
    do {
      x += 1;
      const rop = await axios.get(
        `https://api.kaituperu.com/api/ModelProducts?filter={"where":{"id":"${modelsResponse.data[x].id}"},"include":[{"relation":"product"},{"relation":"modelState"},{"relation":"modelPerColors","scope":{"include":[{"relation":"color"},{"relation":"clothingSize"}]}},{"relation":"modelPerProviders","scope":{"include":{"relation":"provider"}}},{"relation":"modelMoneyValue"}]}`
      );
      console.log(rop.data[0].product);
      ropas.push(rop.data[0]);
    } while (x < 35);
    console.log(ropas.length);
    ropas.map(async (data) => {
      let product = await Product.findOne({ _id: data.product.id });

      if (product === undefined) {
        product = new Product({
          _id: data.product.id,
          name: data.product.name,
          nameGender: data.product.nameGender,
          layoutsCols: data.product.layoutCols,
          layoutWidth: data.product.layoutWidth,
          urlImage: data.product.urlImage,
        });

        await product.save();
      }

      let modelState = await ModelState.findOne({ _id: data.modelState.id });

      if (modelState === undefined) {
        modelState = new ModelState({
          _id: data.modelState.id,
          name: data.modelState.name,
        });

        await modelState.save();
      }

      let modelMoneyValue = await ModelMoney.findOne({
        _id: data.modelMoneyValue.id,
      });

      if (modelMoneyValue === undefined) {
        modelMoneyValue = new ModelMoney({
          _id: data.modelMoneyValue.id,
          costPrice: data.modelMoneyValue.costPrice,
          discountPercentage: data.modelMoneyValue.discountPercentage,
        });

        await modelMoneyValue.save();
      }

      const modelProduct = new Modelproduct({
        _id: data.id,
        name: data.name,
        description: data.description,
        isObservationVisible: data.isObservationVisible,
        titleObservation: data.titleObservation,
        isPack: data.isPack,
        productId: product._id,
        modelStatId: modelState._id,
        modelMoneyValueId: modelMoneyValue._id,
      });

      await modelProduct.save();
      console.log(modelProduct);
    });
  } catch (error) {
    console.log(error.message);
  }
}

/* (async () => {
  const products = await Modelproduct.findOne({
    _id: "61d3785b4ccaa323fb6bad5e",
  })
    .populate("productId")
    .populate("modelStatId")
    .populate("modelMoneyValueId")
    .populate("modelPerColors.color")
    .populate("modelPerColors.clothingSize");
  console.log(products);
})(); */

app.use(indexRoutes);
app.listen(3000);
