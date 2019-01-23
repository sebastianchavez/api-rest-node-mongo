const Product = require('../models/product')

const getProduct = (req,res) =>{
    let productId = req.params.productId

    Product.findById(productId, (err, product)=>{
        if(err) return res.status(500).send({message: `Error  al realizar peticion error: ${err}`})
        if(!product) return res.status(404).send({message: `El producto no existe`})

        return res.status(200).send({product})
    })
}

const getProducts = (req, res) =>{
    Product.find((err, product)=>{
        if(err) return res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!product) return res.status(404).send({message: `No existen productos`})
        return res.status(200).json(product)
    })
}

const saveProduct = (req,res) => {
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStore)=>{
        if (err) res.status(500).send({message:`Error al salvar en la base de datos error: ${err}`})
        res.status(200).send({product:productStore})
    })
}

const updateProduct = (req,res) =>{
    let productId = req.params.productId
    let body = req.body
    Product.findByIdAndUpdate(productId,body, (err,product) =>{
        if(err) res.status(500).send({message: `Error al actualizar producto: ${product}`})
        res.status(200).send({product})
    })
}

const deleteProduct = (req,res) =>{
    let productId = req.params.productId

    Product.findById(productId, (err, product)=>{
        if(err) res.status(500).send({message: `Error  al borrar el producto error: ${err}`})
        if(!product) res.status(404).send({message: `El producto no existe`})
        product.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar producto error: ${err}`})
            res.status(200).send({message: `El producto se ha eliminado`})
        })
    })
}


module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}