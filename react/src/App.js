import './App.css';
import MainPage from "./components/mainpage/mainPage";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import SignInUpMain from "./components/SignInOrUpMain/signInUpMain";
import Questions from "./components/questions/questions";
import DetailedSearch from "./components/detailedSearch/detailedSearch";
import AddYours from "./components/addYours/addYours";
import QuestionPage from "./components/questionPage/questionPage";
import Profile from "./components/profile/profile";
import Search from "./components/search/search";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signInUp" element={<SignInUpMain/>}/>
          <Route path="/questions" element={<Questions/>}/>
          <Route path="/detailedSearch" element={<DetailedSearch/>}/>
          <Route path="/add" element={<AddYours/>} />
          <Route path="/question/:id" element={<QuestionPage/>}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/search" element={<Search/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
