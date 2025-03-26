import Antd from "@/modules/antd";

export default Antd;
const getServerSideProps = async () => {
  console.log('server side props')
  return {
    props: {},
  };
}
export { getServerSideProps };