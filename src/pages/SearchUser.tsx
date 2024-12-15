import { Helmet } from "react-helmet-async";
import { SearchUserView } from "../sections/SearchUser/view";

const SearchUser = () => {
  return (
    <>
      <Helmet>
        <title>Search User </title>
      </Helmet>
      <SearchUserView />
    </>
  );
};

export default SearchUser;
