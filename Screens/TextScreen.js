import React from 'react';
import {Text,
    View,
    ScrollView,
    Button,
    TouchableOpacity,
    StyleSheet } from 'react-native';
let Screen = module.exports = {};

Screen.TextScreen = class TextScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        compId : this.props.navigation.state.params.id,
        compNr:  this.props.navigation.state.params.nrComp,
        paragrafe:{},
        listaParagrafe:{}
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
          //console.log(data.paragrafe[data.compuneri[this.state.compNr].paragrafe[0]]);
          return { 
            paragrafe : data.paragrafe,
            listaParagrafe:data.compuneri[this.state.compNr].paragrafe,
            compId : this.props.navigation.state.params.id,
            compNr: this.state.compNr
          };
        
        })
      })
    };

    render() {
      let paragraphs = [];

      for(let i = 0; i <this.state.listaParagrafe.length; i++){
        paragraphs.push(
          <View style={styles.box} key={i}>
            <View style={[styles.boxContentActive,styles.padding,styles.boxContent]}>
              <Text style={[styles.whiteText,styles.title,styles.text20]}>
                {this.state.paragrafe[this.state.listaParagrafe[i]].titlu}
              </Text>
            </View>
            <View style={[styles.boxActionActive,styles.padding,styles.boxAction]}>
              <Text style={[styles.whiteText,styles.text16]}>
              {this.state.paragrafe[this.state.listaParagrafe[i]].continut}
              </Text>
            </View>
          </View>
        );
      
      }
      
      return (
        <ScrollView style={styles.container}>
          
          <View style={styles.column}>
          {paragraphs}
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


