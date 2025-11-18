import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/data-source";
import { Billitem } from "../entities/Billitem.entity";
import { Product } from "../entities/Product.entity";
import { Sales } from "../entities/Sales.entity";
import { ApiError } from "../utils/apiError";

const productRepo = dataSource.getRepository(Product);
const billitemRepo = dataSource.getRepository(Billitem);
const saleRepo = dataSource.getRepository(Sales);

export const handleSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = req.body;
    console.log(req.body);
    console.log(items);

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new ApiError("items not found", 404);
    }

    let totalSalesPrice = 0;
    let totalTax = 0;

    const billitems = [];

    for (const item of items) {
      console.log(item.quantity);
      console.log(item.product_id);

      const product = await productRepo.findOne({
        where: { product_id: item.product_id },
      });

      console.log(product);

      if (!product) throw new ApiError("Product not found", 404);

      if (product.currentStock < item.quantity)
        throw new ApiError("Insufficient stock", 400);

      const itemSubTotal = item.quantity * product.price;
      const itemTax = (itemSubTotal * product.taxPercentage) / 100;

      totalSalesPrice += itemSubTotal;
      totalTax += itemTax;

      product.currentStock -= item.quantity;
      await productRepo.save(product);

      //   const billitem = billitemRepo.create({
      //     product,
      //     quantity: item.quantity,
      //     salePrice: itemSubTotal,
      //   });

      billitems.push({
        product,
        quantity: item.quantity,
        salePrice: itemSubTotal,
      });
    }

    let discount = 0;
    let amountToPay = 0;

    if (totalSalesPrice > 1000 && totalSalesPrice < 2000) {
      discount = totalSalesPrice * 0.01;

    } else if (totalSalesPrice > 2000) {
      discount = totalSalesPrice * 0.02;
    }

    amountToPay = totalSalesPrice - discount + totalTax;

    const newSale = saleRepo.create({
      amountToPay,
      discount,
      totalSalesPrice,
      totalTax,
      billitem: billitems,
    });
    await saleRepo.save(newSale);

    for (const b of billitems) {
      const billitem = billitemRepo.create({
        product: b.product,
        quantity: b.quantity,
        salePrice: b.salePrice,
        sales: newSale,
      });

      await billitemRepo.save(billitem);
    }

    res.status(200).json({ success: true, message: "sale created", newSale });
  } catch (error) {
    next(error);
  }
};

export const fetchSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await saleRepo.find({
      relations: ["billitem"],
      order: { soldAt: "DESC" },
    });


    res.status(200).json({
      success: true,
      message: "Sales Fetched Successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};
