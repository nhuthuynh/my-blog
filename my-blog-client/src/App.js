import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NavBar from './NavBar';
import NotFoundPage from './pages/NotFoundPage';

/**
 *  Switch makes sure that only one route render at a time, make sure 404 page is placed last
 *
 **/

function App() {
  return (
    <Router>
        <div className="App">
            <NavBar />
            <div id="page-body">
                <Switch>
                    <Route path="/" component={HomePage} exact/>
                    <Route path="/about" component={AboutPage}/>
                    <Route path="/list" component={ArticlesListPage}/>
                    <Route path="/article/:name" component={ArticlePage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        </div>
    </Router>
    
  );
}

export default App;
