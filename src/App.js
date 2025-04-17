import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import TeamMatches from './components/TeamMatches'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/team-matches/:id" component={TeamMatches} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App

// import {Switch, Route} from 'react-router-dom'
// import Home from './components/Home'
// import TeamMatches from './components/TeamMatches'

// const App = () => (
//   <Switch>
//     <Route exact path="/" component={Home} />
//     <Route exact path="/team-matches/:id" component={TeamMatches} />
//   </Switch>
// )
// export default App
