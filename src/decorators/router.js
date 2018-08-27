import Router5, { RouteNode, errCodes, transitionPath, loggerPlugin } from 'router5';
import linkInterceptor from 'router5-link-interceptor';
import historyPlugin from 'router5-history';
import listenersPlugin from 'router5-listeners';

export const defaultRouteOptions = {
  internal: false,
  internalStateHistory: true,
  useHash: true,
  defaultRoute: 'home',
  defaultParams: { section: '' },
  base: '',
  trailingSlash: false,
  autoCleanUp: true,
  strictQueryParams: false
};

export const defaultRoutes = [
  { name: 'home', path: '/' },
  { name: 'section', path: '/:section' }
];

//STATE MACHINE

export function Router(routes, options = {}) {

  if (!(routes instanceof Array)) {
    if (routes != null) {
      options = Object.assign({}, routes);
    }
    routes = defaultRoutes;
  }
  let d = Object.assign({}, defaultRouteOptions);
  const mergedOptions = Object.assign(d, options);

  return (Component) => class RouteredComponent extends Component {
    constructor() {
      super();
      this.setupRouter();
    }

    init(options, done) {
      super.init(options, () => {
        this._startRouter();
        done();
      });
    }

    _startRouter() {
      this.router.start((err, state) => {
        if (err) console.error('error ', err);
        let loadPath = (state.path === "/") ? "index" : state.path;

        if (typeof this.routerStarted === 'function') {
          this.routerStarted(err, state, this.router);
        }
        console.log('START_state ', state);
      });
    }

    _bind() {
      super._bind();
      if (mergedOptions.internal) {
        this.listenToRoot("click", "a", (element, event) => {
          event.stopPropagation();
          event.preventDefault();
          const hash = element.hash.replace('#/', '');
          //console.log(hash);
          this.router.navigate('section', { section: hash }, { reload: true })
        });
      }
    }

    _setRootAttributes() {
      super._setRootAttributes();
      this.domNode.setAttribute('data-state', '/');
    }

    _removeRootAttributes() {
      super._removeRootAttributes();
      this.domNode.removeAttribute('data-state');
    }


    setState(state) {
      this.domNode.setAttribute('data-state', state.path);
      if (mergedOptions.internalStateHistory) {
        this.history.push(state);
      }
    }

    navigate(...args) {
      this.router.navigate(...args);
    }

    addRoute(...args) {

      this.router.add(...args)
    }

    destroy(done) {
      this.router.stop();
      this.routerStopped(this.router);
      done();
    }

    setupRouter() {
      this.history = [];
      this.router = new Router5(routes, mergedOptions)
        .usePlugin(loggerPlugin())
        .usePlugin(listenersPlugin())

      if (!mergedOptions.useHash) {
        this.router.usePlugin(linkInterceptor({ reload: true }, function (err) {
          if (err) {
            if (err.code === 'SAME_STATES') {
              // same route, maybe scroll page to the top?
            } else {
              console.error(err);
            }
          }
        }));
      }

      if (!mergedOptions.internal) {
        this.router.usePlugin(historyPlugin({ forceDeactivate: false }));
      }

      console.log(this.router);

      this.router.addListener((toState, fromState) => {
        const page = toState.params.section || 'reports';
        this.setState(toState);
        if (typeof this.onRouterTransition === 'function') {
          this.onRouterTransition(toState, fromState);
        }
      });

      if (typeof this.routerInitialized === 'function') {
        this.routerInitialized(this.router);
      }
    }
  };
}

export { Router as StateMachine };