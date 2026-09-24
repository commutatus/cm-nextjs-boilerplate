import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { runIfMSClarityEnabled } from "@/common/utils/helpers";

const useMSClarity = () => {
  useEffect(() => {
    runIfMSClarityEnabled((projectId) => {
      Clarity.init(projectId);
    });
  }, []);
};

export default useMSClarity;
