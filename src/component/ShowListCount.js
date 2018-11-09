import React, {Component} from 'react';
import {Alert,View,Text,Image,TouchableOpacity} from 'react-native';
import HeaderItem from "./base/Headers";
import {Container, Content} from "native-base";
import ListCount from "./base/ListCount";
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';
import { Dialog,ProgressDialog} from 'react-native-simple-dialogs';
import {firebaseApp} from '../api/Firebaseconfig';
import connect from "react-redux/es/connect/connect";
import * as PersonAction from "../redux/PersonAction";

const storage = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

class ShowListCount extends Component {
    constructor(props){
        super(props);
        this.state ={
            modalVisible:false,
            progressVisible:false
        }
    }
    componentWillMount() {
        this.setState({
            arrperson: this.props.navigation.getParam('arr')
        })
    }
    _modalVisible(){
        this.setState({
            modalVisible:!this.state.modalVisible
        })
    }
    RedFileCSV() {
        result = [];
        DocumentPicker.pick({type: [DocumentPicker.types.allFiles]})
            .then((res) => {
                const path = res.uri;
                const pathToWrite = path.slice(7);
                //console.log(pathToWrite);
                this.setState({
                    progressVisible:!this.state.progressVisible
                })
                RNFetchBlob.fs.readFile(pathToWrite, 'utf8')
                    .then((data) => {
                        lines =data.split('\n');
                        var result = [];
                        var headers=lines[0].split(",");
                        for(var i=1;i<lines.length;i++){
                            var data = lines[i].split(",");
                            if(data.length == headers.length){
                                var location = {"id":data[0],"name":data[1],"count":data[2],"countbegin":data[3],"email":data[4],"image":data[5]};
                                result.push(location);
                            }
                        }
                        setTimeout(() => {
                            this.setState({
                                progressVisible:!this.state.progressVisible,
                            });
                            this.props.SetPersonFromFileCSV(result)
                        }, 2000);
                        return result;
                    })
                    .catch(error =>console.log(error))
            })
            .catch((err) => {
                if (DocumentPicker.isCancel(err)) {
                    // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                    throw err;
                }
            });
    }

    WriteFileCSV() {
        this.setState({
            progressVisible:!this.state.progressVisible
        })
        arr = this.props.person;
        var csvRow = [];
        var A = [['id', 'name', 'count', 'countbegin', 'email', 'image']];
        for (var item = 0; item < arr.length; item++) {
            A.push([item, arr[item].name, arr[item].count, arr[item].countbegin, arr[item].email, arr[item].image])
        }
        for (var i = 0; i < A.length; i++) {
            csvRow.push(A[i].join(","))
        }
        var csvString = csvRow.join("\n");
        const dirs = RNFetchBlob.fs.dirs;
        // write the current list of answers to a local csv file
        const pathToWrite = `${dirs.DocumentDir}/data.csv`;
        RNFetchBlob.fs
            .writeFile(pathToWrite, csvString, 'utf8')
            .then(() => {
                console.log(`wrote file ${pathToWrite}`);
                // wrote file /storage/emulated/0/Download/data.csv
                const sessinID = new Date().getTime();
                const nameref = storage.ref('file').child(`${sessinID}.csv`);
                RNFetchBlob.fs.readFile(pathToWrite, 'utf8')
                    .then((data) => {
                        return Blob.build(data, {type: 'text'})
                    })
                    .then((blob) => {
                        setTimeout(() => {
                            this.setState({
                                progressVisible:!this.state.progressVisible,
                                modalVisible:!this.state.modalVisible
                            })
                        }, 1000);
                        return nameref.put(blob, {contentType: `text/csv`})
                    })
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <Container>
                <HeaderItem navigate={this.props.navigation.navigate} fucW={this.WriteFileCSV.bind(this)}
                            fucR={this.RedFileCSV.bind(this)} left="ios-arrow-back-outline"
                            fright="ios-cloud-upload-outline" lright="ios-cloud-download-outline"/>
                <Content style={{padding: 10}}>
                    <ListCount data={this.props.person}/>
                </Content>
                <Dialog
                    visible={this.state.modalVisible}
                    //title="Custom Dialog"
                    onTouchOutside={() => this.setState({modalVisible: false})} >
                    <View>
                        <View style={{borderRadius:50,backgroundColor:"white",alignSelf:"center",position: "absolute",width:90,height:90,marginTop:-70}}>
                            <Image
                                style={{width:90,height:90}}
                                source={require('../images/finish.png')}
                            />
                        </View>
                        <Text style={{fontSize:30,textAlign:"center",marginTop:20}}>Success</Text>
                        <Text style={{fontSize:20,textAlign:"center"}}>Check your firebase file in storage</Text>
                        <TouchableOpacity style={{backgroundColor:"green",height:50,marginTop:20}} onPress={() =>{this._modalVisible()}}>
                            <Text style={{fontSize:20,textAlign:"center",color:"white",paddingTop:10}}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
                <ProgressDialog
                    visible={this.state.progressVisible}
                    title="Progress Dialog"
                    message="     Please, wait..."
                    activityIndicatorColor="red"
                    activityIndicatorSize="large"
                />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        person: state.person
    }
}

export default connect(mapStateToProps, PersonAction)(ShowListCount);
