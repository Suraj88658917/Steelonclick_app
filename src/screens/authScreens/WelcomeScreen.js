import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import Logo from '../../assets/images/logo.svg'
import LinearGradient from 'react-native-linear-gradient'


const WelcomeScreen = ({ navigation }) => {
    return (
        <LinearGradient
            colors={['#E8F9FF', '#FFFFFF']}
            style={styles.container}>
            <Logo width={208} height={50} top={127} />
            <View style={{ top: 200 }}>
                <Text style={styles.text}>Welcome to EaseInfra</Text>
                <Text style={styles.subtext}>Your Trusted Market Steelplace</Text>
            </View>
            <TouchableOpacity style={styles.Button1}>
                <Text onPress={() => navigation.navigate("RegisterScreen")}
                    style={styles.ButtonText}
                >I want to buy steel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}
                style={styles.Button2}>
                <Text style={styles.ButoonText1}>I want to sell steel</Text>
            </TouchableOpacity>

        </LinearGradient>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 25,
        lineHeight: 31,
        color: "#000000",
        top: 170,
        alignSelf: "center",
        fontFamily: "Poppins-Bold"
    },
    subtext: {
        fontSize: 14,
        lineHeight: 20,
        color: "#525252",
        top: 180,
        alignSelf: "center",
        fontFamily: "Poppins-Regular"
    },
    ButtonText: {
        fontSize: 12,
        lineHeight: 19,
        color: "#02ADEE",
        fontFamily: "Poppins-Medium"
    },
    Button1: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 120,
        borderRadius: 15,
        top: 610,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#02ADEE",
    },
    ButoonText1: {
        fontSize: 12,
        lineHeight: 19,
        color: "#ffffff",
        fontFamily: "Poppins-Medium"
    },

    Button2: {
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        paddingHorizontal: 120,
        borderRadius: 15,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#3283C2",
        backgroundColor: "#3283C2",
        top: 630,
    }
})