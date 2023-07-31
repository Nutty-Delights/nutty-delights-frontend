import { Box, Skeleton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './categories.css'
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getCategories, getCategoriesLoading } from '../../redux/slices/categories'




const Categories = () => {


    const loading = [1, 2, 3, 4, 5, 6];
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getCategoriesLoading);
    // const [categories, setCategories] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
        // console.log("")
    }, [dispatch])



    console.log("categories", categories);

    const heading = 'Shop our top catgories'
    return (

        <div className='categories'>
            <Typography className='heading'>
                {heading}
            </Typography>
            <div className='category-cards'>
                {

                    isLoading ? loading.map((e, i) => (
                        <Box key={i} width={"300px"} >
                            <Skeleton variant="rectangular" height={118} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    )) :
                        categories?.map((category) => {
                            console.log("category", category)
                            return <Category key={category.categoryId} category={category} />
                        })
                }
            </div>

            {/* <Typography>Explore More</Typography> */}



        </div>
    )
}

export default Categories
