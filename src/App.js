import * as React from "react";
import { useState, useEffect } from "react";
import { Virtuoso } from "react-virtuoso";
import { useParams, Link, Route, Routes, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Detail from "./components/Detail";

const App = () => {
  const [users, setUsers] = useState(() => []);
  const [page, setPage] = useState(1);

  const params = useParams();

  const getUsers = async (page) => {
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
    setPage(data.page || page);
    setUsers(data.data);
    return data;
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);

  const loadMore = async () => {
    const newUsers = await getUsers(page);
    console.log(newUsers.data);
    setUsers([...users, ...newUsers.data]);
  };

  // const loader = (
  //   <div key="loader" className="loader">
  //     Loading ...
  //   </div>
  // );

  return (
    <>
      <BrowserRouter>
        <ViewList>
          <Virtuoso
            data={users}
            data-virtuoso-scroller="true"
            style={{ height: "100vh" }}
            totalCount={200}
            endReached={loadMore}
            overscan={200}
            itemContent={(index, user) => (
              <VirtuosoCard>
                <Link to={`/users/${(params.userId = user.id)}`}>
                  <Card key={index}>
                    <Image src={user.picture} />
                    <span style={{ marginRight: '65px'}}>
                      {user.firstName} {user.lastName}
                    </span>
                  </Card>
                </Link>
                <Routes>
                  <Route path={`/users/${(params.userId = user.id)}`} element={<Detail id={user.id} name={user.firstName} surname={user.lastName} img={user.picture} />}>
                    
                  </Route>
                </Routes>
              </VirtuosoCard>
            )}
          />
        </ViewList>
        
      </BrowserRouter>
    </>
  );
};

export default App;

const ViewList = styled.div`
   {
    width: 300px;
    height: 100%;
  }
`;

const VirtuosoCard = styled.div`
   {
    displa: flex;
    gap: 16px;
    border-radius: 8px;
    border: 1px solid gray;
    width: auto;
    height: 100px;
    margin: 8px;
  }
`;

const Card = styled.div`
   {
    display: flex;
    padding: 16px;
    justify-content: space-between;
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
