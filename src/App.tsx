// import React, { useState, useEffect } from 'react';
// import { CircularProgress, Button, Card, CardContent, CardActions, Typography, CardActionArea, CardMedia } from '@mui/material';

// interface User {
//   login: {
//     uuid: string;
//   };
//   name: {
//     first: string;
//     last: string;
//   };
//   picture: {
//     large: string;
//   };
// }

// const App: React.FC = () => {
//   const [loading, setLoading] = useState(true);
//   const [users, setUsers] = useState<User[]>([]);
//   const [totalUsers, setTotalUsers] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('https://randomuser.me/api/?results=50');
//         let data  = await response.json();
//         localStorage.setItem('userList',JSON.stringify(data));
//         setUsers(data.results);
//         setTotalUsers(data.results.length);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = (userid: any) => {
//       const data = users.filter(data => {
//       return userid !== data.login.uuid
//     })
//     setTotalUsers(data.length)
//     localStorage.setItem('userlist',JSON.stringify(data))
//     setUsers(data);
//   };

//   const handleRefresh = async () => {
//     setLoading(true);
//       try {
//         const response = await fetch('https://randomuser.me/api/?results=50');
//         let data  = await response.json();
//         localStorage.setItem('userList',JSON.stringify(data));
//         setUsers(data.results);
//         setTotalUsers(data.results.length);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//   };

//   return (
//     <div>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <div>
//           <Button  variant="contained" color="primary" onClick={handleRefresh}>
//             Refresh
//           </Button>
//           <Typography variant="h6">Total Users: {totalUsers}</Typography>
//           {users.map((user) => (
//              <Card sx={{ maxWidth: 345 }} key={user.login.uuid}>
//              <CardActionArea>
//                <img src={user.picture.large}  alt="profile" />
//                <CardContent>
//                  <Typography gutterBottom variant="h5" component="div"> {`${user.name.first} ${user.name.last}`}</Typography>
//                  <Typography variant="body2" color="text.secondary">
//                  <Button onClick={() => handleDelete(user.login.uuid)} variant="contained" color="secondary" > Delete </Button>
//                  </Typography>
//                </CardContent>
//              </CardActionArea>
//            </Card>
//           ))}
//         </div>
//       )}
//     </div>

//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Button,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";

interface User {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const storedUsers = localStorage.getItem("userList");
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUsers(parsedUsers.results);
      setTotalUsers(parsedUsers.results.length);
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://randomuser.me/api/?results=50");
      const data = await response.json();
      localStorage.setItem("userList", JSON.stringify(data));
      setUsers(data.results);
      setTotalUsers(data.results.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userid: string) => {
    const updatedUsers = users.filter((user) => user.login.uuid !== userid);
    setTotalUsers(updatedUsers.length);
    setUsers(updatedUsers);
    localStorage.setItem("userList", JSON.stringify({ results: updatedUsers }));
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Button variant="contained" color="primary" onClick={handleRefresh}>
            Refresh
          </Button>
          <Typography variant="h6">Total Users: {totalUsers}</Typography>
          {users.map((user) => (
            <Card sx={{ maxWidth: 345 }} key={user.login.uuid}>
              <CardActionArea>
                <img src={user.picture.large} alt="profile" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${user.name.first} ${user.name.last}`}
                  </Typography>
                  <Button
                    onClick={() => handleDelete(user.login.uuid)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
