import Navbar from "./components/Navbar";
import {Routes, Route } from "react-router-dom";
import { Cart, Explore, Home, Preview,Login ,Profile} from "./pages/index";
import Register from "./pages/Register";
import { useEffect } from "react";
import { setSneakers, setLoading, setError } from "./redux/slices/ShoeSlice";
import { useDispatch } from "react-redux";
const App = () => {
  const fetchDataFromDatabase = async () => {
    try {
      const response = await fetch("http://18.225.36.241:3001/api/sneakers");
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchDataFromDatabase(); // Implement this function to fetch data
        dispatch(setSneakers(data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  //#121212
  return (
    <div className="app h-full overflow-y-hidden">  
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/preview/:id" element={<Preview />} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
};

export default App;
