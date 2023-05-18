import "./index.scss";
import notFoundPage from "../../assets/notFoundPage.svg";

export const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-page-head">
        <img src={notFoundPage} alt="error" className="error-page-body" />
        <span>OOOPS!</span>
        <span>Page is not found</span>
      </div>
    </div>
  );
};
