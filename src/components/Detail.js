import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Detail = ({ id }) => {
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(userDetail);

  return (
    <>
      <DetailContainer key={id}>
        <h1>
          {userDetail.firstName} {userDetail.lastName}
        </h1>
        <DetailImage
          src={userDetail.picture}
          alt={userDetail.picture}
        ></DetailImage>
        <p>Email: {userDetail.email}</p>
        <p>Pohlavie: {userDetail.gender}</p>
        <p>Dátum narodenia: {userDetail.dateOfBirth}</p>
        <p>Telefon: {userDetail.phone}</p>
      </DetailContainer>
    </>
  );
};

export default Detail;

const DetailContainer = styled.div`
   {
    display: flex;
    flex-direction: column;
    positon: absolute;
    left: 300px;
  }
`;

const DetailImage = styled.img`
   {
    width: 64px;
    height: 64px;
  }
`;
