import { Header } from "../Header";
import "./index.scss";

export const Layout = (props) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-content">{props.children}</div>
    </div>
  );
};
