import { useEffect } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import Loader from "./components/Loader/Loader";
import {
  selectContacts,
  selectLoading,
  selectError,
} from "./redux/contactsSlice";

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const Loading = useSelector(selectLoading);
  const Error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {Loading && <Loader />}
      {Error && <p>Error message</p>}
      {contacts.length > 0 && <ContactList />}
    </>
  );
};

export default App;
