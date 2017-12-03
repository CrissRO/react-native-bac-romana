import React from 'react';
import {Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
    StyleSheet } from 'react-native';
let Screen = module.exports = {};

Screen.CompScreen = class CompScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        text : {},
        compId : this.props.navigation.state.params.id
      }
      
    }
    
    static navigationOptions = ({ navigation }) => ({
      title: 'Bacalaureat Romana',
      headerTitleStyle :{
        textAlign: 'right',
        alignSelf:'center',
        color:'white',
        marginRight:25
      },
      headerStyle:{
        backgroundColor:'#d81b60',
      },
    });
   

    componentDidMount() {
      this.state.text = fetch(
        'http://bac-romana-server.herokuapp.com/compunere/'+this.state.compId,
        {method:'GET'}
      )
      .then(response=>response.json())
      .then(data=>{
        this.setState(previousState => {
          return { 
            text : data.compuneri,
            compId : this.props.navigation.state.params.id
          };
        
        })
      })
    };

    render() {
      let comps = [];

      for(let i = 0; i <this.state.text.length; i++){
        comps.push(
          <View style={styles.box} key={i}>
            <View style={[styles.boxContentActive,styles.padding,styles.boxContent]}>
              <Text style={[styles.whiteText,styles.title,styles.text20]}>
                {this.state.text[i].titlu}
              </Text>
            </View>
            <View style={[styles.boxActionActive,styles.padding,styles.boxAction]}>
              <TouchableOpacity 
              style={[styles.buttonActive,styles.button]} 
              onPress = {()=>{ 
                this.props.navigation.navigate('Text',
                {nrComp:i,
                 id:this.state.compId}
              )
            }} 
              >
                <Text style={[styles.whiteText,styles.text20]}>CITESTE</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      }
      return (
        <ScrollView style={styles.container}>
          
          <View style={styles.column}>
          {comps}
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


