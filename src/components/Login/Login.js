import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { handleLogin } from "../../store/actions/authAction";
import "./Login.scss";
import { RiLockFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [captchatoken, setCaptchatoken] = useState("");
  const auth = useSelector((state) => state.auth);

  const { token, isLoggedIn } = auth.token;
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(
    (event) => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      (async () => {
        try {
          const token = await executeRecaptcha("signin");
          setCaptchatoken(token);
        } catch (error) {
          console.log(error.response);
        }
      })();
    },
    [executeRecaptcha]
  );

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  return (
    <div className="loginpage">
      <Container className="login">
        <Card>
          <span className="lock">
            <RiLockFill />
          </span>
          <Card.Body>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email(`${t("email")} is not valid`)
                  .required(`${t("email")} is required`),
                password: Yup.string()
                  .min(6, "Password must be at least 6 charaters")
                  .required("Password is required"),
              })}
              onSubmit={(fields) => {
                handleReCaptchaVerify();
                const { email, password } = fields;
                dispatch(handleLogin({ email, password, captchatoken }));
              }}
              render={({ errors, touched }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">{t("email")}</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t("password")}</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group submitbtn">
                    {captchatoken ? (
                      <button type="submit" className="btn btn-ghost mr-2">
                        {t("login")}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </Form>
              )}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
