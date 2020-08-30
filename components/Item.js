import React from 'react';
import { Text,View,TouchableOpacity, Image } from 'react-native';

import {itemStyles} from '../styles/Item';


export const Item = ( props ) => {
  return(
    <View style={itemStyles.item}>
        <View style={itemStyles.row}>
            <Text style={itemStyles.text, props.strikeThrough && {textDecorationLine: 'line-through'}}>{props.category}</Text>
            <Text style={itemStyles.text}>{props.amount}</Text>
        </View>
        <TouchableOpacity onPress={() => {props.delete( props.id ) } }>
            <Image style={itemStyles.icon} source={require('../assets/trash-color.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => {props.change( props.id ); props.strikeThrough(props.id) } } >
                <Image style={itemStyles.icon}  source={ props.status ? require('../assets/checklist-icon.png') :
                require('../assets/red-circle.png')} />
            </TouchableOpacity>
    </View>
  )
}

