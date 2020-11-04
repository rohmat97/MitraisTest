import React, { useState } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Dimensions, View,TextInput, TouchableOpacity, Alert, Keyboard, Modal, ActivityIndicator, Animated } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DataRedux from '../Redux/DataRedux'
import CheckBox from '@react-native-community/checkbox'
import DateTimePickerModal from "react-native-modal-datetime-picker";
// Styles
import styles from './Styles/RegistrationScreenStyle'
import { bindActionCreators } from 'redux'
import reactotron from 'reactotron-react-native'

function RegistrationScreen (props){
  const {width, height} = Dimensions.get('screen')
  const [mobileNumber, setmobileNumber] = useState('')
  const [firstName, setfirstName]= useState('')
  const [lastName, setlastName]= useState('')
  const [dataOfBirth, setdataOfBirth]= useState('')
  const [email, setemail]= useState('')

  const [validMobileNumber,setvalidMobileNumber]=useState(false)
  const [validFirstname, setvalidFirstname]=useState(false)
  const [validLastname, setvalidLastname]=useState(false)
  const [validEmail, setvalidEmail]=useState(false)

  const [showWordingPhone,setshowWordingPhone]=useState(false)
  const [showWordingFirstname, setshowWordingFirstname]=useState(false)
  const [showWordingLastname, setshowWordingLastname]=useState(false)
  const [showWordingEmail, setshowWordingEmail]=useState(false)

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const [validRegist, setvalidRegist] = useState(false)
  const [loading, setloading] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setdataOfBirth(date)
    hideDatePicker();
  };
  // ^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$
  const validateFirstname=(text)=>{
    let reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      // this.setState({ email: text })
      setfirstName(text)
      setvalidFirstname(false)
      return false;
    }
    else {
      setfirstName(text)
      setvalidFirstname(true)
      // console.log("Email is Correct");
    }
  }

  const validateLastname=(text)=>{
    let reg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      // this.setState({ email: text })
      setlastName(text)
      setvalidLastname(false)
      return false;
    }
    else {
      setlastName(text)
      setvalidLastname(true)
      // console.log("Email is Correct");
    }
  }

  const validatePhone=(text)=>{
    let phone=text.substring(0,3)
    let phone1=text.substring(0,1)
    let phone2=text.substring(0,4)
    if(phone==='+62'||phone1==='0'){
      if(phone2==='+620'){
        setmobileNumber('+62')
        return true
      }
      setmobileNumber(text)
      setvalidMobileNumber(true)
    }else{
      setmobileNumber(text)
      setvalidMobileNumber(false)
    }
  }
  const validateEmail = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      // this.setState({ email: text })
      setemail(text)
      setvalidEmail(false)
      return false;
    }
    else {
      setemail(text)
      setvalidEmail(true)
      // console.log("Email is Correct");
    }
  }

  const falshMessage=(text)=>(
      <View 
      style={{
        backgroundColor:'red', 
        width:'100%', 
        justifyContent:'center', 
        alignItems:'center',           
        height:30, 
        top:0,
        marginBottom:2
      }}>
          <Text style={{color:'white'}}>{text}</Text>
      </View>
    )
  

  const submitRegister=()=>{
    let dataSuccess ={
      mobileNumber:mobileNumber,
      firstName:firstName,
      lastName:lastName,
      birth:dataOfBirth,
      email:email
    }
    if(validEmail&&validFirstname&&validLastname&&validMobileNumber){
      setloading(true)
      if(props.data.data){
        if(props.data.data.length>1){
          props.dataRequest([...props.data.data,dataSuccess])
        }else{
          props.dataRequest([props.data.data,dataSuccess])
        }
      }else{
        props.dataRequest(dataSuccess)
      }
      
      setTimeout(() => {
        setloading(false)
      }, 1500);
      setvalidRegist(true)
    }else{
      if(!validEmail){
        setshowWordingEmail(true)
        
        setTimeout(() => {
        setshowWordingEmail(false)
        }, 2000);
      }
      if(!validMobileNumber){
        setTimeout(() => {

          setshowWordingPhone(true)
          setTimeout(() => {
            setshowWordingPhone(false)
            }, 2000);
        }, 250);
      }
      if(!validFirstname){
        setTimeout(() => {

          setshowWordingFirstname(true)
          setTimeout(() => {
            setshowWordingFirstname(false)
            }, 2000);
        }, 500);
      }
      if(!validLastname){
        setTimeout(() => {

          setshowWordingLastname(true)
          setTimeout(() => {
            setshowWordingLastname(false)
            }, 2000);
        }, 750);
      }
    }
    
  }
    return (
      <ScrollView style={styles.container}>
       
        {showWordingEmail? falshMessage('Email is not valid'):null}
        {showWordingLastname?falshMessage('Last Name is required and Last name is invalid'):null}
        {showWordingFirstname? falshMessage('First Name is required and First name is invalid'):null}
        {showWordingPhone? falshMessage('Please enter valid indonesian phone number'):null}
          <View style={{width:width, height:height*0.9,backgroundColor:'ghostwhite', borderRadius:8}}>
        <KeyboardAvoidingView >

            <View style={{padding:32}}>
              <Text style={{fontSize:24, fontWeight:'600',marginBottom:12}}>Registration</Text>
                <TextInput
                  value={mobileNumber}
                  placeholder='Mobile Number'
                  keyboardType='phone-pad'
                  editable
                  maxLength={40}
                  onChangeText={text => validatePhone(text)}
                  style={{borderWidth:1,borderRadius:4,marginVertical:8}}
                />
                <Text style={{color:'red'}}>{mobileNumber.length===0?'*Mobile number is required':validMobileNumber?'': '*Please enter valid Indonesian phone number'}</Text>
                <TextInput
                  value={firstName}
                  placeholder='First Name'
                  editable
                  maxLength={40}
                  onChangeText={text => validateFirstname(text)}
                  style={{borderWidth:1,borderRadius:4,marginVertical:8}}
                />
                <Text style={{color:'red'}}>{firstName.length===0?'*First name is required':validFirstname?'':'*First name invalid'}</Text>
                <TextInput
                  value={lastName}
                  placeholder='Last Name'
                  editable
                  maxLength={40}
                  onChangeText={text => validateLastname(text)}
                  style={{borderWidth:1,borderRadius:4,marginVertical:8}}
                />
                <Text style={{color:'red'}}>{lastName.length===0?'*Last name is required':validLastname?'':'*Last name invalid'}</Text>
                <Text style={{paddingTop:12}}>Date of Birth</Text>
                <TouchableOpacity onPress={()=>showDatePicker()}>
                  <TextInput
                    value={dataOfBirth?dataOfBirth.toLocaleDateString(): new Date().toLocaleDateString()}
                    editable={false}
                    style={{borderWidth:1,borderRadius:4,marginVertical:8, fontSize:16, textAlign:'center'}}
                    
                  />
                </TouchableOpacity>
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:12}}>
                  <CheckBox
                    // disabled={false}
                    boxType={'circle'}
                    value={toggleCheckBox==='male'?true:false}
                    tintColors={{ true: 'darkviolet', false: 'black' }}
                    onValueChange={() => setToggleCheckBox('male')}
                  />
                  <Text>Male</Text>
                  <CheckBox
                    // disabled={false}
                    tintColors={{ true: 'darkviolet', false: 'black' }}
                    boxType={'circle'}
                    value={toggleCheckBox==='female'?true:false}
                    onValueChange={(newValue) => setToggleCheckBox('female')}
                  />
                  <Text>Female</Text>
                </View>
                <TextInput
                  value={email}
                  placeholder='Email'
                  keyboardType='email-address'
                  editable
                  maxLength={40}
                  onChangeText={text => validateEmail(text)}
                  style={{borderWidth:1,borderRadius:4,marginVertical:8}}
                  
                />
                <Text style={{color:'red', marginBottom:12}}>{email.length===0?'*Email is required':validEmail?'':'*Email is not Valid'}</Text>
                 <TouchableOpacity
                  style={{width:'100%', height:50, borderRadius:8, backgroundColor:'darkviolet',alignItems:'center', justifyContent:'center'}}
                  onPress={() =>submitRegister()}
                >
                  <Text style={{color:'white', fontSize:16}}>Register</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
        {validRegist?
           <View style={{width:width, height:height*0.9,backgroundColor: 'ghostwhite', position:'absolute',top:0,opacity:0.8,justifyContent:'center',alignItems:'center'}}>
              {loading?<ActivityIndicator color={'darkviolet'} size={40}/>:null}
              
           </View>
        :null}
        {validRegist?
          <View style={{width:width, height:height*0.125, backgroundColor:'#dadada', justifyContent:'center',alignItems:'center',position:'absolute',bottom:0}}>
            <TouchableOpacity onPress={()=> {
              loading?null:props.navigation.replace('MiddlewareScreen',{params:'LoginScreen'})
              }}>
              <Text style={{color:'white', fontSize:20,padding:12,paddingHorizontal:width*0.35,borderRadius:8, backgroundColor:loading?'gray':'darkviolet'}}>Login</Text>
            </TouchableOpacity>
          </View>:
          <View style={{width:width, height:height*0.125, backgroundColor:'darkviolet', justifyContent:'center',alignItems:'center',position:'absolute',bottom:0}}>
           <Text style={{color:'white', fontSize:32}}>Footer</Text>
          </View>
        }
           
          </View>
       
        {isDatePickerVisible && (
            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
       )}
      </ScrollView>
    )
}

const mapStateToProps = (state) => {
  reactotron.log('state.data',state.data.data)
  return {
    data:state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign(DataRedux),dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen)
