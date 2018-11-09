import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, StyleSheet, Alert, Animated, TouchableOpacity, AsyncStorage} from 'react-native';
import BackgroundWrapper from './BackgroundWrapper'
import {getPlatformValue} from '../utils';
import {Item, Label,Input,Button} from "native-base";
export default class Login extends Component {
    state = {
        username: '',
        password: '',
        animation: {
            usernamePostionLeft: new Animated.Value(795),
            passwordPositionLeft: new Animated.Value(905),
            loginPositionTop: new Animated.Value(1402),
            statusPositionTop: new Animated.Value(1542)
        }
    }
    componentWillMount() {
        AsyncStorage.multiGet(["pass"]).then((data) => {
            this.setState({verifypass: data[0][1]})
        })
    }


    componentDidMount() {
        const timing = Animated.timing;
        Animated.parallel([
            timing(this.state.animation.usernamePostionLeft, {
                toValue: 0,
                duration: 700
            }),
            timing(this.state.animation.passwordPositionLeft, {
                toValue: 0,
                duration: 900
            }),
            timing(this.state.animation.loginPositionTop, {
                toValue: 0,
                duration: 700
            }),
            timing(this.state.animation.statusPositionTop, {
                toValue: 0,
                duration: 700
            })

        ]).start()
    }
    Login() {
        if (this.state.verifypass === this.state.password) {
            this.props.navigate('ShowListCount')
        } else {
            alert("please enter password again")
        }
    }
    render() {
        return(
            <View style={loginStyle.loginContainer}>
                <Animated.View style={{position: 'relative', left: this.state.animation.usernamePostionLeft}}>
                    <Image source={require('../images/logo.png')} style={loginStyle.image} resizeMode="cover"/>
                </Animated.View>
                <View style={loginStyle.formContainer}>
                    <Animated.View style={{position: 'relative', left: this.state.animation.usernamePostionLeft}}>
                        <View style={{padding: 20}}>
                            <Item floatingLabel>
                                <Label style={{color:"white"}}>password</Label>
                                <Input
                                    style={{color:"white"}}
                                    secureTextEntry={true}
                                    onChangeText={(text)=>this.setState({password:text})} />
                            </Item>
                        </View>
                    </Animated.View>
                    <Animated.View style={{position: 'relative', top: this.state.animation.loginPositionTop}}>
                        <TouchableOpacity onPress={() =>{this.Login()}} style={{paddingTop: 10,marginTop: 10,height: 50,backgroundColor: "white",marginRight: 15,marginLeft: 15}}>
                            <Text style={{textAlign:"center",fontSize:20,alignItems: "center"}}>Login</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </View>
            </View>
        );
    }
}

const loginStyle = StyleSheet.create({
    image: {
        width: 104,
        height: 104,
        alignSelf: "center"
    },
    loginContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 49,
    },
    formContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: getPlatformValue('android', 25, 45),
    }
})
