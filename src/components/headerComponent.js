import {Dimensions, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View, ScrollView} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import React, {useState} from "react";
import {Styles} from "../screens/styles";
import {image_base_url} from "../store/actions/moviesAction";
import {convertDate} from "../utils/helpers";
import StarRating from "react-native-star-rating";
import Modal from "react-native-modal";


const HeaderComponent = ({favourites, title, goBack, navigation, removeMovieFavourite}) => {

    const [ isModalVisible, setIsModalVisible] = useState(false)

    const RenderItem = ({item, index}) => {
        return (
            <View
                style={{...Styles.card}}>
                <TouchableOpacity
                    onPress={() => {
                        setIsModalVisible(false)
                        navigation.navigate('MovieDetails', {id: item?.id})
                    }}
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
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity
                        onPress={() => removeMovieFavourite(item.id, favourites)}
                        style={{width: RFValue(20), height: RFValue(20), borderRadius: RFValue(20), alignItems: 'center', justifyContent: 'center', marginRight:RFValue(20)}}
                    >
                        <Icon name='trash'  size={RFValue(20)} color={'red'}   />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };



    return (
       <View style={{flexDirection: 'row', paddingHorizontal: RFValue(5), justifyContent: 'center', paddingVertical: RFValue(10)}}>
           {goBack &&
           <TouchableOpacity
               onPress={() => navigation.goBack()}
               style={{width: RFValue(20), height: RFValue(20), borderRadius: RFValue(20), alignItems: 'center', justifyContent: 'center', marginLeft:RFValue(10)}}
           >
               <Icon name='arrow-left'  size={RFValue(20)}   />
           </TouchableOpacity>
           }
           <View style={{flex: 1}}>
               <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
           </View>
           <TouchableOpacity
               onPress={() => setIsModalVisible(true)}
               style={{width: RFValue(20), height: RFValue(20), borderRadius: RFValue(20), alignItems: 'center', justifyContent: 'center', marginRight:RFValue(20)}}
           >
               <View style={{position: 'absolute', top: 1, zIndex: 1, right: -5, backgroundColor: 'red', height: 14, width: 14, borderRadius: 7, alignItems: 'center', justifyContent: 'center' }}>
                   <Text style={{color: 'white', fontSize: 10}}>{favourites.length}
                   </Text>
               </View>
               <Icon name='heart'  size={RFValue(20)} color='green'  />
           </TouchableOpacity>


           <Modal
               style={{margin: 0, justifyContent: 'flex-end'}}
               backdropTransitionOutTiming={0}
               isVisible={isModalVisible}
               animationInTiming={400}
               swipeDirection="down"
               onSwipeComplete={() => setIsModalVisible(false)}
               onBackButtonPress={() => setIsModalVisible(false)}
               // onBackdropPress={() => setIsModalVisible(false)}
               propagateSwipe={true}
               >
               <View style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
               <View style={{alignItems: 'flex-end', marginTop: RFValue(50)}}>
                   <TouchableOpacity
                       onPress={() => setIsModalVisible(false)}
                       style={{width: RFValue(20), height: RFValue(20), borderRadius: RFValue(20), alignItems: 'center', justifyContent: 'center', marginRight:RFValue(20)}}
                   >
                       <Icon name='close'  size={RFValue(20)}   />
                   </TouchableOpacity>
               </View>
               <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: RFValue(50)}}>
                   <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>Favourites</Text>

                   {
                       favourites.map((item, index) => (
                           <RenderItem key={index} item={item} index={index} />
                       ))
                   }
                   {favourites.length === 0 &&
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{textAlign: 'center', fontSize: 14}}>No Favourites</Text>
                  </View>

                   }
               </ScrollView>
           </View>

           </Modal>



       </View>
    )
}

export default HeaderComponent
