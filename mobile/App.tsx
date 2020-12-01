import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import { store } from './src/app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View>
          <Text>What's upppppp</Text>
        </View>
      </NativeRouter>
    </Provider>
  );
};

export default App;
