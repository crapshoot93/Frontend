import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
//import {HttpParams} from  "@angular/common/http";
import{HttpService} from './http.service';
import {Client,System, datess} from './client.model';
import{postClient, postClient2, postClient3} from './post.model'
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
//import { from } from 'rxjs';
//import {DatePipe} from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';
import * as htmlDocx from 'html-docx-js/dist/html-docx';
import { ChartsModule, Label } from 'ng2-charts/ng2-charts';
import { saveAs } from 'file-saver';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as moment from 'moment/moment';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
 //private apiUrl = 'https://address-book-demo.herokuapp.com/api/contacts';
  name = 'Angular 6';
  //htmlContent = '';
 //data:any={};

//----------------------------------------------


url = '';
anchoo(){
  var myImg = document.getElementById('meh') as HTMLImageElement;
        this.mx = myImg.width;
        this.my = myImg.height;
        this.mk=this.my/this.mx;
        this.a=true;
}
onSelectFile(event) {

  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
this.a=false;
    //this.m=event.nativeElement.offsetWidth;
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = (event.target as HTMLInputElement).result; //this.url = event.target.result;
    }
  }
}
//  <img [src]="url" height="200"> <br/>
//  <input type='file' (change)="onSelectFile($event)">
//  <button type="button" (click)="m=m+50;">   +   </button>
//  <p>{{m}}</p>

mx:number=500;
my:number=500;
mk:number;


  m:number=50;
//----------------------------------------------


//<img class="logo" src="assets/logo.png" width="15%" height="15%" >
clients$: Client;
cliente: System;
datesss:datess;
postCliente: postClient;
postCliente2: postClient2;
postCliente3: postClient3;

constructor(private httpService: HttpService, private  sanitizer:DomSanitizer){}
ngOnInit(){
  return this.httpService.getClients()
    .subscribe(data=> this.clients$ = data, error => console.log(error));
    //this.clients$.system_name== this.clients$.system_name.sort();
}
//title = 'app';
  public barChartLabels:Label[] = ["1","2","3","4","5"];
  //barChartData= this.postCliente2.production;
  public barChartData: ChartDataSets[] = [{data:[1, 22, 33, 44, 55], label: 'Energía Producida', backgroundColor: [
    'rgba(44, 130, 201, 1)'
], borderColor:['rgba(44, 130, 201, 1)']}];
  public barChartType:string = 'bar';
  public barChartOptions: ChartOptions = {
    legend:{
      position:'bottom'}, scales:{
        yAxes:[{
          scaleLabel:{
            display:true,
             labelString:'Energía (kWh)'
            }
      }
    ]
  }};
  //public barChartOptions: any = {'backgroundColor': ['rgba(44, 130, 201, 1)']}
  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }

 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);}



transform(imagen){
  return this.sanitizer.bypassSecurityTrustResourceUrl(imagen);
}
imagenprueba:string="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Vista_del_Puerto_de_Victoria_desde_Sky100%2C_Hong_Kong%2C_2013-08-09%2C_DD_11.JPG/1024px-Vista_del_Puerto_de_Victoria_desde_Sky100%2C_Hong_Kong%2C_2013-08-09%2C_DD_11.JPG";



selected(){

  return this.httpService.postClient(this.cliente.system_id)
  .subscribe(data=> this.postCliente=data, error=>console.log(error));

}
//selected2(){
//  return this.httpService.getClients2();
//}

fechaSeleccionada(){
  //this.diaEnd = new Date(this.fechainforme);
//this.diaEnd.setMonth(this.diaEnd.getMonth()+1);


  this.unixtima=(new Date(this.fechainforme).getTime()/1000);
  //alert(this.unixtima);
  ////////////////////////POST//////////////////////////////////////////////
  return this.httpService.postClient2(this.cliente.system_id,this.unixtima.toString())                   //
  .subscribe(data=> this.postCliente2=data, error=>console.log(error));//
  /////////////////////////////////////////////////////////////////////////

}
public MedidorBi(){
  if(this.postCliente2.clientExcelObject.fecha_Medidor_Bidireccional=="N/A"){
    this.medidor1="No se tiene la fecha de instalación.";
  }
  if(this.postCliente2.clientExcelObject.fecha_Medidor_Bidireccional!="N/A"){
    let newDate= new Date(this.postCliente2.clientExcelObject.fecha_Medidor_Bidireccional);

    this.medidor1=String(newDate.getDate())+" de "+this.monthNames[newDate.getMonth()]+" de "+String(newDate.getFullYear())+".";


  }
 }

 public imagenesapng(IDimagen){
  var data = document.getElementById(IDimagen);
  html2canvas(data,{
    scale:0.6
  }).then(canvas => {
    this.imaggenprueba = canvas.toDataURL('image/png')
  });
}

