import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@awesome.me/kit-0a2bc5da59/icons/classic/solid";
import { faCat } from "@awesome.me/kit-0a2bc5da59/icons/sharp/solid";
import { faDog } from "@awesome.me/kit-0a2bc5da59/icons/duotone/solid";
import { faDragon } from "@awesome.me/kit-0a2bc5da59/icons/sharp-duotone/solid";
import { Button } from "antd";


const Component = () => {
  const [first, setFirst] = useState(false);

  const [second, setSecond] = useState(false);

  return (
    <div>
      Client side
      <Button
        onClick={() => {
          setFirst(!first);
        }}
      >
        switch cat/dog
      </Button>
      {first ? (
        <FontAwesomeIcon icon={faCat} />
      ) : (
        <FontAwesomeIcon icon={faDog} />
      )}
      <Button
        onClick={() => {
          setSecond(!second);
        }}
      >
        switch dragon/house
      </Button>
      <FontAwesomeIcon icon={second ? faDragon : faHouse} />
    </div>
  );
};

export default Component;
