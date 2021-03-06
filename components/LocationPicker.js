import React, { useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'; 


import Colors from '../constants/Color';

const LocationPicker = props => {

    const [pickedLocation, setPickedLocation] = useState();
        const [isFetching, setIsFetching] = useState(false);

    const verifyPermissions = async() => { 
        // const result = await Permissions.askAsync(Permissions.LOCATION);
        const result = await Location.requestForegroundPermissionsAsync();
        if(result.status !== 'granted') {
            Alert.alert(
                'Insufficient Permissions!', 
                'You need to grant location permissions to use this app.',
                [{text: 'Okay'}]
                );

                return false;
        }
        return true; 
    } 

    const getLocationHandler = async () => {
        const hasPermision = await verifyPermissions();
        if(!hasPermision){
            return
        }
        try {
            setIsFetching(true);
            const location = await  Location.getCurrentPositionAsync({ timeout: 5000}); 
            console.log(location); 
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
           
        } catch (error) {
            Alert.alert(
                'Could not fetch location', 
                'Please try again later or pick a location  on the map',
                [{text: 'okay'}]
                )
        } finally{
            setIsFetching(false);
        }
       
    } 
    

    return (
        <View style={styles.locationPicker}>
          <View style={styles.mapPreview}>
            {isFetching ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <Text>No location chosen yet!</Text>
            )}
          </View>
          <Button
            title="Get User Location"
            color={Colors.primary}
            onPress={getLocationHandler}
          />
        </View>
      );
    
}

const styles = StyleSheet.create({
    locationPicker: {
      marginBottom: 15
    },
    mapPreview: {
      marginBottom: 10,
      width: '100%',
      height: 150,
      borderColor: '#ccc',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  


export default LocationPicker;