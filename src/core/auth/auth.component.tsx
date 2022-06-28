import { useAuth } from "./auth.hook";
import { Route, Redirect } from "react-router-dom";


function RequireAuth({ children }: { children: React.ReactNode }) {
    const {isAuth} = useAuth();
  
    if (!isAuth) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      
      return (
        <Route
          render={({ location }) => (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )}
        />
      )
  }
    return children;
}

export default RequireAuth;
