import React, {useRef, useState} from 'react';
import {View,Text,FlatList,StyleSheet,Dimensions,TouchableOpacity,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../assets/images/logo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Lorem ipsum dolor sit \n amet consectur, ipsum',
    desc: 'Lorem ipsum dolor sit amet consectetur.\nRhoncus at nisi enim sed justo',
  },
  {
    id: '2',
    title: 'Buy Steel Easily',
    desc: 'Best prices from trusted sellers',
  },
  {
    id: '3',
    title: 'Sell Steel Confidently',
    desc: 'Connect with verified buyers',
  },
];

const Onboarding = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef();

  // skip onbording Screen ----------

const SkipOnbording = async() => {
  try{
  await AsyncStorage.setItem("OnbordingScreen" , JSON.stringify(true));
  navigation.replace("LoginScreen");
  }
  catch(error){
    console.log(error)
  }
}

  // Change index when slide changes
  const onScrollEnd = (e) => {
    const slideIndex = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setIndex(slideIndex);
  };

  // Next button
  const onNext = () => {
    if (index < slides.length - 1) {
      flatListRef.current.scrollToIndex({
        index: index + 1,
        animated: true,
      });
    } else {
      SkipOnbording();
    }
  };

  return (
    <LinearGradient 
    colors={['#E8F9FF' , '#FFFFFF']}
    style={styles.container}>
       <Logo width={208} height={50} top={127} />
      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
      
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={onNext}>
    <Text
    style={styles.buttonText}>
      {index === slides.length - 1 ? 'Start' : 'Next'}
    </Text>
  </TouchableOpacity>

  {/* Hide Skip on last slide but keep space */}
  <View style={{ height: 20 }}>
    {index !== slides.length - 1 && (
      <TouchableOpacity onPress={SkipOnbording}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
    )}
  </View>

</View>

    </LinearGradient>
  );
};

export default Onboarding;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:"center",
    alignItems:"center"
  },

  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    top:132,
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
    color: '#000',

  },

  desc: {
    fontSize: 16,
    textAlign: 'center',
    color: '#525252',
    lineHeight: 25,
    fontFamily: 'Poppins-Regular',
  

  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top:705,
    width: '100%',
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 2,
  },

  activeDot: {
    backgroundColor: '#03A4E6',
    width: 16,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },

  skip: {
    fontSize: 16,
    color: '#000',
    top:25,
     fontFamily: 'Poppins-Regular',
  },

  button: {
    backgroundColor: '#03A4E6',
    paddingVertical: 17,
    paddingHorizontal: 160,
    borderRadius: 20,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
      
  },
});
