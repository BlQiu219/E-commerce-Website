import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [sortType, setSortType] = useState('relavent')
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [priceRange, setPriceRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;


  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleBrand = (e) => {
    if (brand.includes(e.target.value)) {
      setBrand(prev => prev.filter(item => item !== e.target.value));
    } else {
      setBrand(prev => [...prev, e.target.value]);
    }
  };

  const togglePriceRange = (e) => {
    const value = e.target.value;
    if (priceRange.includes(value)) {
      setPriceRange(prev => prev.filter(item => item !== value));
    } else {
      setPriceRange(prev => [...prev, value]);
    }
  };
  

  const applyFilter = () => {
    setCurrentPage(1);
    // xao tron san pham
    let productsCopy = products.slice().sort(() => Math.random() - 0.5);

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (brand.length > 0) {
      productsCopy = productsCopy.filter(item => brand.includes(item.brand));
    }

    if (priceRange.length > 0) {
      productsCopy = productsCopy.filter(item => {
        return priceRange.some(range => {
          const price = item.price;
          if (range === 'Under 5 USD') return price < 5;
          if (range === '5 USD - 30 USD') return price >= 5 && price < 30;
          if (range === '30 USD - 70 USD') return price >= 30 && price < 70;
          if (range === '70 USD - 100 USD') return price >= 70 && price < 100;
          if (range === '100 USD - 150 USD') return price >= 100 && price < 150;
          if (range === '150 USD - 200 USD') return price >= 150 && price < 200;
          if (range === 'Above 200 USD') return price > 200;
          return true;
        });
      });
    }
    

    setFilterProducts(productsCopy)
    // setCurrentPage(1);
  }

  const sortProduct = () => {
    let fbCopy = filterProducts.slice()

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fbCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fbCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter()
        break
    }
  }

  useEffect(() => {
    applyFilter()
  }, [category, brand, priceRange, search, showSearch, products])
  
  
//   useEffect(() => {
//   console.log("🔍 Danh sách sản phẩm:", products);
// }, [products]);


  useEffect(() => {
    sortProduct();
  }, [sortType])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);
  // Tính khoảng hiển thị cho pagination
  const visiblePageCount = 5;
  let startPage = Math.max(currentPage - Math.floor(visiblePageCount / 2), 1);
  let endPage = startPage + visiblePageCount - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - visiblePageCount + 1, 1);
  }  

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/** Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>PRODUCT CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Lifstick'} onChange={toggleCategory} />Lipstick
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Perfume'} onChange={toggleCategory} />Perfume
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Makeup'} onChange={toggleCategory} />Makeup
            </p>

            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value={'Skincare - Haircare'} onChange={toggleCategory} />Skincare - Haircare
            </p>
          </div>
        </div>

        {/* Brand Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>BRAND</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[
              'Dior',
              'YSL',
              'Dolce & Garbana',
              'Innisfree',
              'Chanel',
              'Lancome',
              'Tom Ford',
            ].map((brand, index) => (
              <p key={index} className='flex gap-2'>
                <input
                  className='w-3'
                  type='checkbox'
                  value={brand}
                  onChange={toggleBrand}
                />
                {brand}
              </p>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'
            } sm:block`}
        >
          <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {[
              'Under 5 USD',
              '5 USD - 30 USD',
              '30 USD - 70 USD',
              '70 USD - 100 USD',
              '100 USD - 150 USD',
              '150 USD - 200 USD',
              'Above 200 USD',
            ].map((range, index) => (
              <p key={index} className='flex gap-2'>
                <input
                  className='w-3'
                  type='checkbox'
                  value={range}
                  onChange={togglePriceRange}
                />
                {range}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4 relative'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort*/}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relavent'>Sort by: Relavent</option>
            <option value='high-low'>Sort by: High to Low</option>
            <option value='low-high'>Sort by: Low to High</option>
          </select>
        </div>

        {/*Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2'>
          {currentProducts.map((item, index) => (
            <div key={index} className="border-r border-gray-300 ">
              <ProductItem
                name={item.name}
                id={item._id}
                price={item.price}
                images={item.images}
              />
            </div>
          ))}
        </div>

          
        <div className="flex justify-center items-center mt-8 space-x-2 text-sm">
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page numbers */}
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 border rounded transition ${currentPage === number ? 'bg-black text-white': 'hover:bg-gray-100'}`}
            >
              {number}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() =>
              setCurrentPage(prev =>
                Math.min(prev + 1, totalPages)
              )
            }
            className="px-3 py-1 border rounded hover:bg-gray-100 transition disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  )
}

export default Collection