/**
 * This file was generated from BarcodeScanTorch.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";

export interface BarcodeScanTorchProps<Style> {
    name: string;
    style: Style[];
    barcode: EditableValue<string>;
    onDetect?: ActionValue;
}

export interface BarcodeScanTorchPreviewProps {
    class: string;
    style: string;
    barcode: string;
    onDetect: {} | null;
}
