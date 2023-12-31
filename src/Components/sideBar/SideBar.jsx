import React, { useState } from 'react'
import './SideBar.css';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/wishlist-cart';
import { useProduct } from '../../context/product-context';
import { useCart } from '../../context/cart-context';
import { BiSearch } from 'react-icons/bi';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineLogout } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { Drawer, RadioGroup, DrawerBody, DrawerHeader, DrawerContent, DrawerOverlay, useDisclosure, } from '@chakra-ui/react'
import { FaRegAddressCard } from 'react-icons/fa';
import { BsBagCheckFill } from 'react-icons/bs';

export const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('left')

  const [sideSearchInput, setSideSearchInput] = useState('');

  const navigate = useNavigate();
  const { products } = useProduct();


  const { setCartItems } = useCart();
  const { setWishlistItem } = useWishlist();

  const token = localStorage.getItem('token')

  const userLogOut = () => {
    localStorage.removeItem('token')
    setWishlistItem([])
    setCartItems([])
    navigate('/')
    onClose(true)
  };

  const sidebarLoginRedirect = () => {
    navigate('/login')
    onClose(true)
  };
  const sidebarSignupRedirect = () => {
    navigate('/signup')
    onClose(true)
  };
  const searchProductField = (e) => {
    setSideSearchInput(e.target.value);
  };

  let fetchSearchProduct = products.filter(item => item.title.toLowerCase().includes(sideSearchInput.toLowerCase()) || item.categoryName.toLowerCase().includes(sideSearchInput.toLowerCase()))

  if (fetchSearchProduct.length === 0) {
    fetchSearchProduct = [];
  };

  const searchSingleData = (id) => {
    products.filter(item => item._id === id ?
      navigate(`/singleproduct/${item._id}`) : null)
    onClose(true)
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };
  const addressHandler = () => {
    navigate('/addressmodal')
    onClose(true)
  }
  const profileHandler = () => {
    navigate('/profile')
    onClose(true)
  }
  const orderHandler = () => {
    navigate('/order')
    onClose(true)
  }
  return (
    <div>
      <RadioGroup defaultValue={placement} onChange={setPlacement}>

      </RadioGroup>

      <HiOutlineMenuAlt2 onClick={onOpen} id='menu-bar' />

      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Search Product</DrawerHeader>
          <div className='sidebar-account-address' onClick={profileHandler}><span >Profile</span><span id='sidebar-address-icon'><ImProfile /></span></div>
          <div className='sidebar-account-address' onClick={addressHandler}><span >Address</span><span id='sidebar-address-icon'><FaRegAddressCard /></span></div>
          <div className='sidebar-account-address' onClick={orderHandler}><span >My Order</span><span id='sidebar-address-icon'><BsBagCheckFill /></span></div>
         
          <div id='side-signup'> {!token ? <p id='login'><span onClick={sidebarLoginRedirect} >Login</span>/<span onClick={sidebarSignupRedirect}>Signup</span> <FiLogIn id='login-icon' /> </p> : <span id='login' onClick={userLogOut} ><span style={{ marginTop: '4px' }}>Logout</span> <AiOutlineLogout id='login-icon' /></span>}</div>
          <DrawerBody >

            <span id='search-field'>
              <input type="text" placeholder='Search for:' id='search-input' value={sideSearchInput} onChange={searchProductField} onKeyDown={handleKeyDown} style={{ width: '15rem', marginLeft: '-2rem' }} />
              <BiSearch id='search-icon' />
            </span>


          </DrawerBody>
          <div id='search-product-data-container'>
            <div id='search-product-data'>
              {sideSearchInput && fetchSearchProduct.length > 0 ? fetchSearchProduct.map((item) => {
                return (
                  <div onClick={() => searchSingleData(item._id)} id='single-product-image-title'>
                    <span id='search-image'><img src={item.imgOne} alt="item" id='img-search' /></span>
                    <span id='search-single-product-title'>{item.title}</span>
                  </div>
                )
              }) : <p id='search-content'>Find your product with fast search.
                Enter some keyword<br /> such as
                dress, jacket etc.</p>}
            </div>
          </div>
          <hr />

        </DrawerContent>

      </Drawer>

    </div>
  )
}
