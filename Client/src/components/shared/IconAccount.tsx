import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Logout from "@mui/icons-material/Logout";
import { AuthUserContext } from "@/context/UserContextProvider";
import { Link } from "react-router-dom";
import { StripeCustomer } from "@/context/StripeCustomerContext";
import { useLogOutUser } from "@/lib/reactQuery/qusersAndMutation";

const IconAccount = () => {
  const { mutateAsync: LogOut } = useLogOutUser();
  const { user } = AuthUserContext();
  const customerId = StripeCustomer();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <img
                className="bg-white"
                src={user.imageUrl ? user.imageUrl : "/assets/user.jpg"}
                alt="User avatar"
              />
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={"/account"}>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
        </Link>
        <Link to={"/account/favorites"}>
          <MenuItem onClick={handleClose}>
            <FavoriteBorderIcon className="mr-3" /> Favorites
          </MenuItem>
        </Link>
        <Link to={`/account/orders/${customerId}`}>
          <MenuItem onClick={handleClose}>
            <Inventory2OutlinedIcon className="mr-3" /> Orders
          </MenuItem>
        </Link>

        <Divider />
        <MenuItem onClick={() => LogOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default IconAccount;
