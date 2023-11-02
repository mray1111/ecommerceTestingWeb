import React, { Fragment ,useEffect} from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { GoTypography} from "react-icons/go";
import { TbGardenCartOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

// Define a custom GoTypography component



const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert=useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const {isAuthenticated } = useSelector((state) => state.user);

  const increaseQuantity = (id, quantity, stock) => {
  
    const newQty = quantity + 1;
    if (stock <= quantity) {
      // Item is out of stock, show an alert
      alert.error("This item is out of stock.");
    } else {
      dispatch(addItemsToCart(id, newQty));
    }
  };


  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      // Display an alert and provide a link to the login page
      alert.error("Please go to the login page You are Not Authenticated  User", {
        onClose: () => {
          navigate("/login");
        },
      });
    }
  };


  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
    else{
      navigate("/cart");
    }
  }, [isAuthenticated, navigate]);




  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <TbGardenCartOff/>
          {/* <GoTypography > No Product in your cart</GoTypography> */}
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
