  /* Added for code cleaning*/
  import { StatusBar } from 'expo-status-bar'
  import React, { Component } from 'react'
  import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
    Button,
    AsyncStorage, 
    //Platform,      // Not using for own coding
  } from 'react-native'
  /* End ------Added for code cleaning*/
  // third party components
  import RNPickerSelect from 'react-native-picker-select'
  // custom components
  import { Item } from './components/Item'
  // stylesheets
  import {styles} from './styles/Main';
  import {pickerStyle} from './styles/Picker';

    const pickerPlaceholder = {
    label: 'select category',
    value: null,
    color: 'black',
    }

  /*Using a class*/
  export default class App extends Component {
    state ={
      expenseAmount: '',
      expenseCategory: '',
      validInput: false,
    //flagImage:true, // This did not work.
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
            <Text style ={styles.title}>- Easy To Do List / Expense Tracker -</Text>
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
        //change={this.changeImage} // This did not work
        status = {item.status}
      />
    )

    // Testing: Meant to be changing the exclamation image to ticked mark image by clicking
    // changeImage = ( itemId ) => {
    //     this.listData.forEach ( (item,index) => {
    //       if( item.id == itemId ) {
    //         //experimenting
    //         this.setState({
    //           flagImage:!this.state.flagImage
    //         });

    //       }
    //     })
        
    //     //Testing
    //     this.setState({
    //       flagImage:!this.state.flagImage
    //     });

    //    // this.saveList()  Not using these codes below for own desgin purpose
    //    this.setState({expenseAmount:''})// Changed from 0 -> '' so that int 0 can be entered.
    //   }


    removeItem = (itemId) => {
      this.listData.forEach( (item,index) => {
        if (item.id == itemId) {
          this.listData.splice( index, 1 )
          item.status = true
        }
      } )
      this.setState({expenseAmount:''})// Changed from 0 -> '' so that int 0 can be entered.
    }   

    //Not using these codes below for own desgin purpose
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
  }
