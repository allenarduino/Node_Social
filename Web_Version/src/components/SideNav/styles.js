import styled from "styled-components";

export const SideNavContainer = styled.div`
  flex-direction: column;
  display: flex;
  border-radius: 20px;
  box-shadow: 0px 0px 2px;
  margin-top: 100px;
  width: 70%;
  height: 300px;
  align-self: center;
`;

export const NavOptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const NavOptionItem = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
`;
