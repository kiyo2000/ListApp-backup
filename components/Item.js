import React from 'react';
import { Text,View,TouchableOpacity, Image } from 'react-native';

import {itemStyles} from '../styles/Item';

export const Item = ( props ) => {
  return(
    <View style={itemStyles.item}>
      {/* <Text style={itemStyles.text}>{props.category}</Text>
      <Text style={itemStyles.text}>{props.amount}</Text> */}
        <View style={itemStyles.row}>
            <Text style={itemStyles.text}>{props.category}</Text>
            <Text style={itemStyles.text}>{props.amount}</Text>
        </View>
        {/* <TouchableOpacity onPress={ () => {props.delete( props.id ) } }> */}
        <TouchableOpacity onPress={() => {props.delete( props.id ) } }>
            <Image style={itemStyles.icon} source={require('../assets/trash-color.png')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={ () => {props.buttonPressed( props.id ) } } >
                <Image style={itemStyles.icon} source={require('../assets/checklist-icon.png')} />
            </TouchableOpacity>

    </View>
  )
}