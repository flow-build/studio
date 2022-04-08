import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import { getStorageItem } from "shared/utils/storage";

import { Box } from "@mui/material";
import { Header, Sidebar, SnackbarNotification } from "components";

const Layout = () => {
  const notifications = useSelector(
    ({ notifications }) => notifications.notifications
  );
  const location = useLocation();

  if (!getStorageItem("TOKEN"))
    return <Navigate to="/login" state={{ from: location }} replace />;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: ` 
                    'header header'
                    'sidebar content'`,
        gridTemplateColumns: "280px calc(100% - 280px)",
        gridTemplateRows: "64px calc(100vh - 64px)",
        minHeight: "100vh",
        maxWidth: "100%",
        overflow: "hidden",
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Header />
      <Sidebar />
      <Box
        sx={{
          gridArea: "content",
          padding: "10px",
          overflowY: "scroll",
        }}
      >
        <Outlet />
        {notifications &&
          notifications.map((notification, index) => {
            if (notification.type === "snackbar")
              return (
                <SnackbarNotification
                  open={true}
                  message={notification.message}
                  variant={notification.variant}
                  index={index}
                  key={index}
                />
              );

            return <></>;
          })}
      </Box>
    </Box>
  );
};

export default Layout;
