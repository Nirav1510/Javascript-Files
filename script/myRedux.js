export const myCreateStore = (reducer) => {
  let state;
  let listeners = [];

  const store = {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => {
        listener();
      });
    },
    subscribe(listener) {
      listeners.push(listener);

      return () => {
        listeners = listeners.filter((l) => l !== listener);
        return listeners;
      };
    },
  };

  store.dispatch({ type: "@@INIT" });
  return store;
};

export const ReduxContext = React.createContext(null);

export const Provider = ({ store, children }) => (
  <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
);

export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const nextState = {};

    Object.keys(reducers).forEach((key) => {
      nextState[key] = reducers[key](state[key], action);
    });
    return nextState;
  };
};

export const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {
    return (props) => {
      return (
        <ReduxContext.Consumer>
          {(store) => {
            const stateProps = mapStateToProps
              ? mapStateToProps(store.getState())
              : {};
            const dispatchProps = mapDispatchToProps
              ? mapDispatchToProps(store.dispatch)
              : {};
            return <Component {...props} {...stateProps} {...dispatchProps} />;
          }}
        </ReduxContext.Consumer>
      );
    };
  };
};
