import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={s.list}>
      {contacts.map((item) => (
        <li className={s.item} key={item.id}>
          <Contact contact={item} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
