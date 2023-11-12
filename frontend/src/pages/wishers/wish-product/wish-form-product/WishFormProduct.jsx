import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './wish_form_product.css';

function WishFormProduct() {
    const categories = {
        Electronics: ["Mobile Phones & Accessories", "Computers & Accessories"],
        Clothing: ["Men's Clothing", "Women's Clothing", "Kids' & Baby Clothing"],
        Kitchen: ["Cookware", "Decor", "Furniture"],
    };

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSubcategory(''); // Reset subcategory when category changes
    };

    const handleSubcategoryChange = (event) => {
        setSelectedSubcategory(event.target.value);
    };

    return (
        <div className="wishFormForProduct">

            <div className="wishFormForProductTitle">
                <span className="wishFormForProductTitleText">Make a</span>
                <span className="wishFormForProductTitleWish">Wish</span>
            </div>

            <div className='wishFormForProductContainer'>
                <div className='step1'>
                    <span className='step1Text'>Step 1 of 4</span>
                </div>

                <div className='wishFormForProductSubTitle'>
                    <span className='wishFormForProductSubTitleText'>What do you want to send?</span>
                </div>

                <div className='productCategoryContainer'>
                    <div className='category'>
                        <label className='categoryText'>Category</label>
                        <select className='categoryDropdown' value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Select Category</option>
                            {Object.keys(categories).map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {selectedCategory && (
                        <div className='subcategory'>
                            <label className='subcategoryText'>Subcategory</label>
                            <select className='subcategoryDropdown' value={selectedSubcategory} onChange={handleSubcategoryChange}>
                                <option value="">Select Subcategory</option>
                                {categories[selectedCategory].map((subcategory) => (
                                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WishFormProduct;