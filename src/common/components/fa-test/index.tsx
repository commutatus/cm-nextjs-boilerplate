import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@awesome.me/kit-0a2bc5da59/icons/classic/solid";
import ClientSide from "./client-side";

const Component = () => {

  return (
    <div>
      Server side:
      <FontAwesomeIcon icon={faHouse} />
      <ClientSide />
    </div>
  );
};

export default Component;
