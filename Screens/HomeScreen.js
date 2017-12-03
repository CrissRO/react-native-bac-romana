import React from 'react';
import {Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
    StyleSheet } from 'react-native';
let Screen = module.exports = {};

Screen.HomeScreen = class HomeScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        text : {}
      }
      
    }

    static navigationOptions = ({ navigation }) => ({
      title: 'Bacalaureat Romana',
      headerTitleStyle :{
        textAlign: 'center',
        alignSelf:'center',
        color:'white'
      },
      headerStyle:{
        backgroundColor:'#d81b60',
      },
    });
   

    componentDidMount() {
      this.state.text = fetch(
        'http://bac-romana-server.herokuapp.com/texts',
        {method:'GET'}
      )
      .then(response=>response.json())
      .then(data=>{
        this.setState(previousState => {
          return { text : data[0].opere};
        
        })
      })
    };

    render() {
      let texts = [];
      let currentStyle = [];

      for(let i = 0; i <this.state.text.length; i++){
        if(this.state.text[i].id == ''){
          currentStyle = [
            styles.boxContentInactive,
            styles.boxActionInactive,
            styles.buttonInactive,
          ]
        }
        else{
          currentStyle = [
            styles.boxContentActive,
            styles.boxActionActive,
            styles.buttonActive,
          ]
        }
        texts.push(
          <View style={styles.box} key={i}>
            <View style={[currentStyle[0],styles.padding,styles.boxContent]}>
              <Text style={[styles.whiteText,styles.title,styles.text20]}>
                {this.state.text[i].titlu}
              </Text>

              <Text style={[styles.whiteText,styles.author,styles.text16]}>
                {this.state.text[i].autor}
               </Text> 
            </View>
            <View style={[currentStyle[1],styles.padding,styles.boxAction]}>
              <TouchableOpacity 
              style={[currentStyle[2],styles.button]} 
              onPress = {()=>{this.state.text[i].id == ''?'': this.props.navigation.navigate('Comp',{id:this.state.text[i].id})}} 
              >
                <Text style={[styles.whiteText,styles.text20]}>{ this.state.text[i].id == ''? 'IN CURAND...':'CITESTE'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      }
      return (
        <ScrollView style={styles.container}>
          
          <View style={styles.column}>
          {texts}
          </View>

        </ScrollView>
      );  
    }
  }

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  column:{
    alignItems:'center',
    flexDirection:'column'
  },
  box:{
    
    flexDirection:'column',
    width:'95%',
    marginTop:10,
    marginBottom:10
  },
  boxContent:{
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
  },
  boxContentActive:{
    backgroundColor: '#ffb74d',
    
  },
  boxContentInactive:{
    backgroundColor: '#ef5350',
  },
  boxAction:{
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  },
  boxActionActive:{
    backgroundColor:'#26a69a',
  },
  boxActionInactive:{
    backgroundColor:'#ef9a9a',
  },
  author:{
    marginLeft:20
  },
  title:{
    
  },
  text20:{
    fontSize:20    
  },
  text16:{
    fontSize:16    
  },
  whiteText:{
    color:'white'
  },
  padding:{
    padding:10
  },
  buttonActive:{
    backgroundColor:'#4db6ac',
  },
  buttonInactive:{
    backgroundColor:'#ef5350',
  },
  button:{
    width:150,
    padding:3,
    borderRadius:5,
    alignItems:'center'
  }
})


