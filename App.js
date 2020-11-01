import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Landing from "./screens/Landing";
import Place from "./screens/Place";

const Stack = createStackNavigator();

import { composeWithDevTools } from "redux-devtools-extension";

// Redux imports
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import places from "./store/reducers/places";

import { Provider } from "react-redux";

const rootReducer = combineReducers({
  places,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Place" component={Place} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
