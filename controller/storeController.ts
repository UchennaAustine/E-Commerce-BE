import { Request, Response } from "express";
import { streamUpload } from "../utils/stream";
import storeModel from "../model/storeModel";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, cost } = req.body;

    const { secure_url, public_id }: any = await streamUpload(req);

    const store = await storeModel.create({
      title,
      cost,
      image: secure_url,
      imageID: public_id,
    });

    return res.status(201).json({
      message: `Registration successful`,
      data: store,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Error Occured during store creation: ${error.message}`,
      info: error,
    });
  }
};

export const ViewProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;

    const user = await storeModel.findOne({ productID });

    return res.status(201).json({
      message: `This is your request product`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Error Occured during getting requested product: ${error.message}`,
      info: error,
    });
  }
};

export const ViewAllProducts = async (req: Request, res: Response) => {
  try {
    const user = await storeModel.find();

    return res.status(20).json({
      message: `All Products: ${user.length}`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: `Error Occured during viewing all products: ${error.message}`,
      info: error,
    });
  }
};
