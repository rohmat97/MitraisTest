import React, { Component, useState } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Dimensions, ActivityIndicator, Alert } from 'react-native'
import { Button, Image } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataRedux from '../Redux/DataRedux'

// Styles
import styles from './Styles/LoginScreenStyle'

function LoginScreen (props) {
    const {width,height}= Dimensions.get('screen')
    const [loadingRegister,setloadingRegister]=useState(false)
    const [loadingLogin,setloadingLogin]=useState(false)
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
        <View style={{ width:width,height:height*0.3,justifyContent:'center',alignItems:'center'}}>
          <Image
            
            source={{ uri: 'data:image/png;base64,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' }}
            style={{ width: width*0.95, height: 150,alignItems:'center', marginBottom:24 }}
            PlaceholderContent={<ActivityIndicator />}
          />
          <View style={{flexDirection:'row', width:width, justifyContent:'space-around',alignItems:'center'}}>
            <Button
             onPress={()=>{
              setloadingLogin(true)
              setTimeout(() => {
                setloadingLogin(false)
                Alert.alert('  ', 'Still on development')
              }, 1000);
            }}
            containerStyle={{width:width*0.4}}
            title="Login"
            loading={loadingLogin}
            />
            <Button
            onPress={()=>{
              setloadingRegister(true)
              setTimeout(() => {
              setloadingRegister(false)
              props.navigation.replace('MiddlewareScreen',{params:'RegistrationScreen'})
              }, 1000);
            }}
            containerStyle={{width:width*0.4}}
              title="Register"
              loading={loadingRegister}
            />
          </View>
        </View>
       
        <ScrollView style={{width:width, height:height*0.6}}>
          
          {
          
          props.data && props.data.length>1? props.data.map(data=>{
            return(
              <View style={{backgroundColor:'darkviolet',flexDirection:'column', margin:12, width:'100%',padding:12}}>
                  <Text style={{color:'white'}}>Phone Number {data.mobileNumber}</Text>
                  <Text style={{color:'white'}}>Full Name {data.firstName+' '+data.lastName}</Text>
                  <Text style={{color:'white'}}>Date of Birth {data.birth}</Text>
                  <Text style={{color:'white'}}>Email {data.email}</Text>
              </View>
            )
          }):
            <View style={{backgroundColor:'darkviolet', margin:12, width:width*0.95,padding:12}}>
             <Text style={{color:'white'}}>Phone Number {props.data.mobileNumber}</Text>
             <Text style={{color:'white'}}>Full Name {props.data.firstName+' '+props.data.lastName}</Text>
             <Text style={{color:'white'}}>Date of Birth {props.data.birth}</Text>
             <Text style={{color:'white'}}>Email {props.data.email}</Text>
            </View>
           
          }
          </ScrollView>

        
        </KeyboardAvoidingView>
      </View>
    )
}

const mapStateToProps = (state) => {
  return {
    data: state.data.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(DataRedux),dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