public chartApng(){
  var data = document.getElementById('graficaBarras');
  html2canvas(data,{
    scale:0.6
  }).then(canvas => {
    this.graficaEnPNG = canvas.toDataURL('image/png')
  });
}



public captureScreen()
  {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight+3;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4', true); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight,'','FAST')
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('NSolar.pdf'); // Generated PDF
    });
  }

//------------------------------------------------
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Ingrese el texto...',
    translate: 'no',
    uploadUrl: '', // if needed

    customClasses: [ // optional
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  public Export2Docx(content, titulo=''){

    let htmlDocument='<!DOCTYPE html><html><head><meta charset="utf-8"><tittle></tittle>';
    htmlDocument = htmlDocument + '</head><body>' + document.getElementById(content).innerHTML + '</body></html>';
    const converted = htmlDocx.asBlob(htmlDocument);
    //const converted = htmlDocx.asBlob([htmlDocument], {type: 'application vnd.openxmlformats-officedocument.wordprocessingml.document'});
    titulo = titulo?titulo+'.docx':'document.docx';
    saveAs(converted, titulo);
  }

  public Export2Doc(element, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename?filename+'.doc':'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}
Siguiente(){
  if(this.controlA>0&&this.controlB>0){
  this.diaEnd=new Date(this.postCliente2.endDate);
  this.mostrar=false;
  this.mostrar2=true;
  this.mostrar3=false;
  }
}
cargaratras(){
  window.location.reload()

}
verReporte(){

  if(this.jsonmicro!=""){
    var mesGrafica = moment(this.fechainforme).format('MMM');
    //this.jsonmicro = JSON.stringify(this.jsonmicro);
    this.jsonmicro = this.jsonmicro.replace(/\\n/g, "\\n").replace(/\\'/g, "\\'").replace(/\\"/g, '\\"').replace(/\\&/g, "\\&").replace(/\\r/g, "\\r").replace(/\\t/g, "\\t").replace(/\\b/g, "\\b").replace(/\\f/g, "\\f");
    for (var i = 0; i < this.postCliente2.production.length; i++) {
      if((i+1)==this.postCliente2.mayorGeneration.day){
        this.barChartData[0].backgroundColor[i]= 'rgba(51, 204, 51, 1)';
      }
      if((i+1)==this.postCliente2.minorGeneration.day){
        this.barChartData[0].backgroundColor[i]= 'rgba(255, 51, 0, 1)';
      }
      if((i % 2) == 1){
      this.labelsGraficaBar[i] = mesGrafica+" "+String(i+1);}
      if((i % 2) == 0){
        this.labelsGraficaBar[i] = " ";}

      this.barChartData[0].data[i]= this.postCliente2.production[i]/1000;
      if((i+1)!=this.postCliente2.minorGeneration.day&&(i+1)!=this.postCliente2.mayorGeneration.day){
        this.barChartData[0].backgroundColor[i]= 'rgba(44, 130, 201, 1)';
      }}
    this.barChartLabels = this.labelsGraficaBar;
    //this.barChartData= this.postCliente2.production;
this.mostrar=false;
this.mostrar3=true;
this.mostrar2=false;
  this.p1b1=true;
  this.p2b1=true;
  this.p3b1=true;
  this.p4b1=true;
  return this.httpService.postClient3(this.jsonmicro)
  //.subscribe((data:any) => console.log(data));
  .subscribe(data=> this.postCliente3=data, error=>console.log(error));
 }
}


///////////////////////////////////////////////////////////
//<button href="#" class="w3-btn w3-black" (click)="C_crear()" *ngIf="mostrar_REPORTE">Crear PDF</button>
//////////////////////////////////////////////////////////<img [src]="base64hue">
medidor1:string="";
monthNames:string[] = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];
mostrar:boolean=true;
  labelsGraficaBar:string[]=[" ",""];
  graficaEnPNG:any;
  imaggenprueba:any;
  a:boolean=false;
  mostrar2:boolean=false;
  mostrar3:boolean=false;
  mostrar_REPORTE:boolean=false;
  //clientes:string[]=['Cable onda doleguita','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5','Jesus','Mawro','Mawro2','Mawro3','Mawro4','Mawrosdfgsadfasdfsadfsadfsadfsadfsadfsadf5']
  curDate=new Date();
  fechainforme=new Date();
  fechalimpieza=new Date();
  diaStart=new Date();
  diaEnd=new Date();
  text:string="&nbsp;";
  maximo:number=0;

  minimo:number=0;
  controlA:number=0;
  controlB:number=0;
  controlC:number=0;
  unixtima:number=0;
  base64hue:string="";
  jsonmicro:string="";

  p1par1:string="";
  p1par2:string="";
  p1par3:string="";
  p1par4:string="";
  p1par5:string="";

  p2par1:string="";
  p2par2:string="";
  p2par3:string="";
  p2par4:string="";
  p2par5:string="";

  p3par1:string="";
  p3par2:string="";
  p3par3:string="";
  p3par4:string="";
  p3par5:string="";

  p4par1:string="";
  p4par2:string="";
  p4par3:string="";
  p4par4:string="";
  p4par5:string="";
  p4par6:string="";
  p4par7:string="";
  p4par8:string="";
  p4par9:string="";
  p4par10:string="";



  p1p1:boolean=false;
  p1p1e:boolean=false;
  p1b1:boolean=false;
  p1t1:boolean=false;
  p1t1a:boolean=false;
  p1t1b:boolean=false;
  erro11:string="";

  p1p2:boolean=false;
  p1p2e:boolean=false;
  p1b2:boolean=false;
  p1t2:boolean=false;
  p1t2a:boolean=false;
  p1t2b:boolean=false;
  erro12:string="";

  p1p3:boolean=false;
  p1p3e:boolean=false;
  p1b3:boolean=false;
  p1t3:boolean=false;
  p1t3a:boolean=false;
  p1t3b:boolean=false;
  erro13:string="";

  p1p4:boolean=false;
  p1p4e:boolean=false;
  p1b4:boolean=false;
  p1t4:boolean=false;
  p1t4a:boolean=false;
  p1t4b:boolean=false;
  erro14:string="";

  p1p5:boolean=false;
  p1p5e:boolean=false;
  p1b5:boolean=false;
  p1t5:boolean=false;
  p1t5a:boolean=false;
  p1t5b:boolean=false;
  erro15:string="";

  p2p1:boolean=false;
  p2p1e:boolean=false;
  p2b1:boolean=false;
  p2t1:boolean=false;
  p2t1a:boolean=false;
  p2t1b:boolean=false;
  erro21:string="";

  p2p2:boolean=false;
  p2p2e:boolean=false;
  p2b2:boolean=false;
  p2t2:boolean=false;
  p2t2a:boolean=false;
  p2t2b:boolean=false;
  erro22:string="";

  p2p3:boolean=false;
  p2p3e:boolean=false;
  p2b3:boolean=false;
  p2t3:boolean=false;
  p2t3a:boolean=false;
  p2t3b:boolean=false;
  erro23:string="";

  p2p4:boolean=false;
  p2p4e:boolean=false;
  p2b4:boolean=false;
  p2t4:boolean=false;
  p2t4a:boolean=false;
  p2t4b:boolean=false;
  erro24:string="";

  p2p5:boolean=false;
  p2p5e:boolean=false;
  p2b5:boolean=false;
  p2t5:boolean=false;
  p2t5a:boolean=false;
  p2t5b:boolean=false;
  erro25:string="";


  p3p1:boolean=false;
  p3p1e:boolean=false;
  p3b1:boolean=false;
  p3t1:boolean=false;
  p3t1a:boolean=false;
  p3t1b:boolean=false;
  erro31:string="";

  p3p2:boolean=false;
  p3p2e:boolean=false;
  p3b2:boolean=false;
  p3t2:boolean=false;
  p3t2a:boolean=false;
  p3t2b:boolean=false;
  erro32:string="";

  p3p3:boolean=false;
  p3p3e:boolean=false;
  p3b3:boolean=false;
  p3t3:boolean=false;
  p3t3a:boolean=false;
  p3t3b:boolean=false;
  erro33:string="";

  p3p4:boolean=false;
  p3p4e:boolean=false;
  p3b4:boolean=false;
  p3t4:boolean=false;
  p3t4a:boolean=false;
  p3t4b:boolean=false;
  erro34:string="";

  p3p5:boolean=false;
  p3p5e:boolean=false;
  p3b5:boolean=false;
  p3t5:boolean=false;
  p3t5a:boolean=false;
  p3t5b:boolean=false;
  erro35:string="";



  p4p1:boolean=false;
  p4p1e:boolean=false;
  p4b1:boolean=false;
  p4t1:boolean=false;
  p4t1a:boolean=false;
  p4t1b:boolean=false;
  erro41:string="";

  p4p2:boolean=false;
  p4p2e:boolean=false;
  p4b2:boolean=false;
  p4t2:boolean=false;
  p4t2a:boolean=false;
  p4t2b:boolean=false;
  erro42:string="";

  p4p3:boolean=false;
  p4p3e:boolean=false;
  p4b3:boolean=false;
  p4t3:boolean=false;
  p4t3a:boolean=false;
  p4t3b:boolean=false;
  erro43:string="";

  p4p4:boolean=false;
  p4p4e:boolean=false;
  p4b4:boolean=false;
  p4t4:boolean=false;
  p4t4a:boolean=false;
  p4t4b:boolean=false;
  erro44:string="";

  p4p5:boolean=false;
  p4p5e:boolean=false;
  p4b5:boolean=false;
  p4t5:boolean=false;
  p4t5a:boolean=false;
  p4t5b:boolean=false;
  erro45:string="";

  C_crear(){
    this.captureScreen();
  }
  F_atrascrear(){

    this.mostrar_REPORTE=false;

  }
  F_atras(){
    //this.mostrar_REPORTE=false;
    //this.mostrar=true;
    //this.erro11="";
    //this.p1b2=false;
    this.mostrar3=false;
    this.mostrar2=true;
    //window.location.reload();
  }

  funcionMas1(){
    this.p1b1=false;
    this.p1t1a=true;
    this.p1t1b=true;
    this.p1t1=true;
  }
  funcionAceptar1(){
    if(this.erro11!="" && this.p1par2==""){
    this.p1t1=false;
    this.p1p1=true;
    this.p1par1=this.erro11;
    this.p1p1e=true;
    this.p1b2=true;
    this.p1t1b=false;
    this.p1t1a=false
    }
    if(this.erro11!="" && this.p1par2!=""){
      this.p1t1=false;
      this.p1p1=true;
      this.p1par1=this.erro11;
      this.p1p1e=true;
      this.p1t1b=false;
      this.p1t1a=false
      }
  }
  funcionCancelar1(){

    if(this.p1par1==""){
      this.p1t1=false;
      this.p1b1=true;
      this.p1t1b=false;
      this.p1t1a=false;
      }
    if(this.p1par1!=""){
      this.p1t1=false;
      this.p1p1e=true;
      this.p1t1b=false;
      this.p1t1a=false;
      }
  }

  funcionMas2(){
    this.p1b2=false;
    this.p1t2a=true;
    this.p1t2b=true;
    this.p1t2=true;
  }
  funcionAceptar2(){
    if(this.erro12!="" && this.p1par3==""){
    this.p1t2=false;
    this.p1p2=true;
    this.p1par2=this.erro12;
    this.p1p2e=true;
    this.p1b3=true;
    this.p1t2b=false;
    this.p1t2a=false
    }
    if(this.erro12!="" && this.p1par3!=""){
      this.p1t2=false;
      this.p1p2=true;
      this.p1par2=this.erro12;
      this.p1p2e=true;
      this.p1t2b=false;
      this.p1t2a=false
      }
  }
  funcionCancelar2(){

    if(this.p1par2==""){
      this.p1t2=false;
      this.p1b2=true;
      this.p1t2b=false;
      this.p1t2a=false;
      }
    if(this.p1par2!=""){
      this.p1t2=false;
      this.p1p2e=true;
      this.p1t2b=false;
      this.p1t2a=false;
      }
  }

  funcionMas3(){
    this.p1b3=false;
    this.p1t3a=true;
    this.p1t3b=true;
    this.p1t3=true;
  }
  funcionAceptar3(){
    if(this.erro13!="" && this.p1par4==""){
    this.p1t3=false;
    this.p1p3=true;
    this.p1par3=this.erro13;
    this.p1p3e=true;
    this.p1b4=true;
    this.p1t3b=false;
    this.p1t3a=false
    }
    if(this.erro13!="" && this.p1par4!=""){
      this.p1t3=false;
      this.p1p3=true;
      this.p1par3=this.erro13;
      this.p1p3e=true;
      this.p1t3b=false;
      this.p1t3a=false
      }
  }
  funcionCancelar3(){

    if(this.p1par3==""){
      this.p1t3=false;
      this.p1b3=true;
      this.p1t3b=false;
      this.p1t3a=false;
      }
    if(this.p1par3!=""){
      this.p1t3=false;
      this.p1p3e=true;
      this.p1t3b=false;
      this.p1t3a=false;
      }
  }

  funcionMas4(){
    this.p1b4=false;
    this.p1t4a=true;
    this.p1t4b=true;
    this.p1t4=true;
  }
  funcionAceptar4(){
    if(this.erro14!="" && this.p1par5==""){
    this.p1t4=false;
    this.p1p4=true;
    this.p1par4=this.erro14;
    this.p1p4e=true;
    this.p1b5=true;
    this.p1t4b=false;
    this.p1t4a=false
    }
    if(this.erro14!="" && this.p1par5!=""){
      this.p1t4=false;
      this.p1p4=true;
      this.p1par4=this.erro14;
      this.p1p4e=true;
      this.p1t4b=false;
      this.p1t4a=false
      }
  }
  funcionCancelar4(){

    if(this.p1par4==""){
      this.p1t4=false;
      this.p1b4=true;
      this.p1t4b=false;
      this.p1t4a=false;
      }
    if(this.p1par4!=""){
      this.p1t4=false;
      this.p1p4e=true;
      this.p1t4b=false;
      this.p1t4a=false;
      }
  }

  funcionMas5(){
    this.p1b5=false;
    this.p1t5a=true;
    this.p1t5b=true;
    this.p1t5=true;
  }
  funcionAceptar5(){
    if(this.erro15!=""){
      this.p1t5=false;
      this.p1p5=true;
      this.p1par5=this.erro15;
      this.p1p5e=true;
      this.p1t5b=false;
      this.p1t5a=false
      }
  }
  funcionCancelar5(){

    if(this.p1par5==""){
      this.p1t5=false;
      this.p1b5=true;
      this.p1t5b=false;
      this.p1t5a=false;
      }
    if(this.p1par5!=""){
      this.p1t5=false;
      this.p1p5e=true;
      this.p1t5b=false;
      this.p1t5a=false;
      }
  }


  funcionMas21(){
    this.p2b1=false;
    this.p2t1a=true;
    this.p2t1b=true;
    this.p2t1=true;
  }
  funcionAceptar21(){
    if(this.erro21!="" && this.p2par2==""){
    this.p2t1=false;
    this.p2p1=true;
    this.p2par1=this.erro21;
    this.p2p1e=true;
    this.p2b2=true;
    this.p2t1b=false;
    this.p2t1a=false
    }
    if(this.erro21!="" && this.p2par2!=""){
      this.p2t1=false;
      this.p2p1=true;
      this.p2par1=this.erro21;
      this.p2p1e=true;
      this.p2t1b=false;
      this.p2t1a=false
      }
  }
  funcionCancelar21(){

    if(this.p2par1==""){
      this.p2t1=false;
      this.p2b1=true;
      this.p2t1b=false;
      this.p2t1a=false;
      }
    if(this.p2par1!=""){
      this.p2t1=false;
      this.p2p1e=true;
      this.p2t1b=false;
      this.p2t1a=false;
      }
  }

  funcionMas22(){
    this.p2b2=false;
    this.p2t2a=true;
    this.p2t2b=true;
    this.p2t2=true;
  }
  funcionAceptar22(){
    if(this.erro22!="" && this.p2par3==""){
    this.p2t2=false;
    this.p2p2=true;
    this.p2par2=this.erro22;
    this.p2p2e=true;
    this.p2b3=true;
    this.p2t2b=false;
    this.p2t2a=false
    }
    if(this.erro22!="" && this.p2par3!=""){
      this.p2t2=false;
      this.p2p2=true;
      this.p2par2=this.erro22;
      this.p2p2e=true;
      this.p2t2b=false;
      this.p2t2a=false
      }
  }
  funcionCancelar22(){

    if(this.p2par2==""){
      this.p2t2=false;
      this.p2b2=true;
      this.p2t2b=false;
      this.p2t2a=false;
      }
    if(this.p2par2!=""){
      this.p2t2=false;
      this.p2p2e=true;
      this.p2t2b=false;
      this.p2t2a=false;
      }
  }

  funcionMas23(){
    this.p2b3=false;
    this.p2t3a=true;
    this.p2t3b=true;
    this.p2t3=true;
  }
  funcionAceptar23(){
    if(this.erro23!="" && this.p2par4==""){
    this.p2t3=false;
    this.p2p3=true;
    this.p2par3=this.erro23;
    this.p2p3e=true;
    this.p2b4=true;
    this.p2t3b=false;
    this.p2t3a=false
    }
    if(this.erro23!="" && this.p2par4!=""){
      this.p2t3=false;
      this.p2p3=true;
      this.p2par3=this.erro23;
      this.p2p3e=true;
      this.p2t3b=false;
      this.p2t3a=false
      }
  }
  funcionCancelar23(){

    if(this.p2par3==""){
      this.p2t3=false;
      this.p2b3=true;
      this.p2t3b=false;
      this.p2t3a=false;
      }
    if(this.p2par3!=""){
      this.p2t3=false;
      this.p2p3e=true;
      this.p2t3b=false;
      this.p2t3a=false;
      }
  }

  funcionMas24(){
    this.p2b4=false;
    this.p2t4a=true;
    this.p2t4b=true;
    this.p2t4=true;
  }
  funcionAceptar24(){
    if(this.erro24!="" && this.p2par5==""){
    this.p2t4=false;
    this.p2p4=true;
    this.p2par4=this.erro24;
    this.p2p4e=true;
    this.p2b5=true;
    this.p2t4b=false;
    this.p2t4a=false
    }
    if(this.erro24!="" && this.p2par5!=""){
      this.p2t4=false;
      this.p2p4=true;
      this.p2par4=this.erro24;
      this.p2p4e=true;
      this.p2t4b=false;
      this.p2t4a=false
      }
  }
  funcionCancelar24(){

    if(this.p2par4==""){
      this.p2t4=false;
      this.p2b4=true;
      this.p2t4b=false;
      this.p2t4a=false;
      }
    if(this.p2par4!=""){
      this.p2t4=false;
      this.p2p4e=true;
      this.p2t4b=false;
      this.p2t4a=false;
      }
  }

  funcionMas25(){
    this.p2b5=false;
    this.p2t5a=true;
    this.p2t5b=true;
    this.p2t5=true;
  }
  funcionAceptar25(){
    if(this.erro25!=""){
      this.p2t5=false;
      this.p2p5=true;
      this.p2par5=this.erro25;
      this.p2p5e=true;
      this.p2t5b=false;
      this.p2t5a=false
      }
  }
  funcionCancelar25(){

    if(this.p2par5==""){
      this.p2t5=false;
      this.p2b5=true;
      this.p2t5b=false;
      this.p2t5a=false;
      }
    if(this.p2par5!=""){
      this.p2t5=false;
      this.p2p5e=true;
      this.p2t5b=false;
      this.p2t5a=false;
      }
  }

  funcionMas31(){
    this.p3b1=false;
    this.p3t1a=true;
    this.p3t1b=true;
    this.p3t1=true;
  }
  funcionAceptar31(){
    if(this.erro31!="" && this.p3par2==""){
    this.p3t1=false;
    this.p3p1=true;
    this.p3par1=this.erro31;
    this.p3p1e=true;
    this.p3b2=true;
    this.p3t1b=false;
    this.p3t1a=false
    }
    if(this.erro31!="" && this.p3par2!=""){
      this.p3t1=false;
      this.p3p1=true;
      this.p3par1=this.erro31;
      this.p3p1e=true;
      this.p3t1b=false;
      this.p3t1a=false
      }
  }
  funcionCancelar31(){

    if(this.p3par1==""){
      this.p3t1=false;
      this.p3b1=true;
      this.p3t1b=false;
      this.p3t1a=false;
      }
    if(this.p3par1!=""){
      this.p3t1=false;
      this.p3p1e=true;
      this.p3t1b=false;
      this.p3t1a=false;
      }
  }

  funcionMas32(){
    this.p3b2=false;
    this.p3t2a=true;
    this.p3t2b=true;
    this.p3t2=true;
  }
  funcionAceptar32(){
    if(this.erro32!="" && this.p3par3==""){
    this.p3t2=false;
    this.p3p2=true;
    this.p3par2=this.erro32;
    this.p3p2e=true;
    this.p3b3=true;
    this.p3t2b=false;
    this.p3t2a=false
    }
    if(this.erro32!="" && this.p3par3!=""){
      this.p3t2=false;
      this.p3p2=true;
      this.p3par2=this.erro32;
      this.p3p2e=true;
      this.p3t2b=false;
      this.p3t2a=false
      }
  }
  funcionCancelar32(){

    if(this.p3par2==""){
      this.p3t2=false;
      this.p3b2=true;
      this.p3t2b=false;
      this.p3t2a=false;
      }
    if(this.p3par2!=""){
      this.p3t2=false;
      this.p3p2e=true;
      this.p3t2b=false;
      this.p3t2a=false;
      }
  }

  funcionMas33(){
    this.p3b3=false;
    this.p3t3a=true;
    this.p3t3b=true;
    this.p3t3=true;
  }
  funcionAceptar33(){
    if(this.erro33!="" && this.p3par4==""){
    this.p3t3=false;
    this.p3p3=true;
    this.p3par3=this.erro33;
    this.p3p3e=true;
    this.p3b4=true;
    this.p3t3b=false;
    this.p3t3a=false
    }
    if(this.erro33!="" && this.p3par4!=""){
      this.p3t3=false;
      this.p3p3=true;
      this.p3par3=this.erro33;
      this.p3p3e=true;
      this.p3t3b=false;
      this.p3t3a=false
      }
  }
  funcionCancelar33(){

    if(this.p3par3==""){
      this.p3t3=false;
      this.p3b3=true;
      this.p3t3b=false;
      this.p3t3a=false;
      }
    if(this.p3par3!=""){
      this.p3t3=false;
      this.p3p3e=true;
      this.p3t3b=false;
      this.p3t3a=false;
      }
  }

  funcionMas34(){
    this.p3b4=false;
    this.p3t4a=true;
    this.p3t4b=true;
    this.p3t4=true;
  }
  funcionAceptar34(){
    if(this.erro34!="" && this.p3par5==""){
    this.p3t4=false;
    this.p3p4=true;
    this.p3par4=this.erro34;
    this.p3p4e=true;
    this.p3b5=true;
    this.p3t4b=false;
    this.p3t4a=false
    }
    if(this.erro34!="" && this.p3par5!=""){
      this.p3t4=false;
      this.p3p4=true;
      this.p3par4=this.erro34;
      this.p3p4e=true;
      this.p3t4b=false;
      this.p3t4a=false
      }
  }
  funcionCancelar34(){

    if(this.p3par4==""){
      this.p3t4=false;
      this.p3b4=true;
      this.p3t4b=false;
      this.p3t4a=false;
      }
    if(this.p3par4!=""){
      this.p3t4=false;
      this.p3p4e=true;
      this.p3t4b=false;
      this.p3t4a=false;
      }
  }

  funcionMas35(){
    this.p3b5=false;
    this.p3t5a=true;
    this.p3t5b=true;
    this.p3t5=true;
  }
  funcionAceptar35(){
    if(this.erro35!=""){
      this.p3t5=false;
      this.p3p5=true;
      this.p3par5=this.erro35;
      this.p3p5e=true;
      this.p3t5b=false;
      this.p3t5a=false
      }
  }
  funcionCancelar35(){

    if(this.p3par5==""){
      this.p3t5=false;
      this.p3b5=true;
      this.p3t5b=false;
      this.p3t5a=false;
      }
    if(this.p3par5!=""){
      this.p3t5=false;
      this.p3p5e=true;
      this.p3t5b=false;
      this.p3t5a=false;
      }
  }


  funcionMas41(){
    this.p4b1=false;
    this.p4t1a=true;
    this.p4t1b=true;
    this.p4t1=true;
  }
  funcionAceptar41(){
    if(this.erro41!="" && this.p4par2==""){
    this.p4t1=false;
    this.p4p1=true;
    this.p4par1=this.erro41;
    this.p4p1e=true;
    this.p4b2=true;
    this.p4t1b=false;
    this.p4t1a=false
    }
    if(this.erro41!="" && this.p4par2!=""){
      this.p4t1=false;
      this.p4p1=true;
      this.p4par1=this.erro41;
      this.p4p1e=true;
      this.p4t1b=false;
      this.p4t1a=false
      }
  }
  funcionCancelar41(){

    if(this.p4par1==""){
      this.p4t1=false;
      this.p4b1=true;
      this.p4t1b=false;
      this.p4t1a=false;
      }
    if(this.p4par1!=""){
      this.p4t1=false;
      this.p4p1e=true;
      this.p4t1b=false;
      this.p4t1a=false;
      }
  }

  funcionMas42(){
    this.p4b2=false;
    this.p4t2a=true;
    this.p4t2b=true;
    this.p4t2=true;
  }
  funcionAceptar42(){
    if(this.erro42!="" && this.p4par3==""){
    this.p4t2=false;
    this.p4p2=true;
    this.p4par2=this.erro42;
    this.p4p2e=true;
    this.p4b3=true;
    this.p4t2b=false;
    this.p4t2a=false
    }
    if(this.erro42!="" && this.p4par3!=""){
      this.p4t2=false;
      this.p4p2=true;
      this.p4par2=this.erro42;
      this.p4p2e=true;
      this.p4t2b=false;
      this.p4t2a=false
      }
  }
  funcionCancelar42(){

    if(this.p4par2==""){
      this.p4t2=false;
      this.p4b2=true;
      this.p4t2b=false;
      this.p4t2a=false;
      }
    if(this.p4par2!=""){
      this.p4t2=false;
      this.p4p2e=true;
      this.p4t2b=false;
      this.p4t2a=false;
      }
  }


  funcionMas43(){
    this.p4b3=false;
    this.p4t3a=true;
    this.p4t3b=true;
    this.p4t3=true;
  }
  funcionAceptar43(){
    if(this.erro43!="" && this.p4par4==""){
    this.p4t3=false;
    this.p4p3=true;
    this.p4par3=this.erro43;
    this.p4p3e=true;
    this.p4b4=true;
    this.p4t3b=false;
    this.p4t3a=false
    }
    if(this.erro43!="" && this.p4par4!=""){
      this.p4t3=false;
      this.p4p3=true;
      this.p4par3=this.erro43;
      this.p4p3e=true;
      this.p4t3b=false;
      this.p4t3a=false
      }
  }
  funcionCancelar43(){

    if(this.p4par3==""){
      this.p4t3=false;
      this.p4b3=true;
      this.p4t3b=false;
      this.p4t3a=false;
      }
    if(this.p4par3!=""){
      this.p4t3=false;
      this.p4p3e=true;
      this.p4t3b=false;
      this.p4t3a=false;
      }
  }

  funcionMas44(){
    this.p4b4=false;
    this.p4t4a=true;
    this.p4t4b=true;
    this.p4t4=true;
  }
  funcionAceptar44(){
    if(this.erro44!="" && this.p4par5==""){
    this.p4t4=false;
    this.p4p4=true;
    this.p4par4=this.erro44;
    this.p4p4e=true;
    this.p4b5=true;
    this.p4t4b=false;
    this.p4t4a=false
    }
    if(this.erro44!="" && this.p4par5!=""){
      this.p4t4=false;
      this.p4p4=true;
      this.p4par4=this.erro44;
      this.p4p4e=true;
      this.p4t4b=false;
      this.p4t4a=false
      }
  }
  funcionCancelar44(){

    if(this.p4par4==""){
      this.p4t4=false;
      this.p4b4=true;
      this.p4t4b=false;
      this.p4t4a=false;
      }
    if(this.p4par4!=""){
      this.p4t4=false;
      this.p4p4e=true;
      this.p4t4b=false;
      this.p4t4a=false;
      }
  }

  funcionMas45(){
    this.p4b5=false;
    this.p4t5a=true;
    this.p4t5b=true;
    this.p4t5=true;
  }
  funcionAceptar45(){
    if(this.erro45!=""){
      this.p4t5=false;
      this.p4p5=true;
      this.p4par5=this.erro45;
      this.p4p5e=true;
      this.p4t5b=false;
      this.p4t5a=false
      }
  }
  funcionCancelar45(){

    if(this.p4par5==""){
      this.p4t5=false;
      this.p4b5=true;
      this.p4t5b=false;
      this.p4t5a=false;
      }
    if(this.p4par5!=""){
      this.p4t5=false;
      this.p4p5e=true;
      this.p4t5b=false;
      this.p4t5a=false;
      }
  }

base64arbolitos='data:image/jpeg;base64,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'
base64Image='data:image/png;base64,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';


}
