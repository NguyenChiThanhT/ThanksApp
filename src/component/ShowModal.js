import React,{Component} from'react';
import {View, Text, Modal, StyleSheet, AsyncStorage,TextInput,TouchableOpacity} from 'react-native';
import {Option, Select} from "react-native-chooser";
import {connect} from 'react-redux';
import * as PersonAction from "../redux/PersonAction";
class ShowModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "Select Me Please",
            id:0,
            name:'',
            count:0,
            countbegin:0,
            email:'',
            image:''
        }
    }
    onSelect(value,lable) {
        arr = value.split(",");
        namer = arr[0];
        id = arr[1];
        count  = arr[2];
        counts = parseInt(count) -1;
        countbegin = arr[3];
        email = arr[4];
        image = arr[5];
       this.setState({
           id:id,
           name:namer,
           count:counts,
           countbegin:countbegin,
           email:email,
           image:image
       })
        this.setState({value: namer})

    }
    GotoOK(){
        const {id,name,count,countbegin,email,image} = this.state;
        if(count ==-1){
            alert("khong gui dc")
        } else {
            this.props.Defaultt(id,name,count,parseInt(countbegin),email,image);
            this.props.fetchPeople();
            this.props.arrperson.filter(e => {
                if (e.name == name) {
                    e.count = count;
                }
                return e;
            });
        }
        this.setState({value:"Select Me Please"})
    }
    Cancel(){
        const {id,name,count,countbegin,email,image} = this.props;
        countbegins = countbegin -1;
        this.props.UpdateCountBegin(id,name,count,countbegins,email,image)
        this.props.togglemodalVisiblePost();
        this.props.fetchPeople();
    }
       render(){
           const {text_cancel,tounchable_cancel,text_width,text_ok,modal_tounchable_ok,modal_content_ok,textinput,modal_content_textinput,modal_top,styleSeclect,container,content,Gotoitems,text,modal_content,modal,modal_content_2,modal_content_text,modal_content_select,modal_text_thanksapp} = styles;
           return(
               <Modal visible={this.props.modalVisiblePost} transparent={true}>
                   <View style={modal}>
                       <View style={modal_content}>
                           <Text style={modal_text_thanksapp}>Thanks App</Text>
                       </View>
                       <View style={modal_content_2}>
                           <View style={modal_content_text}>
                               <Text style={{padding: 15}}>
                                   Sender
                               </Text>
                               <View style={modal_content_select}>
                                   <Select
                                       transparent={true}
                                       onSelect={this.onSelect.bind(this)}
                                       defaultText={this.state.value}
                                       style={styleSeclect}
                                       textStyle={{}}
                                       backdropStyle={{backgroundColor: "#00000000"}}
                                       optionListStyle={{backgroundColor: "white"}}
                                   >
                                       {
                                           this.props.arrperson.map((item, key) => (
                                               <Option value={item.name+","+ item.id +","+item.count +","+item.countbegin+","+item.email+","+item.image} key={key}>{item.name + " " +item.count}</Option>
                                           ))
                                       }
                                   </Select>
                               </View>
                           </View>
                           <View style={modal_top}/>
                           <View style={modal_content_textinput}>
                               <TextInput
                                   style={textinput}
                                   onChangeText={(text) => this.setState({text})}
                                   value={this.state.text}
                               />
                           </View>
                       </View>
                       <View style={modal_top}/>
                       <View style={modal_content_ok}>
                           <TouchableOpacity style={modal_tounchable_ok} onPress={() => {
                               this.GotoOK()
                           }}>
                               <Text style={text_ok}>OK</Text>
                           </TouchableOpacity>
                           <Text style={text_width}></Text>
                           <TouchableOpacity style={tounchable_cancel} onPress={() => {
                               this.Cancel()
                           }}>
                               <Text style={text_cancel}>Cancel</Text>
                           </TouchableOpacity>
                       </View>
                   </View>
               </Modal>
           );
       }
}
function mapStateToProps(state){
    return{
        modalVisiblePost:state.modalVisiblePost,
        id:state.id,
        name:state.name,
        count:state.count,
        countbegin:state.countbegin,
        email:state.email,
        image:state.image
    }
}
export default connect(mapStateToProps,PersonAction)(ShowModal);
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    content:{
        flex: 1,
        flexDirection: "row",
        margin: 20
    },
    Gotoitems:{
        flex: 1,
        height: 40,
        backgroundColor: "red",
        borderRadius: 10,
        justifyContent: "center"
    },
    text:{
        textAlign: "center"
    },
    count:{

    },
    modal:{
        flex: 1,
        marginTop: 150,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 150,
        //backgroundColor: "pink",
    },
    modal_content:{
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    modal_text_thanksapp:{
        color: "white",
        fontSize: 20,
        textAlign: "center"
    },
    modal_content_2:{
        flex: 5,
        backgroundColor: "pink"
    },
    modal_content_text:{
        flex: 2,
        flexDirection: "row"
    },
    modal_content_select:{
        flex: 4,
        backgroundColor: "pink"
    },
    styleSeclect:{
        borderWidth: 1,
        borderColor: "green",
        width: "100%"
    },
    modal_top:{
        height: 2,
        backgroundColor: "white"
    },
    modal_content_textinput:{
        flex: 5,
        backgroundColor: "pink",
        margin: 10
    },
    textinput:{
        height: "100%",
        borderColor: 'gray',
        borderWidth: 1
    },
    modal_content_ok:{
        flex: 1,
        backgroundColor: "green",
        flexDirection: "row",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius:20
    },
    modal_tounchable_ok:{
        flex: 1,
        alignSelf: "center"
    },
    text_ok:{
        textAlign: "center",
        fontSize: 20
    },
    text_width:{
        width: 3,
        backgroundColor: "white",
        textAlign: "center"
    },
    tounchable_cancel:{
        flex: 1,
        alignSelf: "center"
    },
    text_cancel:{
        textAlign: "center",
        fontSize: 20
    }
})