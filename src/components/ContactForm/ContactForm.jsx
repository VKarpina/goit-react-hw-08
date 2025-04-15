import { useDispatch } from "react-redux";
import styles from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsOps";
// import { addContact } from "../../redux/contactsSlice";

const onlyNumber = /^[0-9\s-]+$/;
const onlyLetters = /^[A-Za-zA-Яа-яЄєІіЇїҐґ\s]+$/;

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(onlyLetters, "Only letters allowed!")
    .required("Required"),
  number: Yup.string()
    .matches(onlyNumber, "This is not a number!")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(
      addContact({
        name: values.name,
        number: values.number,
      })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={styles.contactForm}>
        <label className="form-label">
          <span>Name</span>
          <Field className={styles.formInput} type="text" name="name" />
          <ErrorMessage name="name" className={styles.error} component="div" />
        </label>

        <label className="form-label">
          <span>Number</span>
          <Field className={styles.formInput} type="text" name="number" />
          <ErrorMessage
            name="number"
            className={styles.error}
            component="div"
          />
        </label>

        <button className={styles.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
