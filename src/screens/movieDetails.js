import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, Dimensions} from "react-native";
import {connect} from "react-redux";
import {
    addMovieFavourite,
    getMovieDetails,
    image_base_url, rateMovie, removeMovieFavourite
} from "../store/actions/moviesAction";
import {RFValue} from "react-native-responsive-fontsize";
import {convertDate} from "../utils/helpers";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import CommentUpdateComponent from "../components/commentUpdateComponent";
import StarRating from "react-native-star-rating";
import HeaderComponent from "../components/headerComponent";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const MovieDetails = (props) => {
    const  {
        movieDetails,
        getMovieDetails,
        route,
        loading,
        rateMovie,
        movieSuggestions,
        navigation,
        favourites,
        removeMovieFavourite,
        addMovieFavourite
  } = props

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [counter, setCounter] = useState(0)

    const { id } = route.params;

    useEffect(() => {
       if(id) {
           getMovieDetails(id)
       }
    },[id])

    function favouriteExists(id) {
        return favourites.some(function(el) {
            return el.id === id;
        });
    }



    const renderItem = ({item, index}) => {
        return (

            <View
                style={{paddingLeft: RFValue(20), width: RFValue(200), marginRight:movieSuggestions?.results.length-1 === index &&  RFValue(20)}}>
                <TouchableOpacity
                    onPress={() =>  getMovieDetails(item.id)}
                >
                    <View>
                        <Image
                            resizeMode='stretch'
                            source={{uri: `${image_base_url}${item.poster_path}`}} style={{height: RFValue(100), borderRadius: RFValue(5)}}
                        />
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: RFValue(5)}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: 'grey', fontSize: RFValue(10)}}>
                                {item?.title}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
            <HeaderComponent favourites={favourites} title={'Movie Details'} navigation={navigation} goBack removeMovieFavourite={removeMovieFavourite} />
            {!loading &&
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flexGrow: 1}}>
                    <View
                        style={{flex: 1, paddingVertical: RFValue(30),
                            paddingHorizontal: RFValue(16),
                            marginTop: RFValue(10),  marginBottom: RFValue(14),
                            }}>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('MovieDetails', {id: item?.id})}
                        >
                            <View>
                                <Image
                                    resizeMode='stretch'
                                    source={{uri: `${image_base_url}${movieDetails.poster_path}`}} style={{height: RFValue(200), borderRadius: RFValue(5)}}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
                                <View style={{flex: 1}}>
                                    <Text style={{color: '#0F7AF8', fontSize: RFValue(14)}}>
                                        {movieDetails?.title}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: RFValue(12), color: 'black', paddingLeft: RFValue(5)}}>
                                        {convertDate(movieDetails?.release_date)}
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
                                >
                                    {movieDetails?.overview}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ marginTop: RFValue(20), flexDirection: 'row', alignItems: 'center'}}>
                            <StarRating
                                disabled={false}
                                maxStars={10}
                                rating={movieDetails.vote_average ? movieDetails.vote_average : 0}
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
                                {movieDetails?.vote_average ? movieDetails?.vote_average : 0}
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text
                                style={{
                                    color: '#637A87',
                                    fontSize: RFValue(10),
                                    lineHeight: RFValue(16),
                                    marginLeft: RFValue(5)
                                }}>
                                {movieDetails.vote_count ? movieDetails?.vote_count : 0} votes
                            </Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text
                                    style={{
                                        color: '#637A87',
                                        fontSize: RFValue(10),
                                        lineHeight: RFValue(16),
                                        marginLeft: RFValue(5),
                                        paddingRight: RFValue(5)
                                    }}
                                >Add rating</Text>
                                <TouchableOpacity
                                    onPress={() => setIsModalVisible(true)}
                                    style={{width: RFValue(20), height: RFValue(20), borderRadius: RFValue(20), backgroundColor: '#0F7AF8', alignItems: 'center', justifyContent: 'center', marginRight:RFValue(20)}}
                                >
                                    <Icon name='plus'  size={RFValue(10)} color='white'  />
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Text
                            style={{
                                color: '#637A87',
                                fontSize: RFValue(10),
                                lineHeight: RFValue(16),
                                marginLeft: RFValue(5)
                            }}>
                             Genre: {' '}
                            {movieDetails?.genres.length > 0 && movieDetails?.genres.map((item, index) => (
                                <Text key={index}>{movieDetails.genres.length - 1 === index ? item.name : item.name + ', '}</Text>
                            ))}
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: RFValue(10)}}>
                            <TouchableOpacity
                                onPress={() => {
                                    addMovieFavourite(movieDetails, favourites);
                                    setCounter(counter + 1)
                                }}

                                style={{width: RFValue(20), height: RFValue(20), borderRadius: RFValue(20), backgroundColor: favouriteExists(movieDetails?.id, favourites) ? 'green' : '#0F7AF8', alignItems: 'center', justifyContent: 'center', marginRight:RFValue(20)}}
                            >
                                <Icon name='heart'  size={RFValue(10)} color='white'  />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: RFValue(20), marginTop: RFValue(10)}}>
                        <Text>Recommendations:</Text>
                    </View>
                    <FlatList
                        data={movieSuggestions?.results}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        contentContainerStyle={{
                            marginVertical: RFValue(24),
                            paddingBottom: RFValue(40),
                        }}

                    />

                    <CommentUpdateComponent
                        isModalVisible={isModalVisible}
                        id={movieDetails?.id}
                        setIsModalVisible={setIsModalVisible}
                        rateMovie={rateMovie}
                    />

                </ScrollView>
            }
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => ({
    movieDetails: state.movies.movieDetails,
    loading: state.movies.loading,
    movieSuggestions: state.movies.movieSuggestions,
    favourites: state.movies.favourites,
});

export default connect(mapStateToProps, {getMovieDetails, rateMovie, removeMovieFavourite, addMovieFavourite})(MovieDetails)
