import {StyleSheet} from "react-native";

export const  mainColor = '#f9f9f9';
export const backColor = '#000000';


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 1
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'center',
        color: mainColor
    },
    subHeader: {
        fontSize: 16,
        padding: 4,
        textAlign: 'center',
        color: mainColor
    },
});

export default styles;
