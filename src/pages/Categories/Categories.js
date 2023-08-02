import { Box, Skeleton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './categories.css'
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getCategories, getCategoriesError, getCategoriesLoading } from '../../redux/slices/categories'
import Carousel from '../../components/shared/Carousel/Carousel'




const Categories = () => {


    const loading = [1, 2, 3, 4, 5, 6];
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getCategoriesLoading);
    const isError = useSelector(getCategoriesError);
    // const [categories, setCategories] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
        // console.log("")
    }, [dispatch])



    console.log("categories", categories);

    const heading = 'Shop our top categories'
    return (

        <div className='categories'>
            <Carousel />
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
                    )) : isError ? "Something Went Wrong! \n Please try again" :
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
