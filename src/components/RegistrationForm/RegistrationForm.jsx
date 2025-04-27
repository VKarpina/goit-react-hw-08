import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
const onlyLetters = /^[A-Za-zA-Яа-яЄєІіЇїҐґ\s]+$/;

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(onlyLetters, "Only letters allowed!")
    .required("Required"),
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

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Username
          <Field type="text" name="name" autoComplete="name" required />
          <ErrorMessage name="name" className={css.error} component="div" />
        </label>
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
          <ErrorMessage name="email" className={css.error} component="div" />
        </label>
        <label className={css.label}>
          Password
          <Field
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
          <ErrorMessage name="password" className={css.error} component="div" />
        </label>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
