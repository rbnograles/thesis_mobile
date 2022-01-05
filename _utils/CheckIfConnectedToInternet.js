import NetInfo from '@react-native-community/netinfo';

export const checkInternetConnection = () => {
  return NetInfo.fetch().then(state => {
    return state.isConnected;
  });
};
