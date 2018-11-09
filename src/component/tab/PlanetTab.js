import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import {Container, Content, Icon, Input, Item, Label} from 'native-base';
import HeaderItem from "../base/Headers";
 class PlanetTab extends Component{
    static navigationOptions ={
        tabBarIcon: ({tintColor}) =>{
            return <Icon name='ios-paper-plane-outline' style={{color:tintColor}} />
        }
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

export default PlanetTab;