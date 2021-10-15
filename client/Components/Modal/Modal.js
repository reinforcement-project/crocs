import styled from "styled-components";

// Styles
const ModalElement = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 80%;
  height: 60%;
`;
const Modal = ({ close, children }) => {
  return (
    <ModalElement onClick={close}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalElement>
  );
};

export default Modal;
