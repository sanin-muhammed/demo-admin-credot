import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { getAllOrdersAction, updateOrderStatusAction } from "../Actions/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../Redux/reducers/orders";
import { enqueueSnackbar } from "notistack";
import { Box, Button } from "@mui/material";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const statusArray = ["Pending", "Processing", "Shipped", "Delivered"];

  const handleEditOpen = async (id) => {
    const order = await orders.find((item) => item._id === id);
    setStatus(order.orderStatus);
    setOrderId(id);
    setEditOpen(true);
  };

  const handleEditStatus = async () => {
    const response = await updateOrderStatusAction(status, orderId);
    if (response.status) {
      getAllOrders();
      enqueueSnackbar(response.message, { variant: "success" });
      setEditOpen(false);
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  const getAllOrders = async () => {
    const response = await getAllOrdersAction();
    if (response.status) {
      dispatch(setOrders(response.data));
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px 0" }}>No.</th>
            <th style={{ width: "100px", border: "1px solid #ddd", padding: "10px 20px", textAlign: "left" }}>
              Products
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>User</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Total Price</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Order Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Order Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>

              <td
                style={{
                  maxWidth: "300px",
                  background: "#333",
                  // height: "70px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid #ddd",
                  padding: "  10px ",
                  overflowX: "scroll",
                  scrollbarWidth: "none",
                  // background:"red",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {item.products?.map((product, index) => (
                  <img
                    key={index}
                    src={product.product.images[0]}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    alt="images"
                  />
                ))}
              </td>
              <td style={{ border: "1px solid #ddd", textTransform: "none", padding: "8px", textAlign: "left" }}>
                {item.userDetails.email}
              </td>
              <td style={{ border: "1px solid #ddd", textTransform: "capitalize", padding: "8px", textAlign: "left" }}>
                {item.totalPrice}
              </td>
              <td style={{ border: "1px solid #ddd", textTransform: "capitalize", padding: "8px", textAlign: "left" }}>
                {new Date(item.orderDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
              <td
                onClick={() => handleEditOpen(item._id)}
                className="td_hover"
                style={{
                  border: "1px solid #ddd",
                  textTransform: "capitalize",
                  padding: "8px",
                  textAlign: "center",
                  transition: ".2s ease",
                  cursor: "pointer",
                }}
              >
                {item.orderStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={editOpen}
        onClose={() => setEditOpen(false)}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 550 }}>
          <h2 className="modal-title">Change Order Status</h2>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, my: 1 }}>
            {statusArray.map((item, index) => (
              <Button
                key={index}
                onClick={() => setStatus(item)}
                sx={{
                  bgcolor: item === status ? "#42a4f5" : "#000",
                  color: "#fff",
                  textTransform: "none",
                  letterSpacing: "1px",
                  p: "15px ",
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 0 1px #000",
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <Button
            onClick={handleEditStatus}
            sx={{
              bgcolor: "#42a5f5",
              color: "#fff",
              mt: 2,
            }}
          >
            Change
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Orders;
const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
