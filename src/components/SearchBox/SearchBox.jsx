import { useDispatch, useSelector } from "react-redux";
import styles from "./SearchBox.module.css";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleFilterChange = (event) => dispatch(changeFilter(event));

  return (
    <div className={styles.search}>
      <p className={styles.text}>Find contacts by name</p>
      <input
        className={styles.input}
        type="text"
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
