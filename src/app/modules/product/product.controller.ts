import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // // data validation using zod
    // const zodParsedData = productValidationSchema.parse(productData);

    // const result = await ProductServices.createProductIntoDB(zodParsedData);
    const result = await ProductServices.createProductIntoDB(productData);

    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      daa: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error: err,
      stack: err.stack || 'No stack trace available',
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();

    res.status(200).json({
      success: true,
      message: 'Product retrived successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrived successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const { productId } = req.params;

    const result = await ProductServices.updateProduct(productId, productData);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Validation failed',
      error: err,
      stack: err.stack || 'No stack trace available',
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};
export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
