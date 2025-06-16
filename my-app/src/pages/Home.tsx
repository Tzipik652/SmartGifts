import React, { FC, useState } from "react";

import logo from "../assets/SmartGifts Logo in Teal and Coral.png";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Toolbar,
  Typography,
  Tab,
  Tabs,
  IconButton,
  Tooltip,
  Badge,
  Fade,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUsername, selectIsAdmin } from "../redux/authSlice";
import MyCart from "./MyCart";
import Profile from "./Profile";
import AddProduct from "./AddProduct";
import Lottie from "lottie-react";
import shopAnimation from "../assets/shop-animation.json";
import Waves from "../components/Waves/Waves";
import TypingText from "../components/TypingText";
import ProductsList from "./ProductsList";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector((state: any) => state.myCart?.items?.length || 0);
  const username = useSelector(selectUsername);
  const isAdmin = useSelector(selectIsAdmin);

  const [tab, setTab] = useState(-1);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleTabChange = (_: any, newValue: number) => setTab(newValue);

  const renderContent = () => {
    switch (tab) {
      case 0:
        return (
          
        <ProductsList />)
      case 1:
        return <Profile />;
      case 2:
        return isAdmin ? <AddProduct /> : null;
      default:
                return (
          <>
            <Fade in timeout={1200}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Box
                  sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100vh",
                  minHeight: "100vh",
                  maxHeight: "none",
                  zIndex: 0,
                  overflow: "hidden",
                  }}
                >
                  <Waves
                  lineColor="#fff"
                  backgroundColor="#3f6366"
                  waveSpeedX={0.02}
                  waveSpeedY={0.01}
                  waveAmpX={40}
                  waveAmpY={20}
                  friction={0.9}
                  tension={0.01}
                  maxCursorMove={120}
                  xGap={12}
                  yGap={36}
                  />
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: "60vh", md: "70vh" },
                    minHeight: 350,
                    maxHeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    pointerEvents: "none",
                  }}
                >
                  <Paper
                    elevation={6}
                    sx={{
                      p: 3,
                      borderRadius: 5,
                      background: "rgba(255,255,255,0.85)",
                      width: { xs: "90%", md: "60%" },
                      minHeight: { xs: 200, md: 250 },
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 2,
                      pointerEvents: "auto",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#3f6366",
                        fontWeight: "bold",
                        textAlign: "center",
                     
                        mb: 2,
                      }}
                    >
                      <div className="danaYad-text">
                        <TypingText
                          text={`כשאת טובעת בכל האפשרויות,\nמתבלבלת בין זול ליוקרתי, בין סתמי למיוחד –\nהלב שלך רק רוצה לבחור נכון.\nמתנה שתאיר פנים, שתאמר בלי מילים: "חשבתי עלייך באמת".\nוזה בדיוק מה שאנחנו עושות.\n\nבSmartGifts – אנחנו בוחרות איתך.\nבחוכמה. ברגש. באהבה.`}
                        />
                      </div>
                                       
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Fade>
          </>
        );
    }
  };

  return (
    <Box
      dir="rtl"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#fff", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="SmartGifts">
              <IconButton onClick={() => setTab(-1)} sx={{ color: "#c1dbca" }}>
                <img
                  src={logo}
                  alt="SmartGifts Logo"
                  style={{ height: 50, borderRadius: "50%" }}
                />
              </IconButton>
            </Tooltip>
            {username && (
              <Typography
                variant="subtitle1"
                sx={{ color: "#7a7a7a", fontWeight: "bold" }}
              >
                שלום, {username}
              </Typography>
            )}
          </Box>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              "& .MuiTab-root": {
                color: "#666666",
                fontWeight: "bold",
                minWidth: 90,
              },
              "& .Mui-selected": { color: "#7a7a7a" },
            }}
          >
            <Tab label="המתנות שלנו" />
            <Tab label="הפרטים שלי" />
            {isAdmin && <Tab label="הוספת מוצר" />}
          </Tabs>
          <Tooltip title="עגלת קניות">
            <IconButton
              onClick={() => navigate("/cart")}
              sx={{ color: "#c1dbca" }}
            >
              <Badge badgeContent={cartCount} color="error" max={99}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="התנתקות">
            <IconButton onClick={handleLogout} sx={{ color: "#c1dbca" }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* תוכן מרכזי */}
      <Container
        sx={{
          flexGrow: 1,
          marginTop: "6rem",
          paddingLeft: "2rem",
          position: "relative",
        }}
        maxWidth={false}
        disableGutters
      >
        {renderContent()}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          flexShrink: 0,
          textAlign: "center",
          padding: 2,
          background: "#f5f5f5",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          All rights reserved &copy; | 🎁 SmartGifts – React Final Project 2025
          | Developed by Tzipora Kroizer | tzipora652@gmail.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
