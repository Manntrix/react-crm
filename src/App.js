import "./App.scss";
import Header from "./components/Header/Header";
import { Col, Row, Container } from "react-bootstrap";
import Main from "./components/Main/Main";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import collapse from "./assets/img/collapse.png";
import collapsetwo from "./assets/img/collapsetwo.png";
import { useDispatch } from "react-redux";
import { handleMenu } from "./store/actions/menuAction";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProtectedAuth from "./components/ProtectedRoutes/ProtectedAuth";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { getCaptchaToken } from "./store/actions/authAction";

function App() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state);

  const { menuCollapse } = menu.menu;

  const auth = useSelector((state) => state.auth);

  const { token, isLoggedIn } = auth;

  console.log(isLoggedIn);

  const menuIconClick = () => {
    menuCollapse ? dispatch(handleMenu(false)) : dispatch(handleMenu(true));
  };

  return (
    <div id="app">
      <Router>
        <ProtectedAuth isLoggedIn={isLoggedIn}>
          <Route path="/signup">
            <GoogleReCaptchaProvider
              scriptProps={{ async: true }}
              reCaptchaKey="6LfLgyQbAAAAAMTnkKXFraJeFgmj8goCLDljlkb8"
            >
              <Signup />
            </GoogleReCaptchaProvider>
          </Route>
          <Route exact path="/login" exactly>
            <GoogleReCaptchaProvider
              scriptProps={{ async: true }}
              reCaptchaKey="6LfLgyQbAAAAAMTnkKXFraJeFgmj8goCLDljlkb8"
            >
              <Login />
            </GoogleReCaptchaProvider>
          </Route>
        </ProtectedAuth>
        <ProtectedRoutes isLoggedIn={isLoggedIn}>
          <div
            className="closemenu"
            onClick={menuIconClick}
            style={{
              left: menuCollapse ? "calc(80px - 18px)" : "calc(260px - 18px)",
            }}
          >
            {menuCollapse ? <img src={collapsetwo} /> : <img src={collapse} />}
          </div>
          <Container fluid style={{ position: "relative" }}>
            <Header />
            <Row className="scrollable">
              <Switch>
                <Route exact path="/" exactly>
                  <Col
                    md={{
                      span: menuCollapse ? 11 : 9,
                      offset: menuCollapse ? 1 : 3,
                    }}
                    sm={12}
                  >
                    <Main />
                  </Col>
                </Route>
              </Switch>
            </Row>
          </Container>
        </ProtectedRoutes>
      </Router>
    </div>
  );
}

export default App;
