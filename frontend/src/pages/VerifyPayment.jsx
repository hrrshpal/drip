import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const { backendUrl, token, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const order_id = searchParams.get("order_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          backendUrl + "/api/order/verify-cashfree",
          { order_id },
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems({});
          toast.success("Payment successful!");
          navigate("/orders");
        } else {
          toast.error("Payment failed. Please try again.");
          navigate("/cart");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
        navigate("/cart");
      }
    };

    if (order_id && token) {
      verifyPayment();
    }
  }, [order_id, token]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm">Verifying your payment...</p>
      </div>
    </div>
  );
};

export default VerifyPayment;