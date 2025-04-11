
import { Box, Container, CssBaseline, Typography } from "@mui/material";
//import axios from "axios";
import { useState } from "react"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
//import { useQuery } from "@tanstack/react-query";
import {useActivities}  from "../../lib/hooks/useActivities";
function App() {
  //const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const {activities, isPending} = useActivities();
  
  // const {data: activities, isPending} = useQuery({
  //   queryKey: ['activities'],
  //   queryFn: async () => {
  //     const response = await axios.get<Activity[]>("https://localhost:5001/api/activities")
  //     return  response.data;
  //     }
  // })
  // useEffect(() => {
  //  axios.get<Activity[]>("https://localhost:5001/api/activities")
  //     .then(response => setActivities(response.data))
  //   // fetch('https://localhost:5001/api/activities')
  //   //   .then(response => response.json())
  //   //   .then(data => setActivities(data))
  // }, [])
    const handleSelectActivity = (id: string) => {
      setSelectedActivity(activities!.find((x) => x.id === id));
    };

    const handleCancelSelectActivity = () => {
      setSelectedActivity(undefined);
    };

    const handleOpenForm = (id?: string) => {
      if (id) handleSelectActivity(id);
      else handleCancelSelectActivity();
      setEditMode(true);
    };

    const handleFormClose = () => {
      setEditMode(false);
    };

    // const handleSubmitForm = (activity: Activity) => {
    //   // if (activity.id) {
    //   //   setActivities(
    //   //     activities.map((x) => (x.id === activity.id ? activity : x))
    //   //   );
    //   // } else {
    //   //   const newActivity = { ...activity, id: activities.length.toString() };
    //   //   setSelectedActivity(newActivity);
    //   //   setActivities([...activities, newActivity]);
    //   // }
    //   console.log(activity);
    //   setEditMode(false);
    // };

    // const handleDelete = (id: string) => {
    //   //setActivities(activities.filter((x) => x.id !== id));
    //   console.log(id);
    // };
  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities && isPending ? (
          <Typography>Loading...</Typography>
        ): (
          <ActivityDashboard
          activities={activities!}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
        />
        )}
        
      </Container>
    </Box>
  );
}

export default App
