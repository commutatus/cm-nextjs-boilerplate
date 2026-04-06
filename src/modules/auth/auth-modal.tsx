import { Button, Modal } from "antd";
import AuthContent from "./auth-content";
import { useState } from "react";

const AuthModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} type="primary">Login</Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <AuthContent isModal />
      </Modal>
    </>
  )
}

export default AuthModal;
