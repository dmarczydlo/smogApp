import {StyleSheet} from "react-native";


export const palette = {
    mainColor: '#a1a7aa',
    backColor: '#0e1315',
    backElementColor: '#1b2129',
    backNavColor: '#222a33',
    fontColor: '#a1a7aa'
};

export const getNavbar = (title) => {
    return {
        title,
        headerStyle: {
            backgroundColor: palette.backElementColor,
        },
        headerTintColor: palette.mainColor,
        headerTitleStyle: {
            fontWeight: 'normal',
        }
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.backColor
    },
    background: {
        flex: 1
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 4,
        textAlign: 'center',
        color: palette.mainColor
    },
    subHeader: {
        fontSize: 16,
        padding: 4,
        textAlign: 'center',
        color: palette.mainColor
    },
    headerBox: {
        color: palette.mainColor,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 20,
        textAlign: 'center'
    }
});

export default styles;
