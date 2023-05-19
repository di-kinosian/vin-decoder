import "./index.scss";
import { ReactComponent as Info } from "../../assets/info.svg";

export const Alert = (props) => (
  <div className={`alert ${props.type}`}>
    <Info className={`alert-icon ${props.type}`} />
    {props.children}
  </div>
);
