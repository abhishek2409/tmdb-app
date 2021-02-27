import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Home = lazy(() => import("../components/Home"));
const MovieDetail = lazy(() => import("../components/MovieDetails"));
const SearchPage = lazy(() => import("../components/Search"));
const Header = lazy(() => import("../components/Header"));

const Root = () => (
  <Router>
    <Suspense fallback={<></>}>
      <Header />
      <Switch>
        <Route path="/moviedetails/:movie_id">
          <MovieDetail />
        </Route>
        <Route path="/search/:keyword">
          <SearchPage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default Root;
