import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { logIn } from "../../redux/auth/operations";

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const contactSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Required")
    .email("Invalid email")
    .matches(emailRegex, "Invalid email"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" className={css.error} component="div" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
          <ErrorMessage name="password" className={css.error} component="div" />
        </label>
        <button type="submit">Log In</button>
      </Form>
    </Formik>
  );
};
