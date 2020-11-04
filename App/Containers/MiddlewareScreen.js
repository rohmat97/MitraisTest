import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MiddlewareScreenStyle'

class MiddlewareScreen extends Component {
  componentDidMount(){
    const { navigation }= this.props
    const {getParam} = navigation
    if(getParam('params')){
      setTimeout(() => {
        navigation.replace(getParam('params'))
      }, 2000);
    }
  }
  render () {
    const {height,width} = Dimensions.get('screen')
    return (
      <View style={{width:width, height:height,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={60} color={'darkviolet'}/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MiddlewareScreen)
