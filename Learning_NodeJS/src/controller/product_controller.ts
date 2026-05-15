import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";
export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    // console.log("Request", req);
    const url = req.url;
    const method = req.method;
    const urlParts = url?.split("/");
    // console.log(urlParts);

    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;
    // console.log(id);
    //get all products 

    
    if (url === "/products" && method === "GET") {
        const products = readProduct();

        try {
            return sendResponse(res, 200, true, "Product Retrived Seccessfully", products);
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something Went Wrong", error);
        }

    }
    else if (method === "GET" && urlParts?.[1] === "products" && id) {
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        if (!product) {
            return sendResponse(res,404,false,"Product Not Found");
        }
        try {
            return sendResponse(res, 200, true, "Product Retrived Seccessfully", product);
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something Went Wrong", error);
        }
    }

    else if (method === "POST" && url === "/products") {

        const body = await parseBody(req);
        // console.log("Body : ", body);
        const products = readProduct();
        const newProduct = {
            id: Date.now(),
            // num:20,
            ...body
        };
        products.push(newProduct);
        insertProduct(products);
        return sendResponse(res, 200, true, "Product Created Seccessfully", newProduct);
    }

    else if (method === "PUT" && id !== null) {
        const body = await parseBody(req);
        const products = readProduct();

        const index = products.findIndex((p: IProduct) => p.id === id);
        // console.log(index);

        if (index < 0) {
             return sendResponse(res,404,false,"Product Not Found");
        }
        // console.log(products[index]);
        products[index] = { id: products[index].id, ...body };
        insertProduct(products);
        try {
            return sendResponse(res, 200, true, "Product Modified Seccessfully", products[index]);
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something Went Wrong", error);
        }
    }

    else if (method === "DELETE" && id !== null) {
        let products = readProduct();
        const index = products.findIndex((p: IProduct) => p.id === id);
        if (index < 0) {
              return sendResponse(res,404,false,"Product Not Found");
        }
        // products = products.filter((p: IProduct) => p.id !== id);
        products = products.splice(index, 1)
        insertProduct(products);
        try {
            return sendResponse(res, 200, true, "Product Deleted Seccessfully", products[index]);
        }
        catch (error) {
            return sendResponse(res, 500, false, "Something Went Wrong", error);
        }

    }

}