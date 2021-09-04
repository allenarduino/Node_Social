import styled from "styled-components";

export const PostCardDesign = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 10px 10px 0;
  margin-top: 20px;
  align-self: center;
  border-bottom-width: 1px;
  border-bottom-color: #3333;
`;

export const UserImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

export const PostCardContent = styled.View`
  width: 100%;
  padding-left: 10px;
  overflow: hidden;
`;

export const Line1 = styled.View`
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LineBox = styled.View`
  width: 80%;
  display: flex;
  flex-direction: row;
`;

export const UserName = styled.Text`
  font-weight: 700;
  margin-left: 10;
`;

export const Delete = styled.TouchableOpacity`
  position: relative;
  display: flex;
  margin-top: 10px;
`;

export const Line2 = styled.View`
  margin-bottom: 10px;
  margin-left: 57px;
  margin-top: -20px;
  overflow: hidden;
`;

export const Line3 = styled.View`
  width: 85%;
  align-self: flex-end;
  height: auto;
  max-height: 300px;
  overflow: hidden;
  border-radius: 15px;
  resize-mode: contain;
`;

export const PostImage = styled.Image`
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

export const Line4 = styled.View`
  width: 85%;
  align-self: flex-end;
  padding-top: 10px;
  padding-bottom: 10px;
  flex-direction: row;
  height: auto;
  overflow: hidden;
`;

export const HeartWrapper = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  width: 70px;
`;

export const CommentBackground = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  width: 70px;
`;
