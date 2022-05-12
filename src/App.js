import * as React from "react";
import { useState, useEffect, useRef } from "react";
import {
  useParams,
  Link,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import styled from "styled-components";
import { Virtuoso } from "react-virtuoso";

const App = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [userDetail, setUserDetail] = useState({});
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const loadedTime = useRef();

  // fetch for ListView
  const fetchUsers = async (page) => {
    const res = await fetch(
      `https://dummyapi.io/data/v1/user?page=${page}&limit=10`,
      {
        method: "GET",
        headers: {
          "app-id": "627a6b9eaf56419de59a26b9",
        },
      }
    );
    const data = await res.json();

    const temp = [...users].concat(data.data);

    console.log("temp", temp.length);
    setUsers(temp);
  };

  useEffect(() => {
    loadedTime.current = Date.now();
    fetchUsers(0);
  }, [page]);

  const loadMore = async () => {
    const current = Date.now();
    const gap = current - loadedTime.current;
    loadedTime.current = current;

    console.log("loadMore", gap, page, users.length);

    // prevents the first loadMore fetch which loaded 20 items immidietaly after the websited has loaded instead of first 10
    if (gap < 500) return;

    setPage(page + 1);
    fetchUsers(page + 1);
  };

  const returnId = (user) => {
    setId(user.id);
    console.log(user.id);
  };

  useEffect(() => {
    const fetchUserDetail = async (id) => {
      if (id !== null) {
        setLoading(true);
        fetch(`https://dummyapi.io/data/v1/user/${id}`, {
          method: "GET",
          headers: {
            "app-id": "627a6b9eaf56419de59a26b9",
          },
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
            console.error("Error fetching data", error);
            setError(error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    };
    fetchUserDetail(id);
  }, [id]);

  return (
    <>
      <BrowserRouter>
        <Main>
          <ListView>
            <Virtuoso
              data={users}
              data-virtuoso-scroller="true"
              style={{ height: "100vh" }}
              totalCount={200}
              endReached={loadMore}
              overscan={200}
              itemContent={(index, user) => (
                <VirtuosoCard>
                  <Link to={`/${(params.userId = user.id)}`}>
                    <Card key={index} onClick={() => returnId(user)}>
                      <Image src={user.picture} />
                      <span
                        style={{ textAlign: "start", whiteSpace: "nowrap" }}
                      >
                        {user.firstName} {user.lastName}
                      </span>
                    </Card>
                  </Link>
                </VirtuosoCard>
              )}
            />
          </ListView>
          {loading && <span>..loading</span>}
          <Routes>
            <Route
              path={`/${(params.userId = userDetail.id)}`}
              element={
                !loading && (
                  <Detail key={userDetail.id}>
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
                  </Detail>
                )
              }
            ></Route>
          </Routes>
        </Main>
      </BrowserRouter>
    </>
  );
};

export default App;

const Main = styled.main`
   {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }
`;

// ListView

const ListView = styled.div`
   {
    width: 300px;
    height: 100%;
    position: relative;
  }
`;

const VirtuosoCard = styled.div`
   {
    displa: flex;
    border-radius: 8px;
    border: 1px solid gray;
    width: auto;
    height: 100px;
    margin: 8px;
    align-items: center;
  }
`;

const Card = styled.div`
   {
    display: flex;
    padding: 16px;
    gap: 16px;
    justify-content: start;
    align-items: center;
  }
`;

const Image = styled.img`
   {
    heigh: 64px;
    width: 64px;
    border-radius: 8px;
    aspect-ratio: auto 64 / 64;
  }
`;

// Detail

const Detail = styled.div`
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
