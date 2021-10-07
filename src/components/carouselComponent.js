import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage, Pagination} from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    SafeAreaView
} from 'react-native';

const ENTRIES1 = [
    {
        // title: 'Beautiful and dramatic Antelope Canyon',
        // subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
        // title: 'Earlier this morning, NYC',
        // subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
        // title: 'White Pocket Sunset',
        // subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
        // title: 'Acrocorinth, Greece',
        // subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
        // title: 'The lone tree, majestic landscape of New Zealand',
        // subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
];
const {width: screenWidth} = Dimensions.get('window');

const CarouselComponent = ({entries = []}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const carouselRef = useRef(null);


    const goForward = () => {
        carouselRef.current.snapToNext();
    };



    const renderItem = ({item, index}, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{uri: item.illustration}}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text>
            </View>
        );
    };


    const pagination =  () => {
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeIndex}
                containerStyle={{ backgroundColor: 'white' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'orange'
                }}
                inactiveDotStyle={{
                    backgroundColor: 'grey'
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    return (
            <View style={styles.container}>
                <Carousel
                    ref={carouselRef}
                    sliderWidth={screenWidth}
                    sliderHeight={150}
                    itemWidth={screenWidth - 60}
                    data={ENTRIES1}
                    renderItem={renderItem}
                    hasParallaxImages={true}
                    autoplay={true}
                    autoplayDelay={3000}
                    autoplayInterval={3000}
                    loop
                    onBeforeSnapToItem={(index) => setActiveIndex(index)}
                />
                { pagination() }
            </View>
    );
};



export default CarouselComponent

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 50,
        // backgroundColor: 'yellow'
    },
    item: {
        width: screenWidth - 60,
        height: 150,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        // backgroundColor: 'red',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});
