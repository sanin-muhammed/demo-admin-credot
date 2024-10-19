import * as React from "react";
import PropTypes from "prop-types";
import { useTheme, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Products from "./Products";
import Orders from "./Orders";

const NAVIGATION = [
  {
    segment: "products",
    title: "Products",
    icon: <CategoryIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
];

// Create a theme that only supports dark mode
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Component mapping for different routes
const COMPONENTS = {
  "/products": Products,
  "/orders": Orders,
};

function DemoPageContent({ pathname }) {
  const Component = COMPONENTS[pathname] || (() => <Typography>Page Not Found</Typography>);

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Component />
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
  const { window } = props;
  const [pathname, setPathname] = React.useState("/products");

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Define the window for AppProvider if needed
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img
            src="../Logo.svg"
            alt="MUI logo"
            style={{ filter: "invert(1)" }} // Ensure logo is white in dark mode
          />
        ),
        title: "",
      }}
      router={router}
      theme={darkTheme} // Use the dark theme directly
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
