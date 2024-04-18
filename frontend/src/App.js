import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./component/Nav";
// import Footer from "./component/Footer";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";
import CreatePost from "./pages/CreatePost";
import UserPost from "./pages/UserPost";
// user login
//token and check username and name and id done

//register
//username password and name

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/userpost/:id" element={<UserPost />} />
      </Routes>
      {/* <Footer /> */}
    </AuthProvider>
  );
}

export default App;
