/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

const routeWithKey = (routeProps: RouteProps) => {
  const routePath: string | undefined = routeProps?.path;
  return <Route key={routePath} {...routeProps} />;
};

const routesWithRedirect = (
  condToRedirect: boolean,
  redirectPath: string,
  routesProps: RouteProps[]
) => {
  return routesProps.map((routeProps) => {
    const routePath: string | undefined = routeProps?.path;
    if (condToRedirect) {
      return (
        <Route
          key={routePath}
          {...routeProps}
          element={<Navigate to={{ pathname: redirectPath }} />}
        />
      );
    }
    return routeWithKey(routeProps);
  });
};

export { routeWithKey, routesWithRedirect };
