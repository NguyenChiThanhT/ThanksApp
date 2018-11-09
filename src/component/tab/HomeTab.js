import React,{Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {Container,Content,Icon} from 'native-base';
import HeaderItem from "../base/Headers";
import {connect} from 'react-redux';
import * as PersonAction from "../../redux/PersonAction";
import ListPerson from "../base/ListPerson";
class HomeTab extends Component{
    static navigationOptions ={
          tabBarIcon: ({tintColor}) =>{
              return <Icon name='ios-home-outline' style={{color:tintColor}} />
          }
    }
    componentWillMount(){
        this.props.fetchPeople();
        this.props.SetUser();
    }
        render(){
            return(
                <Container>
                    <HeaderItem navigate={this.props.navigation.navigate} right="person"/>
                    <Content style={{padding:10}}>
                        <FlatList
                            data={this.props.person}
                            renderItem={({item}) => <ListPerson listperson={item} arrperson={this.props.person} navigate={this.props.navigation.navigate}/>}
                            keyExtractor={item => item.id.toString()}
                        />
                    </Content>
                </Container>
            );
        }
}
function mapStateToProps(state){
    return{
        person: state.person,
        errorMessage:state.errorMessage,
    }
}
export default connect(mapStateToProps,PersonAction)(HomeTab);