export class postClient{
    
        current_power: number;
        energy_lifetime: number;
        energy_today: number;
        last_interval_end_at: number;
        last_report_at: number;
        modules: number;
        operational_at: number;
        size_w: number;
        source: string;
        status: string;
        summary_date: string;
        system_id: number;
    
}
export class postClient2{
        clientExcelObject: ClientExcelObject;
        endDate: string;
        generationComparizon: GenerationComparizon;
        houses: number;
        mayorGeneration: MayorGeneration;
        meta: Meta;
        meter_production: number[];
        metrictsTons: number;
        micro_production: number[];
        minorGeneration: MinorGeneration;
        production: number[];
        start_date: string;
        system_id: number;
        totalGeneracion: number;
        trees: number;
    }
    export class ClientExcelObject {
        cliente: string;
        fecha_Medidor_Bidireccional: string;
        fecha_Operacion_Enphase: string;
        microinversor: string;
        modelo_Panel: string;
        panel: string;
        paneles: number;
        sistema_kW: string;
        user_id: number;
        watts_Panel: number;
    }
    export class GenerationComparizon {
        indicator: string;
        value: string;
    }
    export class MayorGeneration {
        day: number;
        generation: number;
    }
    export class Meta {
        last_energy_at: number;
        last_report_at: number;
        operational_at: number;
        status: string;
    }
    export class MinorGeneration {
        day: number;
        generation: number;
    }
    
export class postClient3{
        //Modelos que se recibe del JSON con sus tipos de datos
        
                maxGeneration: number;
                minGeneration: number;
              
    
}