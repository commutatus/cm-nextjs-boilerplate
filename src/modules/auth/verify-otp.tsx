import { useGlobals } from "@/common/context/globals";
import { Button, Form, Input, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

type MutationFunction<TVariables = unknown> = (
  options?: { variables?: TVariables; [key: string]: unknown }
) => Promise<{ data?: Record<string, unknown>; [key: string]: unknown }>;

const { Text, Title } = Typography;

type VerifyOtpProps = {
  userEmail?: string;
  showLogin?: () => void;
  requestOtp?: MutationFunction<{ input: { email: string } }>;
  isRequestingOtp?: boolean;
  isModal?: boolean;
  onAuthSuccess?: () => void;
};

const OTP_COOLDOWN_SECONDS = 30;

const parseOtpTime = (seconds: number) => {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

interface OTPFormValues {
  otp: string;
}

const VerifyOtp = ({
  isModal,
  isRequestingOtp,
  requestOtp,
  userEmail,
  showLogin,
  onAuthSuccess,
}: VerifyOtpProps) => {
  const [form] = Form.useForm<OTPFormValues>();
  const [otpTimeRemaining, setOtpTimeRemaining] =
    useState<number>(OTP_COOLDOWN_SECONDS);
    
  let verifyOtp: MutationFunction<{ input: { email: string; otp: string } }> | undefined;
  const verifyingOtp = false;
  const { notificationApi, auth } = useGlobals();

  useEffect(() => {
    if (otpTimeRemaining === 0) {
      return;
    }

    const timer = setInterval(() => {
      setOtpTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [otpTimeRemaining]);

  const canResendOtp = otpTimeRemaining <= 0;

  const otpValue = Form.useWatch("otp", form);

  const isOtpComplete = otpValue?.length === 6;

  const handleVerifyOtp = (values: OTPFormValues) => {
    const otpToVerify = values.otp;
    if (!otpToVerify || !userEmail) {
      return;
    }

    const variables = {
      input: {
        email: userEmail,
        otp: otpToVerify,
      },
    };

    verifyOtp?.({
      variables,
    })
      .then((res: { data?: Record<string, unknown> }) => {
        const { accessToken, refreshToken } = (res.data?.verifyOtp as { accessToken?: string; refreshToken?: string }) ?? {};
        if (!accessToken) {
          notificationApi?.error({
            message: "Invalid OTP. Please try again.",
          });
          return;
        }
        auth?.onLoginSuccess({
          accessToken,
          refreshToken,
        });
        onAuthSuccess?.();
        notificationApi?.success({
          message: "Login successful",
        });
      })
      .catch((error: { message?: string }) => {
        const message =
          (error as { cause?: { message?: string }; message?: string })?.cause?.message ??
          (error as { message?: string })?.message ??
          "An error occurred during OTP verification.";

        notificationApi?.error({
          message,
        });
      });
  };

  const handleRequestOtp = () => {
    if (!requestOtp || isRequestingOtp || !userEmail) {
      return;
    }

    requestOtp({
        variables: {
          input: {
            email: userEmail,
          },
        },
      })
      .catch((error: { message?: string }) => {
        notificationApi?.error({
          message: error?.message ?? "Failed to request OTP. Please try again.",
        });
      });
  };

  const handleResendOtp = () => {
    setOtpTimeRemaining(OTP_COOLDOWN_SECONDS);
    handleRequestOtp();
  };

  return (
    <Form
      className="flex flex-col items-center gap-2"
      onFinish={handleVerifyOtp}
      form={form}
    >
      {
        !isModal && (
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={showLogin}
            className="!text-gray-500 hover:!text-gray-700 mb-4 mr-auto"
            size="small"
          >
            Back
          </Button>
        )
      }
      <div className="text-center mb-2">
        <Title level={4} className="text-center">
          Enter verification code
        </Title>
        <Text className="text-gray-500">
          We sent a code to <strong>{userEmail}</strong>. <Button type="link" onClick={showLogin} className="p-0!">Not you?</Button>
        </Text>
      </div>
      <Form.Item
        name="otp"
        rules={[
          {
            required: true,
            message: "Please enter the OTP",
          },
        ]}
      >
        <Input.OTP
          length={6}
          disabled={verifyingOtp}
          size="large"
          inputMode="numeric"
          onInput={(val) => form.setFieldsValue({ otp: val.join("") })} // Default onChange isn't working for OtpInput
        />
      </Form.Item>
      <Button
        type="primary"
        loading={verifyingOtp}
        disabled={!isOtpComplete}
        size="large"
        block
        htmlType="submit"
      >
        Submit OTP
      </Button>
      <div className="flex justify-center mt-2">
        {canResendOtp ? (
          <Button type="link" onClick={handleResendOtp} size="small">
            Resend OTP
          </Button>
        ) : (
          <Text type="secondary">
            Resend OTP in{" "}
            <span className="text-black">
              {parseOtpTime(otpTimeRemaining)}
            </span>
          </Text>
        )}
      </div>
    </Form>
  );
};

export default VerifyOtp;
