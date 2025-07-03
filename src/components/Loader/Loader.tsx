import loader from "../../assets/loader.json";
import Lottie from "lottie-react";
export default function Loader() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Lottie className="w-96" animationData={loader} loop={true} />;
    </div>
  );
}
