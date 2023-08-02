import React, { useEffect, useState } from 'react'
import CategoryDataService from '../../services/category.service'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getCategories, getCategoriesError, getCategoriesLoading, updateCategory } from '../../redux/slices/categories';
import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, Paper, TextField, Typography } from '@mui/material';

const AdminCategories = () => {

    // async function fetchCategories() {
    //     const res = await CategoryDataService.getAllCategories();
    //     console.log(res);
    // }

    const dispatch = useDispatch();
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getCategoriesLoading);
    const isError = useSelector(getCategoriesError);
    const [selected, setSelected] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState({
        categoryName: "name",
        categoryImageUrl: "imageUrl",
        categoryType: "type"
    });

    const handleUpdatedNameChange = (e) => {
        console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryName: e.target.value
        }))
    }
    const handleUpdatedTypeChange = (e) => {
        console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryType: e.target.value
        }))
    }
    const handleUpdatedImageChange = (e) => {
        console.log(e.target.value)
        setSelectedCategory((prev) => ({
            ...prev,
            categoryImageUrl: e.target.value
        }))
    }
    const handleCategory = (e, index, category) => {
        setSelected(index);
        setSelectedCategory(category);
    }

    const handleUpdateCategory = (id) => {
        console.log(selectedCategory);
        const data = {
            categoryName: selectedCategory.categoryName,
            categoryImageUrl: selectedCategory.categoryImageUrl,
            categoryType: selectedCategory.categoryType
        }
        dispatch(updateCategory({ id, data }));
        // isLoading ? alert("Updating..") : alert("completed")
        // isError ? alert("An Error Occured! failed to update Category") : alert("")

    }

    useEffect(() => {

        console.log("inside admin")
        dispatch(getAllCategories());
        // setSelectedCategory(categories[0]);
        // console.log(selectedCategory);
    }, []);
    return (
        <div>
            {
                isLoading ? <Typography>{"Loading...."}</Typography> : <Box sx={{ display: 'flex', justifyContent: 'space-evenly', margin: '10px' }}>

                    <Box sx={{ width: '96vw' }}>

                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <Paper sx={{ height: '400px', width: '40vw', padding: '15px' }}>
                                <Typography sx={{ fontWeight: 'bold', margin: '15px' }}>{"Add New Category"}</Typography>
                                <Box sx={{ gap: '10px' }}>
                                    <TextField
                                        // onChange={handleChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Name"
                                    // defaultValue="Category"
                                    />
                                    <TextField
                                        // onChange={handleChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Type"
                                    // defaultValue="Nuts"
                                    />
                                    <TextField
                                        // onChange={handleChange}
                                        sx={{ marginBlock: '10px' }}
                                        fullWidth
                                        required
                                        id="outlined-required"
                                        label="Image Url"
                                    // defaultValue="image url"
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button sx={{ background: 'orange' }} variant='contained'>Add New Category</Button>
                                </Box>
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
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button sx={{ background: 'red' }} variant='contained'>Delete</Button>
                                    <Button onClick={() => { handleUpdateCategory(selectedCategory.categoryId) }} sx={{ background: 'orange' }} variant='contained'>Update Category</Button>
                                </Box>
                            </Paper>
                            <Paper>
                                <List sx={{ width: '20vw' }}>
                                    <Typography sx={{ margin: '15px', fontWeight: 'bold' }}>{`Total : ${categories.length}`}</Typography>
                                    <Divider></Divider>
                                    {
                                        categories?.map((item, i) => (
                                            <ListItem key={item.categoryId} disablePadding >
                                                <ListItemButton disableRipple onClick={(e) => { handleCategory(e, i, item) }} sx={{ backgroundColor: selected === i ? '#ffa5001f' : 'white' }} >
                                                    <ListItemText sx={{ color: selected === i ? 'orange' : 'grey' }} primary={`${i + 1}. ${item.categoryName}`} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Paper>
                        </Box>
                    </Box>

                </Box>
            }

        </div >
    )
}

export default AdminCategories
