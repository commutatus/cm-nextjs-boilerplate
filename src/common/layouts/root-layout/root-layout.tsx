import Footer from "@/common/components/footer";
import Navbar from "@/common/components/navbar";
import { Layout } from "antd";
import classNames from "classnames";

const { Content } = Layout;
type Props = {
  children?: React.ReactNode;
  isFooterHidden?: boolean;
};

const RootLayout: React.FC<Props> = ({ children, isFooterHidden = false }) => {
  return (
    <Layout className={classNames("!min-h-[100dvh]")}>
      <Navbar />
      <Content>{children}</Content>
      {!isFooterHidden && <Footer />}
    </Layout>
  );
};

export default RootLayout;
