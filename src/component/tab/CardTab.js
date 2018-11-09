import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as PersonAction from "../../redux/PersonAction";
import BackgroundWrapper from "../BackgroundWrapper";
import Login from "../Login";
import {Container,Content,Icon} from 'native-base';
class CardTab extends Component{
    static navigationOptions ={
        tabBarIcon: ({tintColor}) =>{
            return <Icon name='ios-card-outline' style={{color:tintColor}} />
        }
    }
    componentWillMount(){
        this.props.fetchPeople();
    }
    render(){
        return(
            <BackgroundWrapper >
                <Login navigate={this.props.navigation.navigate}/>
            </BackgroundWrapper>
        );
    }
}
function mapStateToProps(state){
    return{
        person: state.person,
        errorMessage:state.errorMessage,
    }
}
export default connect(mapStateToProps,PersonAction)(CardTab);