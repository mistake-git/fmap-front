import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./Auth";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import Posts from "./pages/posts/Posts";
import PostsShow from "./pages/posts/PostsShow";
import PostsNew from "./pages/posts/PostsNew";
import Mypage from "./pages/MyPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/posts" component={Posts} />
          <Route exact path="/posts/:id" component={PostsShow} />
          <Route exact path="/posts_new" component={PostsNew} />
          <Route exact path="/mypage/:id" component={Mypage} />
        </AuthProvider>
      </Switch>
    </Router>
  );
};

export default App;
