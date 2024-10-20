import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, Button, IconButton, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import {
  createProductAction,
  deleteProductAction,
  getAllProductsAction,
  updateProductAction,
} from "../Actions/ProductActions";
import { setProducts } from "../Redux/reducers/products";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Products = () => {
  const dispatch = useDispatch();
  // extract products from redux
  const { products } = useSelector((state) => state.products);

  // formData states
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [originalImages, setOriginalImages] = useState([]); // for campare the images change
  const [productId, setProductId] = useState("");

  // model component states
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCreateClose = () => {
    removeData();
    setCreateOpen(false);
  };
  const handleEditClose = () => {
    removeData();
    setEditOpen(false);
  };
  const handleDeleteClose = () => setDeleteOpen(false);

  // function that remove formData states value
  const removeData = () => {
    setImages([]);
    setCategory("");
    setName("");
    setDescription("");
    setPrice("");
  };
  //  set values from selected product
  const handleEditOpen = async (id) => {
    const product = await products.find((item) => item._id === id);
    setImages(product.images);
    setOriginalImages(product.images);
    setCategory(product.category);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);

    setProductId(id);
    setEditOpen(true);
  };

  const handleDeleteOpen = (id) => {
    setProductId(id);
    setDeleteOpen(true);
  };

  // delete product function
  const handleDeleteProduct = async () => {
    const response = await deleteProductAction(productId);
    if (response.status) {
      handleDeleteClose();
      getAllProducts();
      enqueueSnackbar(response.message, { variant: "success" });
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  // all products function
  const getAllProducts = async () => {
    const response = await getAllProductsAction(); // calling get all products action
    if (response.status) {
      dispatch(setProducts(response.data));
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  // create product function
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    if (!images.length > 0 || !category || !name || !description || !price) {
      return enqueueSnackbar("please fill all fields !", { variant: "error" });
    }
    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await createProductAction(formData); //  create product action
    if (response.status) {
      handleCreateClose();
      getAllProducts();
      enqueueSnackbar(response.message, { variant: "success" });
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  // edit product function
  const handleEditProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    // check images cahnged or not
    if (JSON.stringify(originalImages) !== JSON.stringify(images)) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const response = await updateProductAction(formData, productId); // edit product action
    if (response.status) {
      handleEditClose();
      getAllProducts(); // get all product function
      enqueueSnackbar(response.message, { variant: "success" });
    } else if (response.error) {
      enqueueSnackbar(response.message, { variant: "error" });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image instanceof File) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [images]);

  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{ display: "block", ml: "auto", mb: 2, bgcolor: "#42a5f5", color: "#fff", borderRadius: "2px" }}
          onClick={() => setCreateOpen(true)}
        >
          Create Product
        </Button>
        <table style={{ minWidth: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "10px 0" }}>No.</th>
              <th style={{ width: "100px", border: "1px solid #ddd", padding: "10px 20px", textAlign: "left" }}>
                Images
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Category</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Description</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Price</th>
              <th
                style={{
                  width: "100px",
                  border: "1px solid #ddd",
                  textTransform: "capitalize",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>

                <td
                  style={{
                    width: "100px",
                    background: "#333",
                    height: "60px",
                    border: "1px solid #ddd",
                    padding: "4px  8px ",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  <Badge
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      "& .MuiBadge-badge": {
                        backgroundColor: "#777",
                        color: "#fff",
                      },
                    }}
                    badgeContent={item.images.length}
                  ></Badge>
                  <img
                    style={{ objectFit: "cover", width: "100%", height: "90%", marginTop: "5px" }}
                    src={item.images[0]}
                    alt=""
                  />
                </td>
                <td
                  style={{ border: "1px solid #ddd", textTransform: "capitalize", padding: "8px", textAlign: "left" }}
                >
                  {item.category}
                </td>
                <td
                  style={{ border: "1px solid #ddd", textTransform: "capitalize", padding: "8px", textAlign: "left" }}
                >
                  {item.name}
                </td>
                <td
                  style={{ border: "1px solid #ddd", textTransform: "capitalize", padding: "8px", textAlign: "left" }}
                >
                  {item.description}
                </td>
                <td
                  style={{ border: "1px solid #ddd", textTransform: "capitalize", padding: "8px", textAlign: "center" }}
                >
                  {item.price}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px 0px" }}>
                  <IconButton onClick={() => handleEditOpen(item._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOpen(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* create product modal */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={createOpen}
        onClose={handleCreateClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 600 }}>
          <h2 className="modal-title">Create Product</h2>
          <form
            onSubmit={handleCreateProduct}
            id="unstyled-modal-description"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "350px",
                overflowX: "scroll",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                mb: 1,
              }}
            >
              {images.map((image, index) => {
                const imageSrc = image instanceof File ? URL.createObjectURL(image) : image;
                return (
                  <img
                    key={index}
                    src={imageSrc}
                    style={{
                      width: "100px",
                      minWidth: "100px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                );
              })}
            </Box>
            <TextField
              margin="dense"
              fullWidth
              label="Add Images"
              type="file"
              onChange={(e) => {
                setImages(Array.from(e.target.files));
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                multiple: true,
                accept: "image/*",
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Category"
              type="text"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Description"
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Price"
              type="number"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              sx={{
                padding: "0px",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ display: "block", ml: "auto", my: 1, bgcolor: "#42a5f5", color: "#fff", borderRadius: "2px" }}
            >
              Create
            </Button>
          </form>
        </ModalContent>
      </Modal>

      {/* edit product modal */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={editOpen}
        onClose={handleEditClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 600 }}>
          <h2 className="modal-title">Edit Product</h2>
          <form
            onSubmit={handleEditProduct}
            id="unstyled-modal-description"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Box
                sx={{
                  width: "350px",
                  overflowX: "scroll",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  msOverflowStyle: "none",
                }}
              >
                {images.map((image, index) => {
                  const imageSrc = image instanceof File ? URL.createObjectURL(image) : image;
                  return (
                    <img
                      key={index}
                      src={imageSrc}
                      style={{
                        width: "100px",
                        minWidth: "100px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                      alt="image preview"
                    />
                  );
                })}
              </Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                sx={{
                  bgcolor: "#42a5f5",
                  color: "#fff",
                }}
              >
                Upload Images
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    setImages(Array.from(e.target.files));
                  }}
                />
              </Button>
            </Box>
            <TextField
              margin="dense"
              fullWidth
              label="Category"
              type="text"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Description"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <TextField
              margin="dense"
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              sx={{
                padding: "0px",
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ display: "block", ml: "auto", my: 1, bgcolor: "#42a5f5", color: "#fff", borderRadius: "2px" }}
            >
              Edit
            </Button>
          </form>
        </ModalContent>
      </Modal>

      {/* delete product modal */}
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={deleteOpen}
        onClose={handleDeleteClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 600 }}>
          <h2 className="modal-title">Delete Product</h2>
          <p>Are you sure you want to delete this product?</p>
          <Button
            onClick={handleDeleteProduct}
            sx={{
              bgcolor: "red",
              color: "#fff",
              mt: 2,
            }}
          >
            Delete
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Products;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
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
