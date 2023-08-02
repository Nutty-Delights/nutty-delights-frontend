import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, getAllCategories, getCategories, getCategoriesError, getCategoriesLoading, updateCategory } from '../../redux/slices/categories';
import { Avatar, Box, Button, Divider, FormControl, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { getAllProductsByCategory, getProductsByCategory, getProductsError, getProductsLoading } from '../../redux/slices/products';
import Refresh from '@mui/icons-material/Loop';
const AdminProducts = () => {

    // async function fetchCategories() {
    //     const res = await CategoryDataService.getAllCategories();
    //     console.log(res);
    // }



    const dispatch = useDispatch();
    const [categoryId, setCategoryId] = useState();
    const products = useSelector(getProductsByCategory);
    const isLoading = useSelector(getProductsLoading);
    const isError = useSelector(getProductsError);
    const [selected, setSelected] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState({
        categoryId: '#1',
        categoryName: "name",
        categoryImageUrl: "imageUrl",
        categoryType: "type"
    });
    const [addCategory, setAddCategory] = useState({
        categoryName: "name",
        categoryImageUrl: "imageUrl",
        categoryType: "type"
    });

    //functions to handle update category
    const handleUpdatedNameChange = (e) => {
        // console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryName: e.target.value
        }))
    }
    const handleUpdatedTypeChange = (e) => {
        // console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryType: e.target.value
        }))
    }
    const handleUpdatedImageChange = (e) => {
        // console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryImageUrl: e.target.value
        }))
    }
    const handleCategory = (e, index, category) => {
        setSelected(index);
        setSelectedCategory(category);
    }

    const handleUpdateCategory = async (id) => {
        // console.log(selectedCategory);
        const data = {
            categoryName: selectedCategory.categoryName,
            categoryImageUrl: selectedCategory.categoryImageUrl,
            categoryType: selectedCategory.categoryType
        }
        dispatch(updateCategory({ id, data }));


    }

    //functions to handle add category
    const handleAddNameChange = (e) => {
        // console.log(e.target.value)
        setAddCategory((prev) => ({
            ...prev,
            categoryName: e.target.value
        }))
    }
    const handleAddTypeChange = (e) => {
        // console.log(e.target.value)
        setAddCategory((prev) => ({
            ...prev,
            categoryType: e.target.value
        }))
    }
    const handleAddImageChange = (e) => {
        // console.log(e.target.value)
        setAddCategory((prev) => ({
            ...prev,
            categoryImageUrl: e.target.value
        }))
    }

    const handleAddCategory = async () => {
        console.log(addCategory);
        const data = {
            categoryName: addCategory.categoryName,
            categoryImageUrl: addCategory.categoryImageUrl,
            categoryType: addCategory.categoryType
        }
        dispatch(createCategory(data));


    }

    //function to delete the category
    const handleDeleteCategory = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        var result = confirm(`Confirm to delete ${selectedCategory.categoryName}?`);

        if (result) {
            dispatch(deleteCategory(id))
        }

    }

    const handleRefresh = () => {
        dispatch(getAllProductsByCategory({ categoryId }))
    }
    useEffect(() => {
        dispatch(getAllProductsByCategory({ categoryId }))
    }, [categoryId, dispatch])


    return (
        <div>
            {
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px' }}>

                    <Box sx={{ width: '96vw' }}>

                        <Box sx={{ display: 'flex', gap: '10px', }}>
                            <Paper>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{`Products | Total : ${products?.length}`}</Typography>
                                    <IconButton onClick={handleRefresh}>
                                        <Refresh />
                                    </IconButton>
                                </Box>
                                <List sx={{ width: '25vw' }}>


                                    <Divider></Divider>
                                    {
                                        isLoading ? <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}><Typography>{"Loading...."}</Typography></Box> :
                                            products?.map((item, i) => (
                                                <ListItem key={item?.productId} disablePadding >
                                                    <Box height={'50px'} width={5} sx={{ background: item.productStockCount > 0 ? "green" : 'red' }}></Box>
                                                    <ListItemButton disableRipple onClick={(e) => { handleCategory(e, i, item) }} sx={{ backgroundColor: selected === i ? '#ffa5001f' : 'white' }} >
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={item.productImageUrl} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            sx={{ fontWeight: selected === i ? 'bold !important' : '400', color: item.productStockCount === 0 ? "red" : 'green' }}
                                                            primary={`${i + 1}. ${item?.productName}`}
                                                            secondary={`selling price :₹ ${item.productPrice} | discount : ${item.productDiscount} | stock : ${item.productStockCount}`}
                                                        />
                                                        {/* <Box sx={{}} height={'50px'} width={5} sx={{ background: item.productStockCount > 0 ? "green" : 'red' }}></Box> */}

                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                    }
                                </List>
                            </Paper>
                            <Paper sx={{ height: '500px', width: '40vw', padding: '15px' }}>
                                <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{"Update Product"}</Typography>
                                <Box sx={{ gap: '10px' }}>
                                    <TextField
                                        onChange={handleAddNameChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Name"
                                        value={addCategory.categoryName}
                                    // defaultValue="Category"
                                    />
                                    <FormControl fullWidth required sx={{ marginBlock: '10px', minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={"10"}
                                            label="Category *"
                                        // onChange={}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Almonds</MenuItem>
                                            <MenuItem value={20}>Raisins</MenuItem>
                                            <MenuItem value={30}>Figs</MenuItem>
                                        </Select>

                                    </FormControl>
                                    <TextField
                                        onChange={handleAddImageChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        value={addCategory.categoryImageUrl}
                                        id="outlined-required"
                                        label="Image Url"
                                    // defaultValue="image url"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Total Items"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Purchasing Price"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Selling Price"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Discount"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />


                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'start', marginLeft: '10px', gap: '20px' }}>
                                    <Button onClick={() => { handleDeleteCategory(selectedCategory.categoryId) }} sx={{ background: 'red' }} variant='contained'>Delete</Button>
                                    <Button onClick={() => { handleUpdateCategory(selectedCategory.categoryId) }} sx={{ background: 'orange' }} variant='contained'>Update </Button>
                                </Box>
                            </Paper>

                            <Paper sx={{ height: '500px', width: '40vw', padding: '15px' }}>
                                <Typography sx={{ fontWeight: 'bold', margin: '15px' }}>{"Add New Product"}</Typography>
                                <Box sx={{ gap: '10px' }}>
                                    <TextField
                                        onChange={handleAddNameChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Name"
                                        value={addCategory.categoryName}
                                    // defaultValue="Category"
                                    />
                                    <FormControl fullWidth required sx={{ marginBlock: '10px', minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-required-label">Category</InputLabel>
                                        <Select
                                            fullWidth
                                            labelId="demo-simple-select-required-label"
                                            id="demo-simple-select-required"
                                            value={"10"}
                                            label="Category *"
                                        // onChange={}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Almonds</MenuItem>
                                            <MenuItem value={20}>Raisins</MenuItem>
                                            <MenuItem value={30}>Figs</MenuItem>
                                        </Select>

                                    </FormControl>
                                    <TextField
                                        onChange={handleAddImageChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        value={addCategory.categoryImageUrl}
                                        id="outlined-required"
                                        label="Image Url"
                                    // defaultValue="image url"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Total Items"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Purchasing Price"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Selling Price"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ margin: '10px' }}
                                        // fullWidth
                                        type='number'
                                        required
                                        id="outlined-required"
                                        label="Discount"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />


                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'start', ml: "10px" }}>
                                    <Button onClick={handleAddCategory} sx={{ background: 'orange' }} variant='contained'>Add To inventory</Button>
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
