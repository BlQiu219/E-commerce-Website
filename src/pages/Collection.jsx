import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0 ){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);

  }


  const sortProduct = () => {
    let fbCopy = filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fbCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fbCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(()=>{
    sortProduct();
  },[sortType])
  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
    {/** Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=''/>
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PRODUCT CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Lipstick'} onChange={toggleCategory}/>Lipstick
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Perfume'} onChange={toggleCategory}/>Perfume
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Makeup'} onChange={toggleCategory}/>Makeup
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Skincare-Haircare'} onChange={toggleCategory}/>Skincare - Haircare
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        {/* Brand Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">BRAND</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Dior" onChange={toggleSubCategory} /> Dior
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="YSL" onChange={toggleSubCategory} /> YSL
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Christian Dior" onChange={toggleSubCategory} /> Christian Dior
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="MAC" onChange={toggleSubCategory} /> MAC
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="3CE" onChange={toggleSubCategory} /> 3CE
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Chanel" onChange={toggleSubCategory} /> Chanel
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Lancome" onChange={toggleSubCategory} /> Lancome
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Tom Ford" onChange={toggleSubCategory} /> Tom Ford
            </p>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Under 100,000 VND" onChange={toggleSubCategory} /> Under 100,000 VND
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="100,000 - 200,000 VND" onChange={toggleSubCategory} /> 100,000 - 200,000 VND
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="200,000 - 300,000 VND" onChange={toggleSubCategory} /> 200,000 - 300,000 VND
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="300,000 - 500,000 VND" onChange={toggleSubCategory} /> 300,000 - 500,000 VND
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="500,000 - 1,000,000 VND" onChange={toggleSubCategory} /> 500,000 - 1,000,000 VND
            </p>

            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Above 1,000,000 VND" onChange={toggleSubCategory} /> Above 1,000,000 VND
            </p>
          </div>
        </div>



      </div>
      {/** Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort*/}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relavent'>Sort by: Relavent</option>
            <option value='high-low'>Sort by: High to Low</option>
            <option value='low-high'>Sort by: Low to High</option>
          </select>
        </div>

      {/*Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap gay-y-6'>
          {
            filterProducts.map((item, index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
