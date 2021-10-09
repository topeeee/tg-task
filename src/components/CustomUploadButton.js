import React, {useState} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker';


const CustomUploadButton = ({style, onPicked, label}) => {
  const [value, setValue] = useState('');

  const pickItem = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
          readContent: true,
      });
      if (typeof onPicked === 'function') {
        onPicked(res);
      }
      setValue(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={{...style}}>
      <Text
        customstyle={{
          color: 'black',
          fontSize: 12,
          lineHeight: 20,
          fontWeight: 'bold',
          // textTransform: 'capitalize',
        }}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={() => pickItem()}
        style={{
          height: 42,
          backgroundColor: '#EFEFEF',
          borderRadius: 4,
          marginTop: 5,
          paddingHorizontal: 10,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <View>
            {/*<Image*/}
            {/*  resizeMode="contain"*/}
            {/*  source={require('../asset/upload_file.png')}*/}
            {/*  style={{height: 12, width: 12}}*/}
            {/*/>*/}
          </View>
          <View style={{flex: 1, marginLeft: 5}}>
            <Text
              customstyle={{
                color: 'black',
                fontSize: 12,
                lineHeight: 20,
              }}
              numberOfLines={1}>
              {value}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomUploadButton;
