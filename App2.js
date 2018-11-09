import React, {Component} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, TextInput,AsyncStorage,FlatList} from 'react-native';
import {Select, Option} from "react-native-chooser";
import ItemList from './src/component/ItemList';
import './src/api/GetPerson';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrList: [{name: "A", count: 20,countbegin:0},{name: "B", count: 20,countbegin:0},{name: "C", count: 20,countbegin:0},{name: "D", count: 20,countbegin:0}],
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
        })
    }

    render() {
        const {container,content_1,content_2,content_3} = styles;
        return (
            <View style={container}>
                <View style={content_1}>
                </View>
                <View style={content_2}>
                    <FlatList
                        data={this.state.arrList}
                        renderItem={({item}) => <ItemList data={item} arr={this.state.arrList}/>}
                        keyExtractor={item => item.name}
                    />
                </View>
                <View style={content_3}>
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    content_1:{
        flex: 1, backgroundColor: "blue"
    },
    content_2:{
        flex: 3
    },
    content_3:{
        flex: 1, backgroundColor: "blue"
    }
});
