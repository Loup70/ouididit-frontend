import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

function RedButton(props){

    return(
        <TouchableOpacity
            style={[styles.redButton, props.disabled && styles.buttonDisabled, props.style]}
            onPress={props.onPress}
            disabled={props.disabled}
        >
            <Text style={styles.redButtonText} >
                {props.buttonText}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    redButton: {
        backgroundColor: '#F74231',
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: '80%',
        borderRadius: 10,
    },
    redButtonText: {
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 24,
        fontWeight: '800',
        color: 'white',
    },
    buttonDisabled: {
        backgroundColor: 'rgba(247, 66, 49, 0.2)',  // Update color if button is disabled
    },
})

export default RedButton