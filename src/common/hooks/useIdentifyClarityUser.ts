import { useEffect } from "react";
import Clarity from "@microsoft/clarity";
import { runIfMSClarityEnabled } from "@/common/utils/helpers";

const useIdentifyClarityUser = (userId?: string | null) => {
  useEffect(() => {
    if (!userId) {
      return;
    }
    runIfMSClarityEnabled(() => {
      Clarity.identify(userId, undefined, undefined, `User ${userId}`);
    });
  }, [userId]);
};

export default useIdentifyClarityUser;
