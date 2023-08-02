import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, deleteCategory, getAllCategories, getCategories, getCategoriesError, getCategoriesLoading, updateCategory } from '../../redux/slices/categories';
import { Avatar, Box, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';
import Refresh from '@mui/icons-material/Loop';

const AdminCategories = () => {

    // async function fetchCategories() {
    //     const res = await CategoryDataService.getAllCategories();
    //     console.log(res);
    // }

    useEffect(() => {

        console.log("inside admin")
        dispatch(getAllCategories());
        // setSelectedCategory(categories[0]);
        // console.log(selectedCategory);
    }, []);

    const dispatch = useDispatch();
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getCategoriesLoading);
    const isError = useSelector(getCategoriesError);
    const [selected, setSelected] = useState(-1);
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
        dispatch(getAllCategories());
    }

    return (
        <div>
            {
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px' }}>

                    <Box sx={{ width: '96vw' }}>

                        <Box sx={{ display: 'flex', gap: '10px', }}>
                            <Paper>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{`Categories | Total : ${categories?.length}`}</Typography>
                                    <IconButton onClick={handleRefresh}>
                                        <Refresh />
                                    </IconButton>
                                </Box>
                                <List sx={{ width: '20vw', height: '80vh', overflow: 'auto' }}>

                                    <Divider></Divider>
                                    {
                                        isLoading ? <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}><Typography>{"Loading...."}</Typography></Box> :
                                            categories?.map((item, i) => (
                                                <ListItem key={item?.categoryId} disablePadding >
                                                    <ListItemButton disableRipple onClick={(e) => { handleCategory(e, i, item) }} sx={{ backgroundColor: selected === i ? '#ffa5001f' : 'white' }} >
                                                        <ListItemAvatar>
                                                            <Avatar alt="Remy Sharp" src={item.categoryImageUrl} />
                                                        </ListItemAvatar>
                                                        <ListItemText sx={{ color: selected === i ? 'orange' : 'grey' }} primary={` ${item?.categoryName}`} secondary={`type: ${item.categoryType}`} />
                                                    </ListItemButton>
                                                </ListItem>
                                            ))
                                    }
                                </List>
                            </Paper>
                            <Paper sx={{ height: '400px', width: '40vw', padding: '15px' }}>
                                <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{"Update Category"}</Typography>
                                <Box sx={{ gap: '10px' }}>
                                    <TextField
                                        sx={{ marginBlock: '10px' }}
                                        onChange={handleUpdatedNameChange}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Name"
                                        // defaultValue={"name"}
                                        value={selectedCategory?.categoryName}
                                    />
                                    <TextField
                                        onChange={handleUpdatedTypeChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Type"
                                        // defaultValue={"type"}
                                        value={selectedCategory?.categoryType}
                                    />
                                    <TextField
                                        onChange={handleUpdatedImageChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Image Url"
                                        // defaultValue={"value"}
                                        value={selectedCategory?.categoryImageUrl}
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'start', gap: '20px' }}>
                                    <Button onClick={() => { handleDeleteCategory(selectedCategory.categoryId) }} sx={{ background: 'red' }} variant='contained'>Delete</Button>
                                    <Button onClick={() => { handleUpdateCategory(selectedCategory.categoryId) }} sx={{ background: 'orange' }} variant='contained'>Update </Button>
                                </Box>
                            </Paper>

                            <Paper sx={{ height: '400px', width: '40vw', padding: '15px' }}>
                                <Typography sx={{ fontWeight: 'bold', margin: '15px' }}>{"Add Category"}</Typography>
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
                                    <TextField
                                        onChange={handleAddTypeChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Type"
                                        value={addCategory.categoryType}
                                    // defaultValue="Nuts"
                                    />
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
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                                    <Button onClick={handleAddCategory} sx={{ background: 'orange' }} variant='contained'>Add Category</Button>
                                </Box>
                            </Paper>

                        </Box>
                    </Box>

                </Box>
            }

        </div >
    )
}

export default AdminCategories
