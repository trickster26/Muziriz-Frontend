import React, { createContext, useContext, useReducer, useEffect } from 'react';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
};

const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      fetchUserDataAndRole(authToken)
        .then((data) => {
          dispatch({
            type: actionTypes.LOGIN,
            payload: { user: data.user, role: data.role },
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []); 

  const fetchUserDataAndRole = async (token) => {
    try {
      const userResponse = await fetch('http://13.235.24.70:8000/api/user_info/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await userResponse.json();

      const role = userData.role;

      return { user: userData, role };
    } catch (error) {
      throw new Error('Error fetching user data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context.state;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context.dispatch;
};
