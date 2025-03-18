import { Helmet } from "react-helmet";

const HelmetPage = ({ title }) => {
  return (
    <Helmet>
      <title>Maveric Bank | {title}</title>
    </Helmet>
  );
};
export default HelmetPage;
