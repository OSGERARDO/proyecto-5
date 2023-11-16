import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'Nombre es requerido' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send
                ({
                    success: true,
                    message: 'Categoria ya existe'
                })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        return res.status(201).send
            ({
                success: true,
                message: 'nueva categoria creada',
                category

            })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error en Categoria'
        })

    }
};
//update category

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Categoria actualizada con exito ",
            category,

        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error al actualizar la categoría'
        });
    }
};


// get all cat

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            succes: true,
            message: 'lista de todas las categorías',
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error al obtener todas las categorías'
        })

    }
};

// single category
export const singleCategoryController = async (req, res) => {
    try {

        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: 'obtener una sola categoría con éxito',
            category
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error al obtener una sola categoría'
        })

    }
};

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Categoria eliminada con exito",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'error al eliminar la categoría'
        })
    }
};




