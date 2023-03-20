import mongoose, { mongo, Schema } from "mongoose";

const ModelProductSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isObservationVisible: {
    type: Boolean,
  },
  titleObservation: {
    type: String,
  },
  isPack: {
    type: Boolean,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  modelStatId: {
    type: Schema.Types.ObjectId,
    ref: "ModelState",
    required: true,
  },
  modelMoneyValueId: {
    type: Schema.Types.ObjectId,
    ref: "ModelMoney",
    required: true,
  },
  modelPerColors: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      urlImage: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      gallery: [
        {
          type: String,
          required: true,
        },
      ],
      modelProductId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      color: {
        type: Schema.Types.ObjectId,
        ref: "Color",
      },
      clothingSize: {
        type: Schema.Types.ObjectId,
        ref: "ClothingSize",
        required: true,
      },
    },
  ],
});

const ProductSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  nameGender: {
    type: String,
    required: true,
  },
  layoutsCols: { type: Number },
  urlImage: { type: String },
  layoutWidth: { type: Number },
});

const ModelStateSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const ModelMoneySchema = new mongoose.Schema({
  costPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const ClothingSizeSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  disclamer: {
    type: String,
    required: true,
  },
  sizeShort: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    cols: [],
    rows: [],
  },
});

const ColorSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const Usuario = mongoose.model("Usuario", UsuarioSchema);
export const Modelproduct = mongoose.model("Modelproduct", ModelProductSchema);
export const Product = mongoose.model("Product", ProductSchema);
export const ModelState = mongoose.model("ModelState", ModelStateSchema);
export const ModelMoney = mongoose.model("ModelMoney", ModelMoneySchema);
export const ClothingSize = mongoose.model("ClothingSize", ClothingSizeSchema);
export const Color = mongoose.model("Color", ColorSchema);
