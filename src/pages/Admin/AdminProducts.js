import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, getAllCategories, getCategories, updateCategory } from '../../redux/slices/categories';
import { Avatar, Box, Button, Card, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { createProduct, deleteProduct, getAllProductsByCategory, getProductsByCategory, getProductsError, getProductsLoading, updateProduct } from '../../redux/slices/products';
import Refresh from '@mui/icons-material/Loop';
const AdminProducts = () => {

    // async function fetchCategories() {
    //     const res = await CategoryDataService.getAllCategories();
    //     console.log(res);
    // }



    const dispatch = useDispatch();
    const [categoryId, setCategoryId] = useState();
    const products = useSelector(getProductsByCategory);
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getProductsLoading);
    const isError = useSelector(getProductsError);
    const [selected, setSelected] = useState(-1);
    const [variants, setVariants] = useState([]);

    const [selectedProduct, setselectedProduct] = useState(products ? products[0] : {});
    // const [selectedProduct, setselectedProduct] = useState({
    //     categoryId: '#1',
    //     categoryName: "name",
    //     categoryImageUrl: "imageUrl",
    //     categoryType: "type"
    // });
    const [addProduct, setAddProduct] = useState({
        "productCategoryId": "",
        "productName": "Nutty Delights",
        "productImageUrl": "https://m.media-amazon.com/images/I/61-HeXX496L.jpg",
        "productNumberOfReviews": 0,
        "productPrice": 0,
        "productDiscount": 0,
        "productStockCount": 0,
        "productDescription": "",
    });
    const [addVariant, setAddVariantProduct] = useState({
        "weight": "",
        // "productImageUrl": "https://m.media-amazon.com/images/I/61-HeXX496L.jpg",
        // "productNumberOfReviews": 0,
        "purchasingPrice": 100,
        "sellingPrice": 100,
        "discount": 0,
        "quantity": 0,
        // "productDescription": "",
    });



    //functions to handle update category
    const handleUpdatedNameChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productName: e.target.value
        }))
    }
    const handleUpdatedDescriptionChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productDescription: e.target.value
        }))
    }
    const handleUpdatedCategoryChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productCategoryId: e.target.value
        }))
    }
    const handleUpdatedImageChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productImageUrl: e.target.value
        }))
    }

    const handleProductSelection = (e, index, product) => {
        setSelected(index);
        setselectedProduct(product);
    }
    //functions to handle update category
    const handleAddNameChange = (e) => {
        // console.log(e.target.value)
        setAddProduct((prev) => ({
            ...prev,
            productName: e.target.value
        }))
    }
    const handleAddDescriptionChange = (e) => {
        // console.log(e.target.value)
        setAddProduct((prev) => ({
            ...prev,
            productDescription: e.target.value
        }))
    }
    const handleAddCategoryChange = (e) => {
        // console.log(e.target.value)
        setAddProduct((prev) => ({
            ...prev,
            productCategoryId: e.target.value
        }))
    }
    const handleAddImageChange = (e) => {
        // console.log(e.target.value)
        setAddProduct((prev) => ({
            ...prev,
            productImageUrl: e.target.value
        }))
    }



    //variants
    const handleUpdatedStockChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productStockCount: e.target.value
        }))
    }
    const handleUpdatedPurchasingPriceChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productPurchasingPrice: e.target.value
        }))
    }
    const handleUpdatedSellingPriceChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productPrice: e.target.value
        }))
    }
    const handleUpdatedDiscountChange = (e) => {
        // console.log(e.target.value)
        setselectedProduct((prev) => ({
            ...prev,
            productDiscount: e.target.value
        }))
    }


    //add variants
    const handleAddStockChange = (e) => {
        // console.log(e.target.value)
        setAddVariantProduct((prev) => ({
            ...prev,
            quantity: e.target.value
        }))
    }
    const handleAddPurchasingPriceChange = (e) => {
        // console.log(e.target.value)
        setAddVariantProduct((prev) => ({
            ...prev,
            purchasingPrice: e.target.value
        }))
    }
    const handleAddSellingPriceChange = (e) => {
        // console.log(e.target.value)
        setAddVariantProduct((prev) => ({
            ...prev,
            sellingPrice: e.target.value
        }))
    }
    const handleAddDiscountChange = (e) => {
        // console.log(e.target.value)
        setAddVariantProduct((prev) => ({
            ...prev,
            discount: e.target.value
        }))
    }
    const handleAddWeightChange = (e) => {
        // console.log(e.target.value)
        setAddVariantProduct((prev) => ({
            ...prev,
            weight: e.target.value
        }))
    }


    const handleUpdateProduct = async (id) => {

        console.log("id", id);
        var product = {
            productId: id,
            ...selectedProduct
        }
        dispatch(updateProduct({ product }));



    }


    console.log(selectedProduct?.productVariants)


    const handleAddProduct = async () => {
        console.log(addProduct);
        const data = {
            ...addProduct,
            productVariants: [...variants],
        }
        dispatch(createProduct(data));
        setVariants([]);


    }

    //function to delete the category
    const handleDeleteProduct = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        var result = confirm(`Confirm to delete ${selectedProduct.productName}?`);

        if (result) {
            dispatch(deleteProduct({ id }))
        }

    }

    const handleRefresh = () => {

        dispatch(getAllProductsByCategory({ categoryId }))
    }
    useEffect(() => {

        dispatch(getAllProductsByCategory({ categoryId }))
        dispatch(getAllCategories());

    }, [categoryId, dispatch])


    return (
        <div>
            {
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px' }}>

                    <Box sx={{ width: '96vw' }}>

                        <Box sx={{ display: 'flex', gap: '10px', }}>
                            <Paper>
                                <Box sx={{}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'start', height: '40px', alignItems: 'center', gap: '10px' }}>
                                        <FormControl required sx={{ margin: '0x', minWidth: 10, width: 150, height: '40px' }}>
                                            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                                            <Select
                                                // fullWidth
                                                // autoWidth
                                                sx={{ width: '120px', minWidth: '100px' }}
                                                variant='standard'
                                                // labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={categoryId || ""}
                                                label="Category *"
                                                onChange={(e) => { setCategoryId(e.target.value) }}
                                            >
                                                <MenuItem value='null'>All</MenuItem>
                                                {

                                                    categories?.map((cat, i) => (
                                                        <MenuItem key={i} value={cat.categoryId}>{cat.categoryName}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{`Total : ${products?.length}`}</Typography>
                                        <IconButton onClick={handleRefresh}>
                                            <Refresh />
                                        </IconButton>
                                    </Box>
                                    {/* <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                        <FormControl required sx={{ margin: '0x', minWidth: 10, width: 150, height: '40px' }}>
                                            <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                                            <Select
                                                // fullWidth
                                                // autoWidth
                                                sx={{ width: '120px', minWidth: '100px' }}
                                                variant='standard'
                                                // labelId="demo-simple-select-required-label"
                                                id="demo-simple-select-required"
                                                value={categoryId || ""}
                                                label="Category *"
                                                onChange={(e) => { setCategoryId(e.target.value) }}
                                            >
                                                <MenuItem value='null'>All</MenuItem>
                                                {

                                                    categories?.map((cat, i) => (
                                                        <MenuItem key={i} value={cat.categoryId}>{cat.categoryName}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>

                                    </Box> */}
                                </Box>

                            </Paper>
                            <Paper sx={{ minheight: '500px', width: '40vw', padding: '15px' }}>
                                <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{"Update Product"}</Typography>
                                <Box sx={{ gap: '10px', display: selected > -1 ? "inherit" : 'inherit' }}>
                                    <TextField
                                        size='small'
                                        onChange={handleUpdatedNameChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Name"
                                        value={selectedProduct?.productName || ""}
                                    // defaultValue="product"
                                    />
                                    <TextField
                                        size='small'
                                        onChange={handleUpdatedDescriptionChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Description"
                                        value={selectedProduct?.productDescription || ""}
                                    // defaultValue="product"
                                    />
                                    <FormControl fullWidth required sx={{ marginBlock: '10px', minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                                        <Select
                                            // size='small'
                                            fullWidth
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={selectedProduct?.productCategoryId || ""}
                                            label="Category *"
                                            onChange={handleUpdatedCategoryChange}
                                        >
                                            {
                                                categories?.map((cat, i) => (
                                                    <MenuItem key={i} value={cat.categoryId}>{cat.categoryName}</MenuItem>
                                                ))
                                            }
                                        </Select>

                                    </FormControl>
                                    <TextField
                                        size='small'
                                        onChange={handleUpdatedImageChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        value={selectedProduct?.productImageUrl || ""}
                                        id="outlined-required"
                                        label="Image Url"
                                    // defaultValue="image url"
                                    />
                                    <Typography>Variants</Typography>
                                    <Card variant='outlined'>
                                        {console.log(selectedProduct)}
                                        {

                                            selectedProduct?.productVariants?.map((item, i) => (
                                                <ListItem key={item?.productId} disablePadding >
                                                    <Box height={'50px'} width={5} sx={{ background: item.quantity > 0 ? "green" : 'red' }}></Box>
                                                    <ListItemButton onClick={(e) => { handleProductSelection(e, i, item) }} sx={{ backgroundColor: selected === i ? '#ffa5001f' : 'white', }} >

                                                        <ListItemText
                                                            sx={{ fontWeight: selected === i ? 'bold !important' : '400', color: item.quantity === 0 ? "red" : 'green' }}
                                                            primary={`${i + 1}. ${item?.weight}`}
                                                            secondary={`selling price :₹ ${item.sellingPrice} | discount : ₹${item.discount} | stock : ${item.quantity}`}
                                                        />
                                                        {/* <Box sx={{}} height={'50px'} width={5} sx={{ background: item.productStockCount > 0 ? "green" : 'red' }}></Box> */}

                                                    </ListItemButton>
                                                    {/* <Divider sx={{ margin: '2px', height: '1px' }}></Divider> */}

                                                </ListItem>
                                            ))
                                        }

                                    </Card>

                                    <TextField
                                        size='small'
                                        onChange={handleUpdatedStockChange}
                                        sx={{ margin: '10px 0px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Stock Count"
                                        value={selectedProduct?.productStockCount || 0}
                                    // defaultValue="Nuts"
                                    />


                                    <TextField
                                        size='small'
                                        onChange={handleUpdatedPurchasingPriceChange}
                                        sx={{ margin: '10px 0px 0 10px' }}                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Purchasing Price"
                                        value={selectedProduct?.categoryType || ""}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        size='small'
                                        onChange={handleUpdatedSellingPriceChange}
                                        sx={{ margin: '10px 0px' }}                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Selling Price"
                                        value={selectedProduct?.productPrice || ""}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        size='small'
                                        onChange={handleUpdatedDiscountChange}
                                        sx={{ margin: '10px 0px 0 10px' }}                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Discount"
                                        value={selectedProduct?.productDiscount || ""}
                                    // defaultValue="Nuts"
                                    />


                                </Box>
                                <Box sx={{ display: selected > -1 ? 'flex' : 'flex', justifyContent: 'start', marginLeft: '0px', gap: '20px' }}>
                                    <Button onClick={() => { handleDeleteProduct(selectedProduct?.productId) }} sx={{ background: 'red' }} variant='contained'>Delete</Button>
                                    <Button onClick={() => { handleUpdateProduct(selectedProduct?.productId) }} sx={{ background: 'orange' }} variant='contained'>Update </Button>
                                </Box>
                            </Paper>

                            <Paper sx={{ minheight: '500px', width: '40vw', padding: '15px' }}>
                                <Typography sx={{ fontWeight: 'bold', margin: '15px' }}>{"Add New Product"}</Typography>
                                <Box sx={{ gap: '10px' }}>
                                    <TextField
                                        size='small'
                                        onChange={handleAddNameChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Name"
                                        value={addProduct.productName || ""}
                                    // defaultValue="Category"
                                    />
                                    <TextField
                                        size='small'
                                        onChange={handleAddDescriptionChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Description"
                                        value={addProduct.productDescription || ""}
                                    // defaultValue="Category"
                                    />
                                    <FormControl fullWidth required sx={{ marginBlock: '10px', minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                                        <Select
                                            // size='small'
                                            fullWidth
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={addProduct.productCategoryId || ""}
                                            label="Category *"
                                            onChange={handleAddCategoryChange}
                                        >
                                            {
                                                categories?.map((cat, i) => (
                                                    <MenuItem key={i} value={cat.categoryId}>{cat.categoryName}</MenuItem>
                                                ))
                                            }
                                        </Select>

                                    </FormControl>
                                    <TextField
                                        size='small'
                                        onChange={handleAddImageChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        value={addProduct.productImageUrl || ""}
                                        id="outlined-required"
                                        label="Image Url"
                                    // defaultValue="image url"
                                    />
                                    {
                                        variants.length > 0 ? <Box>
                                            <Typography sx={{ margin: '10px' }}>Variants </Typography>
                                            {
                                                variants?.map((item, i) => (
                                                    <ListItem key={i} disablePadding >
                                                        <Box height={'50px'} width={5} sx={{ background: item.quantity > 0 ? "green" : 'red' }}></Box>
                                                        <ListItemButton onClick={(e) => { handleProductSelection(e, i, item) }} sx={{ backgroundColor: selected === i ? '#ffa5001f' : 'white' }} >
                                                            {/* <ListItemAvatar>
                                                                <Avatar alt="Remy Sharp" src={item.productImageUrl} />
                                                            </ListItemAvatar> */}
                                                            <ListItemText
                                                                sx={{ fontWeight: selected === i ? 'bold !important' : '400', color: item.quantity === 0 ? "red" : 'green' }}
                                                                primary={`${i + 1}. ${item?.weight}`}
                                                                secondary={`selling price :₹ ${item.sellingPrice} | discount : ₹${item.discount} | stock : ${item.quantity}`}
                                                            />
                                                            {/* <Box sx={{}} height={'50px'} width={5} sx={{ background: item.productStockCount > 0 ? "green" : 'red' }}></Box> */}

                                                        </ListItemButton>

                                                    </ListItem>
                                                ))
                                            }
                                        </Box> : <></>
                                    }
                                    <Typography sx={{ margin: '10px' }}>Add Variants </Typography>
                                    <TextField

                                        size='small'
                                        onChange={handleAddWeightChange}
                                        sx={{ margin: '10px 10px' }}
                                        // fullWidth
                                        type='name'
                                        required
                                        id="outlined-required"
                                        label="Weight"
                                        value={addVariant?.weight || "0gm"}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        size='small'
                                        onChange={handleAddStockChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Total Items"
                                        value={addVariant.quantity || 0}
                                    // defaultValue="Nuts"
                                    />
                                    {/* <TextField
                                        size='small'
                                        onChange={handleAddPurchasingPriceChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Purchasing Price"
                                        value={addVariant.purchasingPrice || 0}
                                    // defaultValue="Nuts"
                                    /> */}
                                    <TextField
                                        size='small'
                                        onChange={handleAddSellingPriceChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Selling Price"
                                        value={addVariant.sellingPrice || 0}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        size='small'
                                        onChange={handleAddDiscountChange}
                                        sx={{ margin: '10px 10px' }}                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Discount"
                                        value={addVariant.discount || 0}
                                    // defaultValue="Nuts"
                                    />


                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'end', ml: "0px" }}>
                                    <Button onClick={() => {
                                        setVariants([...variants, addVariant]);
                                    }} sx={{ background: 'orange' }} variant='contained'>Add </Button>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'start', ml: "0px" }}>
                                    <Button onClick={handleAddProduct} sx={{ background: 'orange' }} variant='contained'>Add To inventory</Button>
                                </Box>
                            </Paper>

                        </Box>
                    </Box>

                </Box>
            }

        </div >
    )
}

export default AdminProducts
