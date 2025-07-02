import React, { FC, useEffect, useState } from "react";

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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUsername, selectIsAdmin } from "../redux/authSlice";
import Waves from "../components/Waves/Waves";
import TypingText from "../components/TypingText";
import { clearCart, selectCartItemCount } from "../redux/cartSlice";

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartItemCount);
  const username = useSelector(selectUsername);
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    setMounted(true);
  }, []);
  const tabValue = (() => {
    if (location.pathname.startsWith("/products")) return 0;
    if (location.pathname.startsWith("/profile")) return 1;
    if (location.pathname.startsWith("/add-product")) return 2;
    return -1;
  })();

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
    navigate("/login");
  };

  const handleTabChange = (_: any, newValue: number) => {
    if (newValue === 0) navigate("/products");
    if (newValue === 1) navigate("/profile");
    if (newValue === 2) navigate("/add-product");
  };

  return (
    <Box
      dir="rtl"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
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
              <IconButton
                onClick={() => navigate("/")}
                sx={{ color: "#c1dbca" }}
              >
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
            value={tabValue}
            onChange={handleTabChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              "& .MuiTab-root": {
                color: "#7a7a7a",
                fontWeight: "bold",
                minWidth: 90,
                "&.Mui-selected": { color: "#E56360" },
              },
              "& .MuiTabs-indicator": { backgroundColor: "#E56360" },
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

      <Container
        sx={{
          flexGrow: 1,
          marginTop: "6rem",
          paddingLeft: "2rem",
          position: "relative",
          height: location.pathname === "/" ? "calc(100vh - 6rem)" : "auto",
        }}
        maxWidth={false}
        disableGutters
      >
        {location.pathname === "/" && (
          <>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                overflow: "hidden",
                pointerEvents: "none",
              }}
            >
              <Waves
                lineColor="#fff"
                backgroundColor="#5ea4a4"
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

            <Fade in timeout={1200}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  minHeight: 350,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1,
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
                    margin: 10,
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
                        text={`
                          SmartGifts - המתנה המושלמת מחכה לך
                          כשמציפים אותך אלפי אפשרויות,\n כשמתלבטים בין זול ליוקרתי, בין רגיל למיוחד –\n הלב רק רוצה לבחור נכון.\n מתנה שתאיר פנים, שתגיד בלי מילים: "חשבתי עליך באמת"
                          וזה בדיוק מה שאנחנו עושים.\n ב-SmartGifts – אנחנו בוחרים איתך.\n בחוכמה. ברגש. באהבה.
                          המגוון שלנו:
                          ✨ פינוק אישי - מתנות שמלטפות את הנשמה  
                          💕 בילוי זוגי - חוויות משותפות בלתי נשכחות  
                          🍫 אוכל ומתוקים - טעמים שמביאים שמחה  
                          🎨 חוויות וסדנאות למידה ויצירה מרגשות  
                          🏠 מתנות לבית - חמימות שנשארת לתמיד  
                          ✡️ יהדות - מתנות עם משמעות רוחנית  
                          📚 ספרים ולמידה - עולמות חדשים להכיר  
                          👗 אופנה וסטייל - ביטוי אישי ייחודי  
                          🎭 תרבות ובידור - רגעי הנאה וחוויה`}
                      />
                    </div>
                  </Typography>
                </Paper>
              </Box>
            </Fade>
          </>
        )}

        <Outlet />
      </Container>

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
