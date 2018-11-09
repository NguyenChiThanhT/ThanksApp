import React,{Component} from 'react';
import {TouchableHighlight,View,Image} from 'react-native';
import {Icon,Button,Card,CardItem,Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import {connect} from 'react-redux';
import * as PersonAction from "../../redux/PersonAction";
import ShowModal from '../ShowModal';
 class ListPerson extends Component {
       constructor(props){
           super(props);
           this.state = {
               isViable:false
           }
       }
     isViablek(){
          this.setState({
              isViable:!this.state.isViable
          })
     }
     imageclick(id,name,count,countbegin,email,image){
           countbegins = countbegin +1;
           this.props.SetId(id,name,count,countbegins,this.props.arrperson,email,image);

           this.props.UpdateCountBegin(id,name,count,countbegins,email,image)
       }
       render(){
           const {id,name,email,image,count,countbegin} = this.props.listperson;
           return(
               <View>
                   <Card>
                       <CardItem>
                           <Left>
                               <TouchableHighlight onPress={() =>{this.imageclick(id,name,count,countbegin,email,image)}}>
                                   <Thumbnail resizeMode="stretch" circular source={{ uri: image}}/>
                               </TouchableHighlight>
                               <Body>
                               <Text>{name}</Text>
                               <Text note>{email}</Text>
                               </Body>
                           </Left>
                       </CardItem>
                       <CardItem cardBody>
                           <Image resizeMode="stretch" source={{ uri: image}} style={{height: 300, width: null, flex: 1}}/>
                       </CardItem>
                       <CardItem>
                           <Left>
                               <Button transparent onPress={() =>{this.isViablek()}}>
                                   {this.state.isViable ? <Icon  active name="thumbs-up" /> : <Icon  active name="ios-thumbs-up-outline" />}
                                   <Text>{countbegin}</Text>
                               </Button>
                           </Left>
                           <Body>
                           <Button transparent>
                               <Icon active name="chatbubbles" />
                               <Text>4 Comments</Text>
                           </Button>
                           </Body>
                           <Right>
                               <Text>11h ago</Text>
                           </Right>
                       </CardItem>
                   </Card>
                   <ShowModal arrperson={this.props.arrperson}/>
               </View>
           );
       }
}
function mapStateToProps(state){
    return{
        person: state.person,
    }
}
export default connect(mapStateToProps,PersonAction)(ListPerson);