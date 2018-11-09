import React,{Component} from 'react';
import {View} from 'react-native';
import {Title,Icon,Button,Card,CardItem,Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail } from 'native-base';
import ShowModal from "./ShowModal";
import {connect} from 'react-redux';
import * as PersonAction from "../../redux/PersonAction";
 class Headers extends Component{
    GotoShow(){
        this.props.togglemodalVisible()
    }
    Gotoback(){
        this.props.navigate('Main')
    }
    UploadFileCSV(){
       this.props.fucW();
    }
    ReadFileCSV(){
       this.props.fucR();
    }
    render() {
        return (
            <View>
                <Header>
                    <Left style={{flexDirection:"row"}}>
                        <Button transparent>
                            <Icon name={this.props.left} onPress={() =>{this.Gotoback()}}/>
                        </Button>
                        <Button transparent style={{marginLeft:20,marginTop:10}}>
                            <Icon name={this.props.lright} onPress={() =>{this.ReadFileCSV()}} style={{fontSize:30}}/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Thanks App</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() =>{this.UploadFileCSV()}}>
                            <Icon name={this.props.fright} style={{fontSize:30}}/>
                        </Button>
                        <Button transparent onPress={() =>{this.GotoShow()}}>
                            <Icon name={this.props.right} />
                        </Button>
                    </Right>
                </Header>
                <ShowModal arrperson={this.props.arrperson} navigate={this.props.navigate}/>
            </View>
        );
    }
}
export default connect(null,PersonAction)(Headers);
