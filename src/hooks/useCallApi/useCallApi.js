import React from "react";

export const actions = {
  ACTION_SET_DATA: "set_data",
  ACTION_SET_ISLOADING: "set_is_loading",
  ACTION_SET_ERROR: "set_error",
};

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.ACTION_SET_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case actions.ACTION_SET_ISLOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case actions.ACTION_SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
  }
};

const useCallApi = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const sendRequest = React.useCallback(async (url, options) => {
    dispatch({ type: actions.ACTION_SET_ISLOADING, payload: true });

    const response = await fetch(url, {
      method: options.method ? options.method : "GET",
      body: options.body ? options.body : null,
      headers: options.headers ? options.headers : {},
    });

    response
      .json()
      .then((value) => {
        dispatch({ type: actions.ACTION_SET_ISLOADING, payload: false });
        dispatch({ type: actions.ACTION_SET_DATA, payload: value });
      })
      .catch((error) => {
        dispatch({ type: actions.ACTION_SET_ISLOADING, payload: false });
        dispatch({ type: actions.ACTION_SET_ERROR, payload: error });
      });
  }, []);
  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    sendRequest: sendRequest,
  };
};

export default useCallApi;
