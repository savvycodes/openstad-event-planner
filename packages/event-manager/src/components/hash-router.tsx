import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  BaseLocationHook,
  HookReturnValue,
  Path,
  Router,
  RouterProps,
} from 'wouter';

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
export type HashLocationTuple = HookReturnValue<BaseLocationHook>;

function useHashLocation(): HashLocationTuple {
  const [path, update] = useState<Path>(currentPathname());
  const prevPath = useRef(path);

  useEffect((): any => {
    // this function checks if the location has been changed since the
    // last render and updates the state only when needed.
    // unfortunately, we can't rely on `path` value here, since it can be stale,
    // that's why we store the last pathname in a ref.
    const checkForUpdates = () => {
      const pathname = currentPathname();
      prevPath.current !== pathname && update((prevPath.current = pathname));
    };

    const events = ['replaceHash'];
    events.map(e => addEventListener(e, checkForUpdates));

    // it's possible that an update has occurred between render and the effect handler,
    // so we run additional check on mount to catch these updates. Based on:
    // https://gist.github.com/bvaughn/e25397f70e8c65b0ae0d7c90b731b189
    checkForUpdates();

    return () => events.map(e => removeEventListener(e, checkForUpdates));
  }, []);

  // the 2nd argument of the `useLocation` return value is a function
  // that allows to perform a navigation.
  //
  // the function reference should stay the same between re-renders, so that
  // it can be passed down as an element prop without any performance concerns.
  const navigate = useCallback((to: Path) => {
    location.hash = to;
    dispatchEvent(new Event('replaceHash'));
  }, []);

  return [path, navigate];
}

const currentPathname = (): Path => location.hash.replace('#', '');

/**
 * Custom Hash router so we can include this in apostrophecms later on
 */
type HashRouterProps = Partial<RouterProps> & {
  children: React.ReactNode;
};
const HashRouter = (props: HashRouterProps) => (
  <Router hook={useHashLocation} {...props}>
    {props.children}
  </Router>
);

export { HashRouter, useHashLocation };
