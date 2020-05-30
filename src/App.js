import React, {Suspense, lazy} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';


const Home = lazy(() =>
  import('../src/components/home')
);

const Category = lazy((() => import('../src/components/category')));


function App() {
  const pages = [
    {
      pageLink: '/',
      view: Home,
      displayName: 'Home',
    },
    {
      pageLink: '/category',
      view: Category,
      displayName: 'Category'
    }
  ];

  return (
    <div id="container">
      <Router>
      <Suspense fallback={<div className="lazy"></div>}>
        <Route
        render={({location, history}) => {
          return (
              <React.Fragment>
              <Switch location={location}>
                      {pages.map((page, index) => {
                        return (
                          <Route
                            exact
                            path={page.pageLink}
                            render={({match}) => {
                              return (
                                <page.view key={match.params.categoryName || index} match={match} history={history} location={location}/>
                              )
                            }}
                            key={index}
                          />
                        );
                      })}
                      <Redirect to="/" />
              </Switch>
              </React.Fragment> 
            )
        } }
        > 
        </Route>
     
      
      </Suspense> 
      </Router>
        
</div>
 
  );
}

export default App;
