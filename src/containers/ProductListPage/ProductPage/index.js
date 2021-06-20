import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProductPage} from '../../../actions'
import getParams from "../../../utils/getParams";
import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Card from "../../../components/UI/Card/index";

export default function ProductPage(props) {
    
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    window.product = product;
    const {page} = product;
    console.log(page)
    useEffect(() => {
        const params = getParams(props.location.search)
        console.log(params)
        const payload ={
            params
        }
        dispatch(getProductPage(payload))
    }, [])

  return (
    <div style={{ margin:'0 10px'}}>
        <h3>{page.title}</h3>
        <Carousel
        renderThumbs={() =>{}}
        >
            {/* {window.banners = page.banners}  */}
            {
                page.banners && page.banners.map((banner , index) => 
                    <a 
                    key={index}
                    style={{ display: 'block'}}
                    href={banner.navigateTo}
                    >
                        <img src={`https://flipkart-backend2.herokuapp.com/public/${banner.img.split('public/')[1]}`} alt="" />
                    </a>
                )
            }
        </Carousel>
        <div style={{display: 'flex' , justifyContent: 'center' , flexWrap:'wrap' , margin:'10px 0'}}> 
            {
                page.products && page.products.map((product, index) =>
                    <Card key={index} style={{width:'400px' , height:'200px' ,margin:'5px' }}>
                        <img src={`https://flipkart-backend2.herokuapp.com/public/${product.img.split('public/')[1]}`} alt="" style={{width:'100%', height:'100%'}}/>                        
                    </Card>
                )
            }
        </div>
    </div>

  );
}

//window.store.getState().product.page.banners[0].img.split('public/')[1]