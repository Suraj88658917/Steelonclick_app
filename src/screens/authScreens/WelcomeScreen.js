import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import Logo from '../../assets/images/logo.svg'
import LinearGradient from 'react-native-linear-gradient'


const WelcomeScreen = ({navigation}) => {
    return (
        <LinearGradient
            colors={['#E8F9FF', '#FFFFFF']}
            style={styles.container}>
            <Logo width={208} height={50} top={127} />
            <Text style={styles.text}>Welcome to EaseInfra</Text>
            <Text style={styles.subtext}>Your Trusted Market Steelplace</Text>
            <TouchableOpacity style={styles.Button1}>
                <Text  onPress={() => navigation.navigate("LoginScreen")}
                style={styles.ButtonText}
                >I want to buy steel</Text>

                <TouchableOpacity  onPress={() => navigation.navigate("LoginScreen")}
                style={styles.Button2}>
                    <Text style={styles.ButoonText1}>I want to sell steel</Text>
                </TouchableOpacity>
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
        fontFamily: "Metropolis",
        fontWeight: "700",
        fontWeight: "bold",
        fontSize: 25,
        lineHeight: 31,
        top: 346,
        width: 326,
        left: 38,
        color: "#000000"
    },
    subtext: {
        fontFamily: "Metropolis",
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 25,
        top: 350,
        height: 25,
        color: "#525252"
    },
    ButtonText: {
        width: 134,
        height: 20,
        fontWeight: "500",
        fontFamily: "Metropolis",
        fontSize: 12,
        lineHeight: 19,
        color: "#02ADEE"
    },
    Button1: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 108,
        borderRadius: 15,
        top: 557,
        width: 358,
        height: 50.53,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#02ADEE"

    },
    ButoonText1: {
        width: 134,
        height: 20,
        fontWeight: "500",
        fontFamily: "Metropolis",
        fontSize: 12,
        lineHeight: 19,
        color: "#ffffff"
    },

    Button2: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 108,
        borderRadius: 15,
        width: 358,
        height: 50.53,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#3283C2",
        backgroundColor: "#3283C2",
        top:40
    }
})