import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Movies from "../screens/movies";
import MovieDetails from "../screens/movieDetails";



const Stack = createNativeStackNavigator();

function Routes() {
    return (
            <Stack.Navigator  screenOptions={{
                headerShown: false
            }} initialRouteName="Movies">
                <Stack.Screen
                    options={{title: 'Movies'}} name="Movies" component={Movies} />
                <Stack.Screen options={{title: 'Movie Details'}} name="MovieDetails" component={MovieDetails} />
            </Stack.Navigator>
    );
}

export default Routes;
