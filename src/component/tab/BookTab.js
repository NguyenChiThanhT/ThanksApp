import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {Container,Content,Icon} from 'native-base';
import HeaderItem from "../base/Headers";
import {connect} from 'react-redux';
import * as PersonAction from "../../redux/PersonAction";
class BookTab extends Component{
    static navigationOptions ={
        tabBarIcon: ({tintColor}) =>{
            return <Icon name='ios-book-outline' style={{color:tintColor}} />
        }
    }
    componentWillMount(){
        this.props.fetchPeople();
    }
    render(){
        return(
            <Container>
                <HeaderItem />
                <Content style={{padding:10}}>
                    <Text>this is Card</Text>
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
export default connect(mapStateToProps,PersonAction)(BookTab);