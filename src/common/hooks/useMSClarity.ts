import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { runMSClarityFunction } from "@/common/utils/helpers";

const useMSClarity = () => {
  useEffect(() => {
    runMSClarityFunction((projectId) => {
      Clarity.init(projectId);
    });
  }, []);
};

export default useMSClarity;
