import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart-context';
import { useWishlist } from '../../context/wishlist-cart';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import {
  Box,
  Center,
  Image,
  Button,
  Stack
} from '@chakra-ui/react';
export const BestSellingCard = ({ bestselling }) => {
  const [toggle, setToggle] = useState(true)
  const [disable, setDisable] = useState(false);
  const { addToCart, cartItems, goToCartHandler } = useCart();
  const { addToWishlist, wishlistItem } = useWishlist();
  const navigate = useNavigate();

  const bestsellingMouseOver = () => {
    setToggle(false)

  };
  const bestsellingMouseOut = () => {
    setToggle(true)
  }

  return (
    <div key={bestselling._id}>
      <Center py={20}>
        <Box>
          <Box >

            {
              toggle ?
                <Image
                  height={400}
                  width={270}
                  objectFit={'cover'}
                  onMouseOver={bestsellingMouseOver}
                  src={bestselling.imgOne}
                  onClick={() => {
                    navigate(`/singleproduct/${bestselling._id}`)
                    window.scrollTo({ top: 0, scroll: 'instant' })
                  }}
                /> :
                <Image
                  height={400}
                  width={270}
                  objectFit={'cover'}
                  onMouseOut={bestsellingMouseOut}
                  src={bestselling.imgTwo}
                  onClick={() => {
                    navigate(`/singleproduct/${bestselling._id}`)
                    window.scrollTo({ top: 0, scroll: 'instant' })
                  }}
                />
            }


          </Box>
          {bestselling.stock ? null : <p id='bestselling-out-stock-button'>Out Of Stock</p>}
          <div id='bestselling-type-wishlist'>
            <span id='bestselling-type'>{bestselling.type}</span>
            {
              wishlistItem.find(item => item._id === bestselling._id) ? <AiFillHeart className='bestselling-dress-wishlist' onClick={() => navigate('/wishlist')} /> :
                <span onClick={() => addToWishlist(bestselling)}>{bestselling.stock ? <AiOutlineHeart className='bestselling-dress-wishlist' /> : null}</span>
            }
          </div>
          <p id='besselling-title'>{bestselling.title}</p>
          {
            cartItems.find(item => item._id === bestselling._id) ?
              <div>
                {
                  bestselling.stock ? <div id='bestselling-price-add-button'>
                    <span id='bestselling-price'>${bestselling.price}.00</span>
                    <Stack direction='row' spacing={4} align='center' >
                      <Button colorScheme='teal' variant='outline' onClick={goToCartHandler}>Go To Cart</Button>
                    </Stack>
                  </div> : null
                }
                {bestselling.stock ? null : <p id='bestselling-out-stock'>Out Of Stock</p>}
              </div> :
              <div>
                {
                  bestselling.stock ? <div id='bestselling-price-add-button'>
                    <span id='bestselling-price'>${bestselling.price}.00</span>
                    <Stack direction='row' spacing={4} align='center' >
                      <Button isDisabled={disable} colorScheme='teal' variant='outline' onClick={() => {
                        addToCart(bestselling)
                        setDisable(true)
                      }} >Add To Cart</Button>
                    </Stack>
                  </div> : null
                }
                {bestselling.stock ? null : <p id='bestselling-out-stock'>Out Of Stock</p>}
              </div>
          }
        </Box>
      </Center>
    </div>
  )
}
