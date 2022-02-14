import { LightningElement, track, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import OPP_OBJECT from '@salesforce/schema/Opportunity';

export default class DemoRichTextCustomButtons extends LightningElement {

    @api recordId;

    @track showSignature = false;
    @track richTextValue;

    @track userName; 
    @track userEmail;
    @track userTitle;

    @track showFieldSelectionDialg = false;;

    fieldOptions;

    @wire(getObjectInfo, { objectApiName: OPP_OBJECT })
    oppObjectInfo({data, error}){
        if(data){
            this.fieldOptions = [];

            for(let fieldItem in data.fields){
                this.fieldOptions.push({
                    label: data.fields[fieldItem].label, 
                    value: data.fields[fieldItem].apiName
                });
            }

            this.fieldOptions.sort(this.compareFieldOption); 
        }
    }

    contentAddedHandler(event){
        this.richTextValue = event.detail.value;
    }

    addMergeField(){
        this.showFieldSelectionDialg = true;
    }
    
    closeSelectFieldPopup(){
        this.showFieldSelectionDialg = false;
    }

    fieldSelecetedHandler(event){
        const elemItem = this.template.querySelector('lightning-input-rich-text');
        elemItem.setRangeText('{!' + event.currentTarget.dataset.field  + '}', undefined, undefined, 'end');
        this.showFieldSelectionDialg = false;
    }

    compareFieldOption(a,b) {
        return a.label < b.label ? -1 : 1;
    }
}