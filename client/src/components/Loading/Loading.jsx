import image from "../../img/loading.gif";
import "./loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <img src={image} alt="Loading.." />
    </div>
  );
}
