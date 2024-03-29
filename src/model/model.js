const mongoose = require("mongoose");

const { Schema } = mongoose;

const ModelProductSchema = new Schema({
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

const ProductSchema = new Schema({
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

const ModelStateSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const ModelMoneySchema = new Schema({
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

const ClothingSizeSchema = new Schema({
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

const ColorSchema = new Schema({
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

const UsuarioSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  carrito: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "Product" },
      cantidad: { type: Number, required: true },
      talla: { type: String, required: true },
    },
  ],
  role: { type: String, default: "cliente" },
});

const ComprobanteSchema = new Schema({
  clienteId: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  nombres: {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
  },
  tipoComprobante: {
    type: String,
    required: true,
  },
  documentoIde: {
    type: String,
    required: true,
  },
  numDocumento: {
    type: Number,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  distrito: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  referencia: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  tipoTarjeta: {
    type: String,
    required: true,
  },
  productId: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Modelproduct",
        required: true,
      },
      cantidad: { type: Number, required: true },
      talla: { type: String, required: true },
    },
  ],
});

exports.Usuario = mongoose.model("Usuario", UsuarioSchema);
exports.Modelproduct = mongoose.model("Modelproduct", ModelProductSchema);
exports.Product = mongoose.model("Product", ProductSchema);
exports.ModelState = mongoose.model("ModelState", ModelStateSchema);
exports.ModelMoney = mongoose.model("ModelMoney", ModelMoneySchema);
exports.ClothingSize = mongoose.model("ClothingSize", ClothingSizeSchema);
exports.Color = mongoose.model("Color", ColorSchema);
exports.Comprobante = mongoose.model("Comprobante", ComprobanteSchema);
