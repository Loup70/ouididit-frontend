import { StyleSheet, Text, TextInput, View} from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Input(props) {
    const [isFocused, setIsFocused] = useState(false);
    const [hideText, setHideText]=useState(props.secureTextEntry);
    const [eyeIcon, setEyeIcon]=useState('eye');
    const [eyeIconColor, setEyeIconColor]=useState('#263238');

    const handlePasswordIcon = () => {
        if (eyeIcon === 'eye') {
            setEyeIcon('eye-slash');
            setEyeIconColor('#F74231');
        } else if (eyeIcon === 'eye-slash') {
            setEyeIcon('eye');
            setEyeIconColor('#263238');
        }
        setHideText(!hideText);
    };

    const onFocus = ()=>{
        setIsFocused(true);
        props.OnFocus;
    };

    return (          
        <View style={[styles.input, props.style]}>
            <View style={styles.inputLabelView}>
                <Text style={[styles.inputLabel, (isFocused && styles.focused)]}>{props.label}{props.require && (<Text style={styles.require}> *</Text>)}</Text>
            </View>
            <View style={[styles.inputTextView, (isFocused && styles.focused)]}>
                <TextInput
                    autoCapitalize={props.autoCapitalize}
                    autoCorrect={props.autoCorrect}
                    autoComplete={props.autoComplete}
                    autoFocus={props.autoFocus}
                    editable={props.editable}
                    id={props.label}
                    inputMode={props.inputMode}
                    keyboardType={props.keyboardType}
                    label={props.label || 'Input'}
                    maxLength={props.maxLength}
                    multiline={props.multiline}
                    numberOfLines={props.numberOfLines}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={props.onChangeText}
                    onFocus={onFocus}
                    onPressIn={props.onPressIn}
                    onPressOut={props.onPressOut}
                    onEndEditing={props.onEndEditing}
                    onSubmitEditing={props.onSubmitEditing || ''}
                    placeholder={props.placeholder}
                    secureTextEntry={hideText}
                    style={[styles.inputStyle, (props.multiline && styles.multiline)]}
                    textContentType='oneTimeCode'
                    value={props.value}
                />
                {props.uniti && 
                    <Text style={styles.uniti}>{props.uniti}</Text>
                }
                {props.eye && 
                    <FontAwesome
                        style= {styles.iconeye}
                        name={eyeIcon}
                        size={24}
                        color={eyeIconColor}
                        onPress={() => handlePasswordIcon()}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        width:'100%',
        justifyContent: 'center',
    },
    inputLabelView:{
        backgroundColor: 'white',
        fontSize: 12,
        marginLeft: 10,
        paddingHorizontal:3,
        position: "absolute",
        top: -10,
        zIndex: 1,
    },
    inputLabel:{
        backgroundColor: 'white',
        color: '#263238',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 16,
    },
    require:{
        color : '#F74231',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 16,
    },
    inputTextView: {
        borderColor: 'rgba(38,50,56,0.16)',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    inputStyle:{
        width: '80%',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 18,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    focused:{
        borderColor : '#F74231',
        color :'#F74231',
    },
    uniti:{
        color: 'rgb(38,50,56)',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 20,
        position: "absolute",
        right:'5%',
        zIndex: 1,
    },
    iconeye: {
        marginLeft: 10,
        paddingRight: 10,
    },
    multiline:{
        height:80,
    },
});