import { Outlet } from "react-router-dom";

type LandingProps = {};

const Landing: React.FC<LandingProps> = () => {
  return (
    <div className="h-screen w-screen flex bg-gray-200 bg-wtbam-tablet bg-no-repeat bg-cover bg-opacity-10 bg-center">
      <div className="flex flex-col  w-full mx-auto bg-gray-600  backdrop-blur-md bg-opacity-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Landing;
