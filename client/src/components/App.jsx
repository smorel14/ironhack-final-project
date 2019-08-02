import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
// import BottomNavbar from '../BottomNavBar'
import BottomNav2 from './BottomNav2'
import Home from './pages/Home'
import Countries from './pages/Countries'
import AddCountry from './pages/AddCountry'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import api from '../api'
import { withRouter } from 'react-router'
import MyRecipes from './pages/MyRecipes'
import RecipeDetail from './pages/RecipeDetail'
import Explore from './pages/Explore'
//import NewRecipe from './pages/NewRecipe'
import RecipeList from './pages/RecipeList'
import CreateRecipe from './pages/CreateRecipe'
import EditRecipe from './pages/EditRecipe'

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        {api.isLoggedIn() ? (
          <Route path="/recipes/explore" component={Explore} />
        ) : (
          <Route path="/add-library" component={Login} />
        )}

        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/recipes/my-recipes" component={MyRecipes} />
        <Route path="/recipes/explore" component={Explore} />
        <Route path="/recipes/create-recipe" component={CreateRecipe} />
        <Route path="/recipes/:recipeId" exact component={RecipeDetail} />
        <Route path="/recipes/:recipeId/edit-recipe" component={EditRecipe} />
        <Route path="/fork/:recipeId" component={RecipeDetail} />
        <Route path="/my-list" component={RecipeList} />
        <Route render={() => <h2>404</h2>} />
      </Switch>
      {api.isLoggedIn() && <BottomNav2 />}
      {/* <BottomNavbar /> */}
    </div>
  )
}

//withRouter forced the app component to be rendered each time it is being called
export default withRouter(App)
