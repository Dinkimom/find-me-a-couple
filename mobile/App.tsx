import React from 'react';
import { Text, View } from 'react-native';
import { NativeRouter } from 'react-router-native';

const App: React.FC = () => {
  return (
    <NativeRouter>
      <View>
        <Text>What's up</Text>
      </View>
    </NativeRouter>
  );
};

export default App;
