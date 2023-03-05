import { Router } from "express";
import { Types } from "mongoose";
import {
  ClothingSize,
  Color,
  ModelMoney,
  Modelproduct,
  ModelState,
  Product,
} from "../model/model";
const router = Router();

router.post("/create", async (req, res) => {
  try {
    const { body } = req;

    /*   let product = await Product.findOne({ _id: body.data.product.id }); */
    console.log(body);
    if (body.product !== undefined) {
      const prod = await Product.findOne({ _id: body.product.id });
      const mod = await ModelState.findOne({ _id: body.modelState.id });
      const mdMon = await ModelMoney.findOne({ _id: body.modelMoneyValue.id });
      const col = await Color.findOne({ _id: body.modelPerColors[0].color.id });
      const siz = await ClothingSize.findOne({
        _id: body.modelPerColors[0].clothingSize.id,
      });

      const pdr = body.product;
      const mdlSize = body.modelPerColors[0].clothingSize;

      const product = new Product({
        _id: pdr.id,
        name: pdr.name,
        nameGender: pdr.nameGender,
        layoutsCols: pdr.layoutCols,
        layoutWidth: pdr.layoutWidth,
        urlImage: pdr.urlImage,
      });

      prod === null && (await product.save());

      const modelState = await ModelState({
        _id: body.modelState.id,
        name: body.modelState.name,
      });

      mod === null && (await modelState.save());

      const modelMoney = new ModelMoney({
        _id: body.modelMoneyValue.id,
        costPrice: body.modelMoneyValue.costPrice,
        discountPercentage: body.modelMoneyValue.discountPercentage,
      });

      mdMon === null && (await modelMoney.save());

      const color = new Color({
        _id: body.modelPerColors[0].color.id,
        tag: body.modelPerColors[0].color.tag,
        code: body.modelPerColors[0].color.code,
      });

      col === null && (await color.save());

      const size = new ClothingSize({
        _id: mdlSize.id,
        name: mdlSize.name,
        sizeShort: mdlSize.sizeShort,
        disclamer: mdlSize.disclamer,
        size: {
          cols: mdlSize.size.cols,
          rows: mdlSize.size.rows,
        },
      });

      siz === null && (await size.save());

      const modelProduct = new Modelproduct({
        _id: body.id,
        name: body.name,
        description: body.description,
        isObservationVisible: body.isObservationVisible,
        titleObservation: body.titleObservation,
        isPack: body.isPack,
        productId: prod === null ? product._id : prod._id,
        modelStatId: mod === null ? modelState._id : mod._id,
        modelMoneyValueId: mdMon === null ? modelMoney._id : mdMon._id,
        modelPerColors: [
          {
            _id: body.modelPerColors[0].id,
            urlImage: body.modelPerColors[0].urlImage,
            name: body.modelPerColors[0].name,
            gallery: body.modelPerColors[0].gallery,
            modelProductId: body.id,
            color: col === null ? body.modelPerColors[0].color.id : col._id,
            clothingSize: siz === null ? mdlSize.id : siz._id,
          },
        ],
      });

      await modelProduct.save();
    }

    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.get("/allProducts", async (req, res) => {
  try {
    const products = await Modelproduct.find();
    res.status(201).send(products);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prodduct = await Modelproduct.findOne({ _id: id }).populate(
      "productId"
    );
    res.status(201).send(prodduct);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.post("/createColors", async (req, res) => {
  try {
    const { body } = req;

    const color = new Color({
      tag: body.tag,
      code: body.code,
    });

    await color.save();

    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.post("/createProduct", async (req, res) => {
  try {
    const { body } = req;

    const product = new Product({
      name: body.name,
      nameGender: body.nameGender,
      layoutsCols: body.layoutsCols,
      urlImage: body.urlImage,
      layoutWidth: body.layoutWidth,
    });

    await product.save();
    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.post("/createMoney", async (req, res) => {
  try {
    const { body } = req;
    const money = new ModelMoney({
      costPrice: body.costPrice,
      discountPercentage: body.discountPercentage,
    });

    await money.save();
    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.post("/createClothing", async (req, res) => {
  try {
    const { body } = req;
    const clothing = new ClothingSize({
      disclamer: body.disclamer,
      sizeShort: body.sizeShort,
      name: body.name,
      size: {
        cols: ["Stock", "Talla"],
        rows: body.rows,
      },
    });
    await clothing.save();
    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.post("/forProduct/:id", async (req, res) => {
  try {
    const page = req.params.id;
    const { body } = req;
    const perPage = 9;
    const products = await Modelproduct.find({
      productId: { $eq: Types.ObjectId(body.product) },
    })
      .populate("modelMoneyValueId")
      .populate("modelPerColors.color")
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalItems = await Modelproduct.find({
      productId: { $eq: Types.ObjectId(body.product) },
    })
      .populate("modelMoneyValueId")
      .populate("modelPerColors.color")
      .count();

    const result = {
      products,
      totalItems,
    };

    res.status(201).send(result);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.post("/createModelProduct", async (req, res) => {
  try {
    const { body } = req;
    const modelState = new Modelproduct({
      name: body.name,
      description: body.description,
      isObservationVisible: body.isObservationVisible,
      titleObservation: body.titleObservation,
      isPack: body.isPack,
      productId: body.productId,
      modelStatId: "5f39d30512aceb44597d79d2",
      modelMoneyValueId: body.modelMoneyValueId,
      modelPerColors: [
        {
          urlImage: body.modelPerColors.urlImage,
          name: body.modelPerColors.name,
          gallery: body.modelPerColors.gallery,
          modelProductId: body.modelPerColors.modelProductId,
          color: body.modelPerColors.color,
          clothingSize: body.modelPerColors.clothingSize,
        },
      ],
    });

    await modelState.save();
    res.status(201).send("Exitoso");
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.get("/orderPagination/:id", async (req, res) => {
  try {
    const page = req.params.id;
    const perPage = 9;
    const totalItems = await Modelproduct.countDocuments();
    const products = await Modelproduct.find()
      .populate("modelPerColors.color")
      .populate("modelMoneyValueId")
      .skip((page - 1) * perPage)
      .limit(perPage);

    const result = {
      products,
      totalItems,
    };

    res.status(201).send(result);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.get("/getTypeProd", async (req, res) => {
  try {
    const tipos = await Product.find();
    res.status(201).send(tipos);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.post("/getForColor/:id", async (req, res) => {
  try {
    const page = req.params.id;
    const { body } = req;
    const perPage = 9;

    if (body.length > 1) {
      const data = body.map((col) => col.id);

      const products = await Modelproduct.find({
        "modelPerColors.color": {
          $in: data,
        },
      })
        .populate("modelMoneyValueId")
        .populate("modelPerColors.color")
        .skip((page - 1) * perPage)
        .limit(perPage);

      const totalItems = await Modelproduct.find({
        "modelPerColors.color": {
          $in: data,
        },
      })
        .populate("modelMoneyValueId")
        .populate("modelPerColors.color")
        .count();

      const result = {
        products,
        totalItems,
      };
      res.status(201).send(result);
    } else {
      console.log(body);
      const products = await Modelproduct.find({
        "modelPerColors.color": { $eq: Types.ObjectId(body[0].id) },
      })
        .populate("modelMoneyValueId")
        .populate("modelPerColors.color")
        .skip((page - 1) * perPage)
        .limit(perPage);

      const totalItems = await Modelproduct.find({
        "modelPerColors.color": { $eq: Types.ObjectId(body[0].id) },
      })
        .populate("modelMoneyValueId")
        .populate("modelPerColors.color")
        .count();

      const result = {
        products,
        totalItems,
      };
      res.status(201).send(result);
    }
  } catch (error) {
    res.status(501).send(error.message);
  }
});

router.get("/OrderForPrice", async (req, res) => {
  try {
    const products = await Modelproduct.find()
      .populate("modelPerColors.color")
      .populate("modelMoneyValueId");

    products.sort(function (a, b) {
      if (a.modelMoneyValueId.costPrice > b.modelMoneyValueId.costPrice) {
        return 1;
      }
      if (a.modelMoneyValueId.costPrice < b.modelMoneyValueId.costPrice) {
        return -1;
      }
      return 0;
    });
    

    const result = {
      products,
      totalItems,
    };

    res.status(201).send(products);
  } catch (error) {
    res.status(501).send(error.message);
  }
});

export default router;
