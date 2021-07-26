import { LightningElement, api ,wire,track} from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor'
import Id from '@salesforce/user/Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
//import TIMEOUT_FIELD from '@salesforce/schema/User.DQ_Timeout_Value__c';
//import  VALIDATION_FIELD from '@salesforce/schema/User.DQ_Validation_Service__c';
import updateDQValidationStatus from '@salesforce/apex/ContactCreateController.updateDQValidationStatus';
import TIMEOUT_FIELD from '@salesforce/schema/Contact.DQ_Validation_Timeout_Value__c'
import VALIDATION_FIELD from '@salesforce/schema/Contact.DQ_Validation_Service__c'
import { getRecord , getFieldValue } from 'lightning/uiRecordApi';


const FIELDS = [
    TIMEOUT_FIELD,
    VALIDATION_FIELD
];




export default class DqAdmin extends LightningElement {
    
    serviceStatus = true
    dqLabel = "DQ Validation Service:"
    @track timeout = '';
    //timeoutValue = TIMEOUT_FIELD;
    valildationService = VALIDATION_FIELD;
    @api recordId;
    @track contact;
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    /*get timeout(){                
        return getFieldValue(this.contact.data, TIMEOUT_FIELD);        
    }*/
   
    connectedCallback(){
        var DQTimer = window.setTimeout(()=>{
            this.timeout = this.contact.data.fields.DQ_Validation_Timeout_Value__c.value;
            this.serviceStatus = this.contact.data.fields.DQ_Validation_Service__c.value;
        },1000);
    }

    handleServiceStatusChange(event) {
       this.serviceStatus = event.target.checked;                                 
        
       updateDQValidationStatus({ DQValidationServiceStatus : this.serviceStatus, 
        DQValidationTimeout : this.timeout,
        recordId : this.recordId
        })        
        }

    handleTimeoutChange(event) {

       this.timeout = event.target.value;
       updateDQValidationStatus({ DQValidationServiceStatus : this.serviceStatus, 
        DQValidationTimeout : this.timeout,
        recordId : this.recordId
        })                
    }

    
}