import { Box, Skeleton, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './categories.css'
import Category from './Category'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories, getCategories, getCategoriesError, getCategoriesLoading } from '../../redux/slices/categories'
import Carousel from '../../components/shared/Carousel/Carousel'
import { NavLink, useLocation } from 'react-router-dom'
import Image from 'mui-image'
import image from '../../assets/images/categories.png'




const Categories = () => {


    const loading = [1, 2, 3, 4, 5, 6];
    const categories = useSelector(getCategories);
    const isLoading = useSelector(getCategoriesLoading);
    const isError = useSelector(getCategoriesError);
    const location = useLocation().pathname;
    // const [categories, setCategories] = useState();
    const dispatch = useDispatch();

    useEffect(() => {

        if (!categories)
            dispatch(getAllCategories());
        // console.log("")
    }, [])



    console.log("categories", categories);

    const heading = 'Shop our top categories'
    return (

        <div className='categories'>
            <Carousel />
            {/* <Toolbar /> */}
            <Typography className='heading-category'>
                {heading}
            </Typography>
            {location !== '/categories' ? <Box sx={{ background: 'white', marginInline: '20px', marginTop: '0px' }}>
                <NavLink>


                    <Image
                        // height={'20vw'}
                        style={{
                            borderRadius: '10px'
                        }} duration={0} easing='ease' fit='contain' src={image}></Image>
                    {/* <Button>Shop Now</Button> */}
                </NavLink>
            </Box> : <></>}
            <div className='category-cards'>
                {

                    isLoading ? loading.map((e, i) => (
                        <Box key={i} width={"300px"} >
                            <Skeleton variant="rectangular" height={118} />
                            <Skeleton animation="wave" />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Box>
                    )) : isError ? isError.error.message :
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
