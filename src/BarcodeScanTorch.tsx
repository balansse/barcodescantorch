import { Component, createElement, Fragment } from "react";
import { View, TouchableOpacity, Text, Vibration, ViewStyle, TextStyle } from "react-native";
import { RNCamera } from "react-native-camera";
import { ValueStatus } from "mendix";
import { Style, mergeNativeStyles } from '@mendix/pluggable-widgets-tools';
import { Icon, IconStyle } from "mendix/components/native/Icon";
import { } from 'mendix';

export interface BarcodeScanTorchStyle extends Style {
    container: ViewStyle;
    preview: ViewStyle;
    buttonOverlay: ViewStyle;
    button: ViewStyle;
    buttonOn: ViewStyle;
    buttonOff: ViewStyle;
    textOn: TextStyle;
    textOff: TextStyle;
    barcodeRectangle: ViewStyle;
    barcodeText: TextStyle;
    icon: IconStyle;
};

const defaultStyle: BarcodeScanTorchStyle = {
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        width: '100%'
    },
    buttonOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        height: 60,
        width: 60,
        margin: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOn: {
        backgroundColor: '#de712b',
    },
    buttonOff: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#de712b',
    },
    textOn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textOff: {
        color: '#de712b',
        fontSize: 16,
        fontWeight: 'bold',
    },
    barcodeRectangle: {
        borderWidth: 4,
        borderRadius: 10,
        position: 'absolute',
        borderColor: '#fcba03',
        justifyContent: 'center',
        backgroundColor: 'rgba(252, 186, 3, 0.1)',
        padding: 10,
    },
    barcodeText: {
        color: '#fcba03',
        flex: 1,
        position: 'absolute',
        textAlign: 'center',
        overflow: 'visible',
    },
    icon: {
        size: 20,
        color: 'white'
    }
};

import { BarcodeScanTorchProps } from "../typings/BarcodeScanTorchProps";

import { GoogleVisionBarcodesDetectedEvent, Barcode } from "react-native-camera";

export type Props = BarcodeScanTorchProps<BarcodeScanTorchStyle>;

interface State {
    torchON?: boolean;
    barcodes: Barcode[];
}

export class BarcodeScanTorch extends Component<Props, State> {

    camera: RNCamera | null;

    onSingleBarCodeReadHandler = this.onSingleBarCodeRead.bind(this);
    onBarCodeDetectHandler = this.onBarCodeDetect.bind(this);

    constructor(props: Props){
        super(props)
        this.toggleTorch = this.toggleTorch.bind(this);
        this.camera = null;
        this.state = {
               torchON: false,
               barcodes: []
        }
    }

    private readonly styles = mergeNativeStyles(defaultStyle, this.props.style);

    toggleTorch(){
        this.setState({torchON: !this.state.torchON});
    }

    render(){

        return (
            <View style={this.styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={this.styles.preview}
                    captureAudio={false}
                    flashMode={this.state.torchON ? RNCamera.Constants.FlashMode.torch: RNCamera.Constants.FlashMode.off}
                    onBarCodeRead={this.onSingleBarCodeReadHandler}
                    onGoogleVisionBarcodesDetected={this.onBarCodeDetectHandler}
                >
                    {this.renderBarcodes()}
                    <View style={this.styles.buttonOverlay}>
                        <TouchableOpacity onPress={this.toggleTorch} style={[this.styles.button, this.state.torchON ? this.styles.buttonOff : this.styles.buttonOn]}>
                            <Icon
                                icon={{ type: "glyph", iconClass: "glyphicon-flash" }}
                                size={20}
                                color={this.state.torchON ? this.styles.textOff.color : this.styles.textOn.color}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={this.takePicture.bind(this)} style={this.styles.switchOn}>
                            <Text style={this.styles.textOn}>Take a photo</Text>
                        </TouchableOpacity> */}
                    </View>
                </RNCamera>
            </View>      
        );
    }
                       
    private onSingleBarCodeRead(event: { data: string }): void {
        if (this.props.multipleBarcode) { 
            return;
        }

        //Do not trigger multiple times for the same value in single barcode mode
        if (event.data !== this.props.barcode.value) {
            this.onBarCodeSelect(event);
        }
    }

    private onBarCodeSelect(event: { data: string }): void {
        if (this.props.barcode.status !== ValueStatus.Available) {
            return;
        }

        this.props.barcode.setValue(event.data);

        if (this.props.onDetect && this.props.onDetect.canExecute) {
            Vibration.vibrate(400);
            this.props.onDetect.execute();
        }
    }

    private onBarCodeDetect(data: GoogleVisionBarcodesDetectedEvent): void {
        this.setState({ barcodes: data.barcodes.filter(barcode => barcode.type.toString() !== 'UNKNOWN_FORMAT') });
    }

    renderBarcodes = () => (
        <View>
            {this.state.barcodes.map(this.renderBarcode)}
        </View>
      );

    renderBarcode = (barcode: Barcode) => (
    <Fragment key={barcode.data + barcode.bounds.origin.x}>
        <View>
        <TouchableOpacity onPress={this.onBarCodeSelect.bind(this, barcode)} style={[
            this.styles.barcodeRectangle,
            {
                ...barcode.bounds.size,
                left: barcode.bounds.origin.x,
                top: barcode.bounds.origin.y,
            }]}>
            {!this.props.showScannedValue ? <View/> :
                <Text style={this.styles.barcodeText}>{barcode.data}</Text>
            }
        </TouchableOpacity>
        </View>
    </Fragment>
    );

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };
}