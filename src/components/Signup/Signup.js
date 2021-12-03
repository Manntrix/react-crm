import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PhoneInput from "react-phone-number-input";
import { handleSignup } from "../../store/actions/authAction";

import "./Signup.scss";

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [captchatoken, setCaptchatoken] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleMobileNumber = (e) => {
    console.log(e);
    setMobileNumber(e);
  };

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
    <div className="signuppage">
      <Container className="signup">
        <Card>
          <Card.Body>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                mobile: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("First Name Required"),
                lastName: Yup.string()
                  .max(20, "Must be 20 characters or less")
                  .required("Last Name Required"),
                email: Yup.string()
                  .email("Email is invalid")
                  .required("Email is required"),
                password: Yup.string()
                  .min(6, "Password must be at least 6 charaters")
                  .required("Password is required"),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref("password"), null], "Password doesn't match")
                  .required("Confirm password is required"),
              })}
              onSubmit={(fields) => {
                handleReCaptchaVerify();
                console.log(captchatoken);
                const {
                  email,
                  password,
                  firstName,
                  lastName,
                  confirmPassword,
                } = fields;
                dispatch(
                  handleSignup({
                    email,
                    password,
                    firstName,
                    lastName,
                    confirmPassword,
                    captchatoken,
                    mobileNumber,
                  })
                );
              }}
              render={({ errors, touched }) => (
                <Form>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="firstName">{t("firstName")}</label>
                        <Field
                          name="firstName"
                          type="text"
                          className={
                            "form-control" +
                            (errors.firstName && touched.firstName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="lastName">{t("lastName")}</label>
                        <Field
                          name="lastName"
                          type="text"
                          className={
                            "form-control" +
                            (errors.lastName && touched.lastName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
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
                    </Col>
                    {/* <div className="form-group">
                    <label htmlFor="mobile">{t("mobile")}</label>
                    <Field
                      name="mobile"
                      type="text"
                      className={
                        "form-control" +
                        (errors.mobile && touched.mobile ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="mobile"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div> */}
                    <Col>
                      <div className="form-group">
                        <label htmlFor="mobile">{t("mobile")}</label>
                        <PhoneInput
                          value={mobileNumber}
                          onChange={handleMobileNumber}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
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
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label htmlFor="confirmPassword">
                          {t("confirmPassword")}
                        </label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={
                            "form-control" +
                            (errors.confirmPassword && touched.confirmPassword
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="form-group submitbtn">
                    {captchatoken ? (
                      <button type="submit" className="btn btn-ghost mr-2">
                        {t("register")}
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

export default Signup;
