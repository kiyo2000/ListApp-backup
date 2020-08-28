  // import { StatusBar } from 'expo-status-bar';
  // import React, {Component} from 'react'; //Using class ->{Component}
  // import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';//Add Flatlist
  
  /* Added for code cleaning*/
  import { StatusBar } from 'expo-status-bar'
  import React, { Component } from 'react'
  import {
   // StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
    Button,
   // AsyncStorage,
    //Platform,
  } from 'react-native'
  /* End ------Added for code cleaning*/
  // third party components
  import RNPickerSelect from 'react-native-picker-select'
  // custom components
  import { Item } from './components/Item' // How to import another js file.
  // stylesheets
  import {styles} from './styles/Main';
  import {pickerStyle} from './styles/Picker';

    const pickerPlaceholder = {
    label: 'select category',
    value: null,
    color: 'black'
    }

  /*Using a class*/
  export default class App extends Component {
    state ={
      expenseAmount: '',
      expenseCategory: '',
      validInput: false, 
      image: require('./assets/checklist-icon.png'),//testing for setting an image as a state
    }
    listData = []

    dropdownItems =[
      { label: 'Workout', value: 'workout'},
      { label: 'Study', value: 'Study'},
      { label: 'Pay Rent', value: 'pay rent'},
      { label: 'Grocery Shopping', value: 'grocery'},
      { label: 'Pay Bills', value: 'pay bills'},
      { label: 'Entertainment', value: 'entertainment'},
      { label: 'Medical Appointment', value: 'medical appointment'},
      { label: 'Reading Books', value: 'reading books'},
      { label: 'Transport', value: 'transport'},
      { label: 'Socialinsing', value: 'socialisng'},
    ]

    render() {
      return (
        <SafeAreaView style={{flex:1}}>
          <View style={styles.main}>
            <Text style ={styles.title}>- To Do List / Expense Tracker -</Text>
            <TextInput
              style={styles.input}
              placeholder="$ amount"
              onChangeText={(text) => this.setState({ expenseAmount: parseFloat(text) }, () => {
                  this.validate()
                })
              }
              keyboardType="number-pad"
              ref={(input) => (this._textInput = input)}
            />

            <RNPickerSelect
              items={this.dropdownItems}
              value={this.state.expenseCategory}
              onValueChange={(value) =>
                this.setState({ expenseCategory: value }, () => {
                  this.validate()
                })
              }
              useNativeAndroidPickerStyle={false}
              style={pickerStyle}
              placeholder = {pickerPlaceholder}
              />
          </View>

          <View style={styles.buttonView}>
            <TouchableOpacity
              style={
                [
                  this.state.validInput ? styles.button : styles.buttonDisabled,
                  {borderRadius: 10}
                ]
              }
              onPress={this.addItem}
              disabled={!this.state.validInput ? true : false}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>

            <View style={{flex:1}}>
              <FlatList
                  data = {this.listData}
                  renderItem = {this.renderList}
                  keyExtractor = { item => item.id }
                  extraData = {this.state.expenseAmount}
              />
            </View>
          </SafeAreaView>
      )
    }

    // Not using these codes below for own desgin purpose
    // componentDidMount(){
    //   this.loadList()
    // }

    renderList = ({item}) => (
      <Item 
        amount={item.amount} 
        category={item.category} 
        id={item.id}
        delete={this.removeItem}
        buttonPressed={this.tickTheBox}
        status = {item.status}
      />
    )

    tickTheBox = ( itemId ) => {
      this.listData.forEach ( (item,index) => {
        if( item.id == itemId ) {
          //this.listData.splice( index, 1 )
          item.status = true
          this.setState({image: './assets/checklist-icon.png'})//calling an image object works?
        }
      })
     // this.saveList()
        this.setState({expenseAmount:''})// Changed from 0 -> '' so that int 0 can be entered.
    }

    removeItem = (itemId) => {
      this.listData.forEach( (item,index) => {
        if (item.id == itemId) {
          this.listData.splice( index, 1 )
        }
      } )
      this.setState({expenseAmount:''})// Changed from 0 -> '' so that int 0 can be entered.
    }   
    //   this.saveList()
    //   this.setState({expenseAmount:0})
    // }

    addItem = () => {
      if( 
        isNaN(this.state.expenseAmount) || 
       // this.state.expenseAmount == '' || // 0 -> '' // Cut off this code so that int 0 can be entered.
        this.state.expenseCategory == ''
      ) {
        return;
      }
      let itemId = new Date().getTime().toString()
      let listItem = {
        id: itemId,
        amount: this.state.expenseAmount,
        category: this.state.expenseCategory,
      }
      this.listData.push(listItem)
      this.sortList()// Adding a sort list in descending order
     //this.saveList()
      this.setState({
        expenseAmount:'', //Changed from 0 -> '' so that int 0 can be entered.
        expenseCategory: null, 
        validInput: false, 
      })
      this._textInput.clear()
      this._textInput.focus()
    }
    //Changed int from 0 to -1 so that int 0 can be entered.
    validate = () => {
      if(this.state.expenseAmount > -1 && this.state.expenseCategory) {
        this.setState({validInput:true})
      }
    }

    sortList = () => {
      this.listData.sort( (item1,item2) => {
        return item2.id - item1.id
      } )
    }

    // saveList = async () => {
    //   try {
    //     await AsyncStorage.setItem(
    //       'data',
    //       JSON.stringify(this.listData)
    //     )
    //   }
    //   catch( error ) {
    //     console.log(error)
    //   }
    // }
  
    // loadList = async () => {
    //   try{
    //     let items = await AsyncStorage.getItem('data')
    //     this.listData = JSON.parse( items )
    //     this.setState({expenseAmount:0})
    //   }
    //   catch(error) {
    //     console.log(error)
    //   }
    // }
  }

  // const colors = {
  //   primary : '#03fcba',//'hsla(330, 38%, 65%, 1)',
  //   primaryDisabled : '#eb3486',
  // }

  // const pickerPlaceholder = {
  //   label: 'select category',
  //   value: null,
  //   color: 'black'
  // }

  // const styles = StyleSheet.create({
  //   main: {
  //     paddingHorizontal: 10,
  //   },
  //   input: {
  //     width:'100%',
  //     padding: 10,
  //     borderColor: 'black',
  //     borderWidth: 1,
  //     marginVertical: 15
  //   },
  //   button: {
  //     marginTop: 10,
  //     padding: 20,
  //     backgroundColor: colors.primary,
  //     marginVertical: 15
  //   },
  //   buttonText: {
  //     fontSize: 20, 
  //     fontWeight: 'bold',
  //     color: 'white',
  //     textAlign: 'center'
  //   },
  //   buttonDisabled:{
  //     marginTop: 10,
  //     padding: 20,
  //     backgroundColor: colors.primaryDisabled,
  //     marginVertical: 15
  //   },
  // })

  // const pickerStyle = StyleSheet.create({
  //   inputIOS:{
  //   padding: 10,
  //   borderColor: 'black',
  //   borderWidth: 1,
  // },
  //   inputAndroid: {
  //     padding: 10,
  //     borderColor: 'black',
  //     borderWidth: 1,
  //   }
  // })

  /*** Default ***/
  // export default function App() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Open up App.js to start working on your app!</Text>
  //       <StatusBar style="auto" />
  //     </View>
  //   );
  // }

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  // });
