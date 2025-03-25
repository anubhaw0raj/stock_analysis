"use strict";(self.webpackChunkstock_analysis=self.webpackChunkstock_analysis||[]).push([[786],{3786:(C,d,r)=>{r.r(d),r.d(d,{DatepriceModule:()=>A});var l=r(6895),n=r(433),o=r(5536),_=r(1334),p=r(7834),h=r(7614),t=r(1571),u=r(529);function m(e,c){if(1&e&&(t.TgZ(0,"option",9),t._uU(1),t.qZA()),2&e){const a=c.$implicit;t.s9C("value",a),t.xp6(1),t.Oqu(a)}}function f(e,c){if(1&e){const a=t.EpF();t.TgZ(0,"c-row")(1,"c-col",1)(2,"c-card",2)(3,"c-card-header",3),t._uU(4,"Enter Inputs"),t.qZA(),t.TgZ(5,"c-card-header"),t._uU(6,"Get Close Prices Of 10 popular stocks for a certain date."),t.qZA(),t.TgZ(7,"c-card-header"),t._uU(8,"Available Dates: In the Dropdown Below"),t.qZA(),t.TgZ(9,"c-card-body")(10,"div"),t._uU(11),t.qZA(),t._UZ(12,"br"),t.TgZ(13,"form",4)(14,"div",5)(15,"select",6),t.YNc(16,m,2,2,"option",7),t.qZA()(),t.TgZ(17,"div",5)(18,"button",8),t.NdJ("click",function(){t.CHM(a);const i=t.oxw();return t.KtG(i.formSubmit())}),t._uU(19,"Get Results"),t.qZA()()()()()()()}if(2&e){const a=t.oxw();t.xp6(11),t.hij(" List Of Stocks: ",a.default_stocks.join(", ")," "),t.xp6(4),t.Q6J("formControl",a.date),t.xp6(1),t.Q6J("ngForOf",a.dates)}}function g(e,c){if(1&e&&(t.TgZ(0,"tr")(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.qZA(),t.TgZ(5,"td"),t._uU(6),t.qZA()()),2&e){const a=c.$implicit;t.xp6(2),t.Oqu(a.symbol),t.xp6(2),t.Oqu(a.date),t.xp6(2),t.Oqu(a.close)}}function D(e,c){1&e&&(t.TgZ(0,"c-card-header",3),t._uU(1,"Chart"),t.qZA())}function Z(e,c){if(1&e&&(t.TgZ(0,"c-card-body"),t._UZ(1,"c-chart",15),t.qZA()),2&e){const a=t.oxw(2);t.xp6(1),t.Q6J("data",a.chartLineData)}}function b(e,c){if(1&e){const a=t.EpF();t.TgZ(0,"c-row")(1,"c-col",1)(2,"c-card",2)(3,"c-card-header",3),t._uU(4,"Stocks Analysis"),t.qZA(),t.TgZ(5,"c-card-header")(6,"b"),t._uU(7),t.qZA()(),t.TgZ(8,"c-card-body")(9,"table",10)(10,"thead")(11,"tr")(12,"th",11),t._uU(13,"SYMBOL"),t.qZA(),t.TgZ(14,"th",11),t._uU(15,"DATE"),t.qZA(),t.TgZ(16,"th",11),t._uU(17,"CLOSE PRICE"),t.qZA()()(),t.TgZ(18,"tbody"),t.YNc(19,g,7,3,"tr",12),t.qZA()()(),t.YNc(20,D,2,0,"c-card-header",13),t.YNc(21,Z,2,1,"c-card-body",0),t.TgZ(22,"c-card-header")(23,"button",14),t.NdJ("click",function(){t.CHM(a);const i=t.oxw();return t.KtG(i.resetData())}),t._uU(24," Enter Another Data "),t.qZA()()()()()}if(2&e){const a=t.oxw();t.xp6(7),t.hij("Top 10 Stocks, Date: ",a.date_data,""),t.xp6(12),t.Q6J("ngForOf",a.stcks),t.xp6(1),t.Q6J("ngIf",a.chartData),t.xp6(1),t.Q6J("ngIf",a.chartData)}}const T=[{path:"",component:(()=>{class e{constructor(a){this.http=a,this.dates=[],this.stcks=[],this.date=new n.NI(""),this.default_stocks=[],this.not_data_sent=!0,this.data_sent=!1,this.chartLineData={labels:[],datasets:[{label:"",backgroundColor:"rgba(220, 220, 220, 0.2)",borderColor:"rgba(100, 100, 100, 1)",pointBackgroundColor:"rgba(220, 220, 220, 1)",pointBorderColor:"rgba(150, 150, 150, 1)",data:Array()}]},this.chartLineOptions={maintainAspectRatio:!1},this.chartData=!1}ngOnInit(){this.getPopularStocks(),this.getDates()}getPopularStocks(){this.http.get("http://localhost:3000/stocks/popular").subscribe(a=>{let s=a.map(i=>i.symbol);this.default_stocks=s,this.chartLineData.labels=[...s]})}getDates(){this.http.get("http://localhost:3000/stocks/dates").subscribe(a=>{this.dates=a.map(s=>s.date.split(" ")[0]),this.dates.sort()})}formSubmit(){this.date_data=this.date.value,this.http.get(`http://localhost:3000/stocks/${this.default_stocks}/${this.date.value}`).subscribe(a=>{console.log(a),this.stcks=a.map(s=>({...s,date:s.date.split(" ")[0]})),this.date.reset(),this.chartLineData.datasets[0].data=this.stcks.map(s=>s.close),this.chartLineData.datasets[0].label=this.date_data,this.chartData=!0}),this.not_data_sent=!1,this.data_sent=!0}resetData(){this.date.reset(),this.not_data_sent=!0,this.data_sent=!1,this.chartData=!1,this.stcks=[],this.chartLineData.datasets[0].data=Array(),this.chartLineData.datasets[0].label=""}}return e.\u0275fac=function(a){return new(a||e)(t.Y36(u.eN))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-dateprice"]],decls:2,vars:2,consts:[[4,"ngIf"],["xs",""],[1,"mb-4"],[1,"h4"],["action",""],[1,"mb-3"],[1,"form-select",3,"formControl"],[3,"value",4,"ngFor","ngForOf"],["type","submit",1,"btn","btn-primary","mb-3",3,"click"],[3,"value"],[1,"table","table-striped"],["scope","col"],[4,"ngFor","ngForOf"],["class","h4",4,"ngIf"],["cButton","",1,"primary",3,"click"],["type","line",3,"data"]],template:function(a,s){1&a&&(t.YNc(0,f,20,3,"c-row",0),t.YNc(1,b,25,4,"c-row",0)),2&a&&(t.Q6J("ngIf",s.not_data_sent),t.xp6(1),t.Q6J("ngIf",s.data_sent))},dependencies:[o.AkF,o.yue,o.nkx,l.sg,l.O5,o.iok,o.Yp0,n._Y,n.YN,n.Kr,n.EJ,n.JJ,n.JL,n.oH,o.Hq3,p.d]}),e})(),data:{title:$localize`DatePrice`}}];let k=(()=>{class e{}return e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[h.Bz.forChild(T),h.Bz]}),e})(),A=(()=>{class e{}return e.\u0275fac=function(a){return new(a||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[k,o.dTQ,o.dGk,_.QX,o.P4_,l.ez,o.zE6,o.qek,n.UX,o.hJ1,o.ejP,o.hJ1,o.ga2,p.N,o.FxY,o.U$I,u.JF]}),e})()}}]);