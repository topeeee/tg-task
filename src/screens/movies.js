import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image,
    Button
} from 'react-native';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating'
import {addMovieFavourite, getMovies, image_base_url, removeMovieFavourite} from "../store/actions/moviesAction";
import {Styles} from "./styles";
import {RFValue} from "react-native-responsive-fontsize";
import {convertDate} from "../utils/helpers";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import HeaderComponent from "../components/headerComponent";

const SCREEN_HEIGHT = Dimensions.get("window").height;



const Movies = (props) => {
    const {
        getMovies,
        movies,
        loading,
        navigation,
        favourites,
        addMovieFavourite,
        removeMovieFavourite
    } = props

    const [currentPage, setCurrentPage] = useState(1)
    const [updateCOm, setUpdateCOm] = useState(0)

    const flatListRef = useRef(null)

    useEffect(() => {
        getMovies(currentPage)
    }, []);

    const handleNext = async () => {
     await   flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
       await getMovies(currentPage + 1)
        setCurrentPage(currentPage + 1)
    }

    const handleBack = async () => {
      await  flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        await getMovies(currentPage - 1)
        setCurrentPage(currentPage - 1)
    }


    function favouriteExists(id) {
        return favourites.some(function(el) {
            return el.id === id;
        });
    }


    const renderItem = ({item}) => {
        return (
            <View
                style={{...Styles.card}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MovieDetails', {id: item?.id})}
                >
                    <View>
                        <Image
                            resizeMode='stretch'
                            source={{uri: `${image_base_url}${item.poster_path}`}} style={{height: RFValue(200), borderRadius: RFValue(5)}}
                        />

                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: '#0F7AF8', fontSize: RFValue(14)}}>
                                {item?.title}
                            </Text>
                        </View>
                        <View>
                            <Text style={{fontSize: RFValue(12), color: 'black', paddingLeft: RFValue(5)}}>
                                {convertDate(item?.release_date)}
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text
                            style={{
                                color: '#637A87',
                                fontSize: RFValue(12),
                                lineHeight: RFValue(16),
                            }}
                            numberOfLines={3}>
                            {item?.overview}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={{ marginTop: RFValue(10), flexDirection: 'row', alignItems: 'center'}}>
                    <StarRating
                        disabled={false}
                        maxStars={10}
                        rating={item.vote_average ? item.vote_average : 0}
                        fullStarColor='#FFA500'
                        starSize={20}
                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                    <Text
                        style={{
                            color: '#637A87',
                            fontSize: RFValue(12),
                            lineHeight: RFValue(16),
                            marginLeft: RFValue(5)
                        }}>
                        {item.vote_average ? item.vote_average : 0}
                    </Text>

                </View>
                <Text
                    style={{
                        color: '#637A87',
                        fontSize: RFValue(10),
                        lineHeight: RFValue(16),
                        marginLeft: RFValue(5)
                    }}>
                    {item.vote_count ? item.vote_count : 0} votes
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity
                        onPress={() => {
                            addMovieFavourite(item, favourites);
                            setUpdateCOm(updateCOm + 1)
                        }}
                        style={{width: RFValue(20), height: RFValue(20), borderRadius: RFValue(20), backgroundColor: favouriteExists(item.id) ? 'green' : '#0F7AF8', alignItems: 'center', justifyContent: 'center', marginRight:RFValue(20)}}
                    >
                        <Icon name='heart'  size={RFValue(10)} color='white'  />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <HeaderComponent favourites={favourites} title={'Movies'} navigation={navigation} removeMovieFavourite={removeMovieFavourite} />
            <View style={{flex: 1, padding: 10}}>
                <FlatList
                    ref={flatListRef}
                    data={movies.results.sort((a, b) => a.title.localeCompare(b.title))}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        marginVertical: RFValue(24),
                        paddingBottom: RFValue(120),
                    }}
                    ListEmptyComponent={() => (
                        <>
                            {!loading &&
                            <View style={{marginTop: 30,justifyContent: "center",
                                alignItems: "center",
                                height: SCREEN_HEIGHT/1.5}}>
                                <Text
                                    style={{
                                        fontSize: RFValue(12),
                                        color: '#1D1D1D',
                                        textAlign: 'center',
                                    }}>
                                    No data.
                                </Text>
                            </View>
                            }
                        </>

                    )}

                    ListFooterComponent={() => (
                        <>
                            {!loading &&
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20}}>
                        <View>
                        {currentPage > 1 &&
                        <TouchableOpacity
                            onPress={() => handleBack()}
                            style={Styles.customButton}>
                            <Text
                                style={{
                                    fontSize: RFValue(12),
                                    color: 'white',
                                    textAlign: 'center',
                                }}>
                                Back
                            </Text>
                        </TouchableOpacity>
                        }
                        </View>

                        <View>
                            {movies.results.length > 0 &&
                            <TouchableOpacity
                                onPress={() => handleNext()}
                                style={[Styles.customButton, {backgroundColor: '#0F7AF8'}]}>
                                <Text
                                    style={{
                                        fontSize: RFValue(12),
                                        color: 'white',
                                        textAlign: 'center',
                                    }}>
                                    Next
                                </Text>
                            </TouchableOpacity>}
                        </View>

                        </View>
                        }
                        </>
                    )}

                />
            </View>
        </SafeAreaView>
    );
};



const mapStateToProps = (state) => ({
    movies: state.movies.movies,
    loading: state.movies.loading,
    favourites: state.movies.favourites,
});

export default connect(mapStateToProps, {getMovies, addMovieFavourite, removeMovieFavourite})(Movies);

