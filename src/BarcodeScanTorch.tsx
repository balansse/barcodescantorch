import { Component, createElement } from "react";
import { View, TouchableOpacity, Text, TextInput, Vibration, ViewStyle, TextStyle } from "react-native";
import { RNCamera } from "react-native-camera";
import { ValueStatus } from "mendix";
import { Style, mergeNativeStyles } from '@mendix/pluggable-widgets-tools';
import { } from 'mendix';

export interface BarcodeScanTorchStyle extends Style {
    container: ViewStyle;
    preview: ViewStyle;
    bottom: ViewStyle;
    textBox: ViewStyle;
    textInput: TextStyle;
    switchOn: ViewStyle;
    switchOff: ViewStyle;
    textOn: TextStyle;
    textOff: TextStyle;
    textBarcode: TextStyle;

};

const defaultStyle: BarcodeScanTorchStyle = {
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        alignItems: 'center',
    },
    bottom: {
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textBox: {
        backgroundColor: 'white',
        alignItems: 'center',
    },
    textInput: {
        height: 45,
        margin: 5,
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: '#de712b',
    },
    switchOn: {
        height: 45,
        margin: 5,
        borderRadius: 30,
        backgroundColor: '#de712b',
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
        borderColor: '#de712b',
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
        color: '#de712b',
        fontSize: 16,
        margin: 50,
        fontWeight: 'bold',
    },
    textBarcode: {
        color: '#de712b',
        fontSize: 16,
        fontWeight: 'bold',
    }
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

    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    toggleTorch(){
        this.setState({torchON: !this.state.torchON})
    }

    toggleAutoDetect(){
        this.setState({autoDetect: !this.state.autoDetect})
     }

    render(){
        return (
            <View style={this.styles.container}>
                <RNCamera
                    style={this.styles.preview}
                    captureAudio={false}
                    onBarCodeRead={this.onBarCodeReadHandler}
                    flashMode={this.state.torchON ? RNCamera.Constants.FlashMode.torch: RNCamera.Constants.FlashMode.off}
                />
                <View style={this.styles.bottom}>
                    <TouchableOpacity onPress={this.toggleTorch} style={this.state.torchON ? this.styles.switchOff : this.styles.switchOn}>
                        <Text style={this.state.torchON ? this.styles.textOff : this.styles.textOn}>↯ Lamp {this.state.torchON ? "uit" : "aan"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.toggleAutoDetect} style={this.state.autoDetect ? this.styles.switchOn : this.styles.switchOff}>
                        <Text style={this.state.autoDetect ? this.styles.textOn : this.styles.textOff}>║█║ Detectie {this.state.autoDetect ? "aan" : "uit"}</Text>
                    </TouchableOpacity>
                {this.state.autoDetect ? <View></View> : 
                <View style={this.styles.textBox}>
                    <Text style={this.styles.textBarcode}>Barcode: </Text>
                    <TextInput style={this.styles.textInput} placeholder="Scan of vul handmatig" value={this.state.textboxValue} onChangeText={(text) => this.setState({textboxValue: text})}/>
                    <TouchableOpacity onPress={this.manualBarcodeHandler} style={this.styles.switchOn}>
                        <Text style={this.styles.textOn}>Naar machine</Text>
                    </TouchableOpacity>
                </View>
                }
                </View>
            </View>      
        );
    }
    // Internal button for testing
    //<View style={this.styles.bottom}>
    //<TouchableOpacity onPress={this.toggleTorch} style={this.styles.switch}>
    //<Text style={{ color: 'white', fontSize: 16 }}>Zaklamp {this.state.torchON ? "uit" : "aan"}</Text>
    //</TouchableOpacity>
    //</View>
    //<Image style={this.styles.Image} source={this.state.torchOn ? flashon : flashoff} />
                        

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