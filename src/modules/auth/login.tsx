import { useGlobals } from "@/common/context/globals";
import { MutationFunction } from "@apollo/client";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

type LoginProps = {
  userEmail?: string;
  setUserEmail?: (email: string) => void;
  showVerifyOtp?: () => void;
  requestOtp?: MutationFunction;
  isRequestingOtp?: boolean;
};

const Login = (props: LoginProps) => {
  const { userEmail, setUserEmail, isRequestingOtp } = props;
  const { notificationApi } = useGlobals();
  const [form] = Form.useForm();

  const handleSendOtp = (values: { email: string }) => {
    setUserEmail?.(values.email);
    props.showVerifyOtp?.();
    props
      .requestOtp?.({
        variables: {
          input: {
            email: values.email,
          },
        },
      })
      .then(() => {
        props.showVerifyOtp?.();
      })
      .catch((error) => {
        notificationApi?.error({
          message: "Error",
          description: error.message,
        });
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSendOtp}
      requiredMark={false}
      initialValues={{
        email: userEmail,
      }}
    >
      <Title level={4} className="text-center mb-2!">
        Enter your email to login
      </Title>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input
          placeholder="you@example.com"
          size="large"
          className="rounded-lg"
          inputMode="email"
          type="email"
        />
      </Form.Item>
      <Form.Item className="mb-0 mt-6">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={isRequestingOtp}
        >
          Send OTP
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
