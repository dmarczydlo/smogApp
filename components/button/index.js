import React from 'react'
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableHighlight,
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const defaultValue = {
    backgroundColor: '#841584',
    height: 50,
    color: '#FAFAFA',
    fontSize: 20,
    width: '100%'
};

const ButtonComponent = ({onPress, icon, text, style, disabled}) => {

    const styleProps = {
        backgroundColor: disabled ? '#cccccc' : style.backgroundColor || defaultValue.backgroundColor,
        height: style.height || defaultValue.height,
        width: style.width || defaultValue.width
    };

    const textProps = {
        color: disabled ? '#666666' : style.color || defaultValue.color,
        fontSize: style.fontSize || defaultValue.fontSize,
    };

    const iconSpace = {
        marginRight: text? 5: 0,
        alignItems: 'center',
    };

    const disabledOnPress = () => {
    };

    return (
        <TouchableHighlight
            onPress={disabled ? this.disabledOnPress : onPress} style={[styles.btnClickContain, styleProps]}
            underlayColor='#042417'>
            <View
                style={styles.btnContainer}>
                {icon && <Icon style={[textProps, iconSpace]} name={icon}/>}
                <Text style={textProps}>{text}</Text>
            </View>
        </TouchableHighlight>
    )
};

export default ButtonComponent;

const styles = StyleSheet.create({
    btnClickContain: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

ButtonComponent.propTypes = {
    onPress: PropTypes.func.isRequired,
    icon: PropTypes.string,
    text: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool
};

ButtonComponent.defaultProps = {
    icon: '',
    text: '',
    disabled: false,
    style: {
        defaultValue
    },

};

AppRegistry.registerComponent('ButtonComponent', () => ButtonComponent);
