import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import MainDocumentSale from "./Financial/SaleAccounting/Base/MainDocumentSale";
//import { LayoutSplashScreen } from "../../_metronic";



// const GoogleMaterialPage = lazy(() =>
//   import("./google-material/GoogleMaterialPage")
// );
// const ReactBootstrapPage = lazy(() =>
//   import("./react-bootstrap/ReactBootstrapPage")
// );

export default function PagesRoute({ baseUrl }) {
  // The `path` lets us build <Route> paths 
  // while the `url` lets us build relative links.

  const hist = useHistory();
  console.log('hist loc',hist.location);

  return (
    //<Suspense fallback={<LayoutSplashScreen />}>
    <Switch>
    
    <Route path="/MainDocumentSale" component={MainDocumentSale} />
    

    </Switch>
    // </Suspense>
  );
}
