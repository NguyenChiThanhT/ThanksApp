import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, TextInput,AsyncStorage,FlatList} from 'react-native';
import {Select, Option} from "react-native-chooser";
import ItemList from './src/component/ItemList';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrList: [{name: "A", count: 20},{name: "B", count: 20},{name: "C", count: 20},{name: "D", count: 20}],
        }
    }
    componentWillMount(){
        AsyncStorage.multiSet([
            ["mang",JSON.stringify(this.state.arrList)]
        ]);
    }
    componentDidMount(){
        AsyncStorage.multiGet(['mang']).then((data) =>{
            var arr = data[0][1];
            this.setState({
                arrList:JSON.parse(arr)
            })
           // console.log(JSON.parse(arr));
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, backgroundColor: "blue"}}>
                </View>
                <View style={{flex: 3}}>
                    <FlatList
                        data={this.state.arrList}
                        renderItem={({item}) => <ItemList data={item} arr={this.state.arrList}/>}
                        keyExtractor={item => item.name}
                    />
                </View>
                <View style={{flex: 1, backgroundColor: "red"}}>
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({

//modal1
    Alert_Main_View: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#009688",
        height: 500,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,

    },

    Alert_Title: {
        fontSize: 25,
        color: "#fff",
        textAlign: 'center',
        padding: 10,

    },
});
