import { Button, Modal } from "antd";
import AuthContent from "./auth-content";
import { useState } from "react";

const AuthModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} type="primary">Login</Button>
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <AuthContent isModal onAuthSuccess={handleCloseModal} />
      </Modal>
    </>
  )
}

export default AuthModal;
