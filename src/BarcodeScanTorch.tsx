import { Component, createElement } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Vibration } from "react-native";
import { RNCamera } from "react-native-camera";
import { ValueStatus } from "mendix";
import { Style } from "./utils/common";

export interface BarcodeScanTorchStyle extends Style {
};

import { BarcodeScanTorchProps } from "../typings/BarcodeScanTorchProps";

export type Props = BarcodeScanTorchProps<BarcodeScanTorchStyle>;

interface State {
    torchON?: boolean;
    autoDetect?: boolean;
    textboxValue?: string;
}

export class BarcodeScanTorch extends Component<Props, State> {
    onBarCodeReadHandler = this.onBarCodeRead.bind(this);
    manualBarcodeHandler = this.manualBarcode.bind(this);
    constructor(props: Props){
        super(props)
        this.toggleTorch = this.toggleTorch.bind(this)
        this.toggleAutoDetect = this.toggleAutoDetect.bind(this)
        this.state = {
               torchON: false,
               autoDetect: true,
               textboxValue: '',
        }
    }

    toggleTorch(){
        this.setState({torchON: !this.state.torchON})
    }

    toggleAutoDetect(){
        this.setState({autoDetect: !this.state.autoDetect})
     }

    render(){
        return (
            <View style={localStyle.container}>
                <RNCamera
                    style={localStyle.preview}
                    captureAudio={false}
                    onBarCodeRead={this.onBarCodeReadHandler}
                    flashMode={this.state.torchON ? RNCamera.Constants.FlashMode.torch: RNCamera.Constants.FlashMode.off}
                />
                <View style={localStyle.bottom}>
                    <TouchableOpacity onPress={this.toggleTorch} style={this.state.torchON ? localStyle.switchOn : localStyle.switchOff}>
                        <Text style={this.state.torchON ? localStyle.textOn : localStyle.textOff}>↯ Lamp {this.state.torchON ? "aan" : "uit"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toggleAutoDetect} style={this.state.autoDetect ? localStyle.switchOn : localStyle.switchOff}>
                        <Text style={this.state.autoDetect ? localStyle.textOn : localStyle.textOff}>║█║ Detectie {this.state.autoDetect ? "aan" : "uit"}</Text>
                    </TouchableOpacity>
                {this.state.autoDetect ? <View></View> : 
                <View style={localStyle.textBox}>
                    <Text style={localStyle.textBarcode}>Barcode: </Text>
                    <TextInput style={localStyle.textInput} placeholder="Scan of vul handmatig" value={this.state.textboxValue} onChangeText={(text) => this.setState({textboxValue: text})}/>
                    <TouchableOpacity onPress={this.manualBarcodeHandler} style={localStyle.switchOn}>
                        <Text style={localStyle.textOn}>Naar machine</Text>
                    </TouchableOpacity>
                </View>
                }
                </View>
            </View>      
        );
    }
    // Internal button for testing
    //<View style={localStyle.bottom}>
    //<TouchableOpacity onPress={this.toggleTorch} style={localStyle.switch}>
    //<Text style={{ color: 'white', fontSize: 16 }}>Zaklamp {this.state.torchON ? "uit" : "aan"}</Text>
    //</TouchableOpacity>
    //</View>
    //<Image style={localStyle.Image} source={this.state.torchOn ? flashon : flashoff} />
                        

    private onBarCodeRead(event: { data: string }): void {
        if (this.state.autoDetect) {
            if (this.props.barcode.status !== ValueStatus.Available || event.data === this.props.barcode.value) {
                return;
            }

            this.props.barcode.setValue(event.data);

            if (this.props.onDetect && this.props.onDetect.canExecute) {
                Vibration.vibrate(400);
                this.props.onDetect.execute();
            }
        }
        else {
            if (this.state.textboxValue !== event.data) {
                Vibration.vibrate(400);
                this.setState({textboxValue: event.data})
                return;
            }
        }
    }

    private manualBarcode() {
        this.props.barcode.setValue(this.state.textboxValue);
        this.props.onDetect?.execute();
    }
}

const localStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        alignItems: 'center',
    },
    bottom:{
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textBox:{
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textInput:{
        height: 45,
        margin: 5,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#ec7404',
    },
    switchOn: {
        height: 45,
        margin: 5,
        borderRadius: 30,
        backgroundColor: '#ec7404',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
    },
    switchOff: {
        height: 45,
        margin: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ec7404',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
    },
    textOn: {
        color: 'white',
        fontSize: 16,
        margin: 50,
        fontWeight: 'bold',
    },
    textOff: {
        color: '#ec7404',
        fontSize: 16,
        margin: 50,
        fontWeight: 'bold',
    },
    textBarcode: {
        color: '#ec7404',
        fontSize: 16,
        fontWeight: 'bold',
    }
  })