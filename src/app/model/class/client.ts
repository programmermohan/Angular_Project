export class Client {
    clientId: number;
    contactPersonName: string;
    companyName: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    employeeStrength: number;
    gstNo: string;
    contactNo: string;
    regNo: string;

    constructor() {
        this.clientId = 0;
        this.employeeStrength = 0;
        this.companyName = '';
        this.contactNo = '';
        this.gstNo = '';
        this.regNo = '';
        this.state = '';
        this.city = '';
        this.pincode = '';
        this.contactPersonName = '';
        this.address = '';
    }
}