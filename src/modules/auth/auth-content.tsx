import React, { useState } from "react";
import Image from "next/image";
import { Typography, Card } from "antd";
import { useGlobals } from "@/common/context/globals";
import Login from "./login";
import VerifyOtp from "./verify-otp";
import { AuthPageStates } from "./auth-page.types";
import classNames from "classnames";

const { Text } = Typography;

const AuthContent = ({
  className,
  isModal = false,
}: {
  className?: string;
  isModal?: boolean;
}) => {
  const { authPageState, showLogin, showVerifyOtp } = useGlobals();
  const [userEmail, setUserEmail] = useState("");
  
  return (
    <div className={classNames(className)}>
      {
        !isModal && (
          <div className="text-center mb-4">
            <Image
              src="/assets/images/cm-icon.png"
              width={128}
              height={128}
              alt="Logo"
              className="mx-auto w-32 object-contain"
            />
            <Text className="text-gray-500">
              CM NextJS Boilerplate
            </Text>
          </div>
        )
      }
      <Card className={classNames("border border-gray-100 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]!", {
        "border-0! shadow-none!": isModal,
      })}>
          {authPageState === AuthPageStates.login ? (
            <Login
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              showVerifyOtp={showVerifyOtp}
              isModal={isModal}
            />
          ) : (
            <VerifyOtp
              userEmail={userEmail}
              showLogin={showLogin}
              isModal={isModal}
            />
          )}
      </Card>
    </div>
  )
}

export default AuthContent;
