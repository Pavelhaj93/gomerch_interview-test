import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Virtuoso } from "react-virtuoso";

const App = () => {
  const [users, setUsers] = useState(() => []);
  const [page, setPage] = useState(1);

  const getUsers = async (page) => {
    const res = await fetch(
      `https://dummyapi.io/data/v1/user?page=${page}&limit=10`,
      {
        method: "GET",
        headers: {
          "app-id": "627a6b9eaf56419de59a26b9"
        }
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
      <Virtuoso
        data={users}
        style={{ height: "100vh" }}
        totalCount={200}
        endReached={loadMore}
        overscan={200}
        itemContent={(index, user) => (
          <div>
            Item {user.firstName} {user.lastName} <br></br>
            <br></br>
            {index}
          </div>
        )}
      />
    </>
  );
};

export default App;
