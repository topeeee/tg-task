import React from 'react';
import {connect} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/routes/routes";
import ProgressLoader from "rn-progress-loader";


const App = ({loading}) => {

  return (
      <>
          <ProgressLoader
              visible={loading}
              isModal={true}
              isHUD={true}
              hudColor={'#000000'}
              color={'#FFFFFF'}
          />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
     </>
  );
};



const mapStateToProps = (state) => ({
    loading: state.movies.loading,
});

export default connect(mapStateToProps)(App);

