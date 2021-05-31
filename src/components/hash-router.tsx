import * as React from 'react';
import { Router, useLocation } from 'wouter';

// @todo: implement hash router
// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
// const currentLocation = () => {
//   return window.location.hash.replace(/^#/, "") || "/";
// };

// const navigate = (path: Path) => (window.location.hash = path);

// function useHashLocation() {
//   const [loc, setLoc] = React.useState<string | string[]>(currentLocation());

//   React.useEffect(() => {
//     // this function is called whenever the hash changes
//     const handler = () => setLoc(currentLocation());

//     // subscribe to hash changes
//     window.addEventListener("hashchange", handler);
//     return () => window.removeEventListener("hashchange", handler);
//   }, []);

//   return [loc, navigate];
// };

/**
 * Custom Hash router so we can include this in apostrophecms later on
 *
 * @todo: This needs to implement a custom useHashLocation hook which uses location.hash instead of the default useLocation hook.
 */
const HashRouter = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => <Router>{props.children}</Router>;

export { HashRouter, useLocation as useHashLocation };
