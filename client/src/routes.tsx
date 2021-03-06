/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { Slide, toast } from 'react-toastify';

import Login from './pages/login/Login';
import Home from './pages/Home';
import Profil from './pages/profil/profil';
import Register from './pages/register/Register';
import CreateJobs from './pages/recruiter/CreateJobs';
import PageNotFound from './pages/404/404';

toast.configure()

const ROUTES = [
  { path: "/login", 
    key: "APP_LOGIN", 
    exact: true, 
    component: (props: any) => {
      // console.log(props)
      if (!Cookies.get("token")) {
        return <Login />;
      } else {
        alert('anda masih memiliki akses.')
        return <Redirect to={"/"} />;
      }
    }
  },
  { path: "/register", 
    key: "APP_REGISTER", 
    exact: true, 
    component: (props: any) => {
      if (!Cookies.get("token")) {
        return <Register />;
      } else {
        alert('anda masih memiliki akses.')
        return <Redirect to={"/"} />;
      }
    }
  },
  { path: "/", 
    key: "APP_HOME", 
    exact: true, 
    component: Home 
  },
  { path: "/profil", 
    key: "APP_PROFIL", 
    exact: true, 
    component: (props: any) => {
      if (!Cookies.get("token")) {
        alert('anda tidak memiliki akses.')
        return <Redirect to={"/login"} />;
      } else {
        // alert('anda masih memiliki akses.')
        return <Profil />;;
      }
    }
  },
  { path: "/recruiter/create-job", 
    key: "APP_RECRUITER_CREATEJOB", 
    exact: true, 
    component: (props: any) => {
      if (!Cookies.get("token")) {
        alert('anda tidak memiliki akses.')
        return <Redirect to={"/login"} />;
      } else {
        // alert('anda masih memiliki akses.')
        return <CreateJobs />;;
      }
    }
  },
    // component: (props: any) => {
      //   if (!Cookies.get("token")) {
      //     alert("You need to log in to access app routes");
      //     return <Redirect to={"/login"} />;
      //   }
      // console.log(props)
      // return <Home />;
    // },
    // routes: [
    //   {
    //     path: "/",
    //     key: "APP_ROOT",
    //     exact: true,
    //     component: () => <Home />,
    //   },
    //   {
    //     path: "/profil",
    //     key: "APP_PROFIL",
    //     exact: true,
    //     component: (props: any) => {
    //       <Profil />
    //     },
    //   },
    // ],
  // },
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route: any) {
  // console.log('props compoennt route = ', dataSocket)
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        return(<route.component {...props} routes={route.routes} />)
      }}
    />
  );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes, dataSocket }: any) {
  // console.log('data socket = ', dataSocket)
  return (
    <Switch>
      {routes.map((route: any, i: number) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <PageNotFound />} />
    </Switch>
  );
}