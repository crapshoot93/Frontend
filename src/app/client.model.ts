//import {System} from './client1model'

//export class Client {
    //name: string;
    //systems: System[];
  //  system_id: number;
    //system_name: string;
//    system_public_name: string;
  //  status: string;
   // timezone: string;
  //  country: string;
 //   state: any;
   // city: string;
  //  postal_code: string;
   // connection_type: string;
//}


    export class Meta {
        status: string;
        last_report_at: number;
        last_energy_at: number;
        operational_at: number;
    }

    export class System {
        system_id: number;
        system_name: string;
        system_public_name: string;
        status: string;
        timezone: string;
        country: string;
        state: any;
        city: string;
        postal_code: string;
        connection_type: string;
        meta: Meta;
    }

    export class Client {
        systems: System[];
    }
    export class datess {
        start_date: string;
        production:[];
    }
