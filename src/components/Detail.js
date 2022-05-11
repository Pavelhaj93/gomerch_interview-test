import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const Detail = ({ id }) => {
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyapi.io/data/v1/user/${id}`, {
      method: "GET",
      headers: { "app-id": "627249a445202f3fa873e101" },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUserDetail(data);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(userDetail);

  return (
    <>
      <DetailContainer key={id}>
          <h1>{userDetail.firstName} {userDetail.lastName} </h1>
          <DetailImage src={userDetail.picture} alt={userDetail.picture}></DetailImage>
          <p>Email: {userDetail.email}</p>
          <p>Pohlavie: {userDetail.gender}</p>
          <p>Dátum narodenia: {userDetail.dateOfBirth}</p>
          <p>Telefon: {userDetail.phone}</p>
      </DetailContainer>
    </>
  );
};

export default Detail;

const DetailContainer = styled.div `{
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    positon: absolute;
    top: 0:
    left: 300px;
}`

const DetailImage = styled.img `{
    width: 64px;
    height: 64px;
}`
