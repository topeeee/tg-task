import React, {useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Modal from "react-native-modal";
import {RFValue} from "react-native-responsive-fontsize";
import {Styles} from "../screens/styles";
import StarRating from "react-native-star-rating";


const CommentUpdateComponent = (props) => {
    const [rating, setRating] = useState(0)
    const {
        isModalVisible,
        setIsModalVisible,
        id,
        rateMovie
    } = props

    const handleRating = () => {
        rateMovie(id, rating)
        setTimeout(() => {
            setIsModalVisible(false)
        }, 300)
    }

    return (
        <Modal
            style={{flex: 1, margin: 0, justifyContent: 'flex-end'}}
            // animationOutTiming={600}
            backdropTransitionOutTiming={0}
            isVisible={isModalVisible}
            animationInTiming={400}
            swipeDirection="down"
            onSwipeComplete={() => setIsModalVisible(false)}
            onBackButtonPress={() => setIsModalVisible(false)}
            onBackdropPress={() => setIsModalVisible(false)}>
            <View
                style={{
                    backgroundColor: 'white',
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                }}>
                <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: RFValue(5)}}>
                    <View style={{backgroundColor: 'grey', height: RFValue(5), width: RFValue(50)}} />
                </View>
               <View style={{ height: RFValue(250), paddingHorizontal: RFValue(20)}}>
                   <View style={{paddingVertical: RFValue(20)}}>
                       {/*<Text style={{textAlign: 'center'}}>Rate Movie</Text>*/}
                   </View>

                   <View stle={{marginTop: RFValue(40)}}>
                       <StarRating
                           disabled={false}
                           maxStars={10}
                           rating={rating}
                           fullStarColor='#FFA500'
                           starSize={RFValue(20)}
                           selectedStar={(rating) =>  setRating(rating)}
                       />
                   </View>
                   <TouchableOpacity
                       onPress={() => handleRating()}
                       style={[Styles.customButton, {backgroundColor: '#0F7AF8', marginTop: RFValue(40)}]}>
                       <Text
                           style={{
                               fontSize: RFValue(12),
                               color: 'white',
                               textAlign: 'center',
                           }}>
                           Rate
                       </Text>
                   </TouchableOpacity>
               </View>

            </View>
        </Modal>
    );
}



export default CommentUpdateComponent
