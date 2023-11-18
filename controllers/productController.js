import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";


export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Nombre es requerido' })
            case !description:
                return res.status(500).send({ error: 'descripción es requerida' })
            case !price:
                return res.status(500).send({ error: 'Precio es requerido' })
            case !category:
                return res.status(500).send({ error: 'Categoria es requerida' })
            case !quantity:
                return res.status(500).send({ error: 'Cantidad es requerida' })
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: 'La foto es obligatoria y debe tener menos de 1 MB.' })

        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.ContentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Producto creado con exito',
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error al crear el producto'
        })
    }
};


//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
            .find({})
            .populate('category')
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 })
        res.status(200).send({
            succes: true,
            counTotal: products.length,
            message: "AllProducts",
            products,

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error al obtener productos',
            error: error.message
        })
    }
};

// get single product 

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: 'Producto único obtenido',
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error al obtener un solo producto',
            error
        })
    }
};

//get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send
            ({
                success: false,
                message: 'error al obtener foto',
                error
            })
    }
};

//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: 'Producto Eliminado con exito'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error producto no se ha eliminado',
            error
        })
    }
};

//update product
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Nombre es requerido' })
            case !description:
                return res.status(500).send({ error: 'descripción es requerida' })
            case !price:
                return res.status(500).send({ error: 'Precio es requerido' })
            case !category:
                return res.status(500).send({ error: 'Categoria es requerida' })
            case !quantity:
                return res.status(500).send({ error: 'Cantidad es requerida' })
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: 'La foto es obligatoria y debe tener menos de 1 MB.' })

        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.ContentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Producto Actualizado con exito',
            products,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error al actualizar el producto'
        })
    }
};


////////////////////////////////////////////////////////////////////////////////////////////
// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error al filtrar productos",
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error en el recuento de productos",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 2;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error en el control por página",
            error,
        });
    }
};


//////////////////////////////////////////////////////////

// search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const resutls = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(resutls);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error en la API del producto de búsqueda",
            error,
        });
    }
};

// similar products
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error al obtener el producto relacionado",
            error,
        });
    }
};

// get products by category
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error al obtener productos",
        });
    }
};