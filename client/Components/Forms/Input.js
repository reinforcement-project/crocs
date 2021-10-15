import styled from "styled-components";

const InputElement = styled.input`
  display: block;
  width: 100%;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  padding: 10px 14px;

  &:focus {
    border: 1px solid #d6bbfb;
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #f4ebff;
    border-radius: 8px;
    outline: none;
  }
`;

const Input = ({ type, placeholder, onChange }) => {
  return (
    <InputElement type={type} placeholder={placeholder} onChange={onChange} />
  );
};

export default Input;
