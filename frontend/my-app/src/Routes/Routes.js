import Home from '../pages/Home/Home';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Auth from '../pages/AuthPage/Auth';
import Events from '../pages/Events';
const Routes=()=>{
    return(
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/login' exact component={Auth} />
            <Route path='/events' exact component={Events} />
        </Switch>
    )
}
export default Routes;