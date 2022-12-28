let annuit=document.querySelector("#annuit-credit");
let dif=document.querySelector("#diff-credit");

annuit.addEventListener('click',function(){ 
    if(annuit.checked){
        dif.checked=false}});

dif.addEventListener('click',function(){
    if(dif.checked){
        annuit.checked=false;
    }
})

// ОБЩИЕ ПЕРЕМЕННЫЕ ДЛЯ РАСЧЕТА (привязка форм)
let sum=document.querySelector(".credit-sum");
let period=document.querySelector(".credit-term");
let rate=document.querySelector(".percent");
// ПЕРЕМЕННЫЕ ВЫВОДА ЗНАЧЕНИЙ В ПРАВЫЙ БЛОК 
let for_output_sum=document.querySelector(".credit-sum-output");
let for_output_sum_to_pay=document.querySelector(".sum-to-pay-output");
let for_output_overpaying=document.querySelector(".overpaying-output");
let for_output_percent_overpaying=document.querySelector(".percent-overpaying-output");
let for_output_month_payment=document.querySelector(".month-payment-output");
let count_btn=document.querySelector(".to-count");
let table=document.querySelector(".tableOfValues");
let tableShow_btn=document.querySelector(".show-the-table");
let textOfBtn=document.querySelector(".textOfBtn");
let blockForTable=document.querySelector(".table-wrapper");
//  выводы расчетов
      
    function first()
    {
      let amount = 1;
      count_btn.onclick=function()
        {  
            let sumGet=Number(sum.value);
            let periodGet=Number(period.value);
            let rateGet=Number(rate.value);
            let monthRate=+((rateGet/12)/100).toFixed(6);
            let annPayment=+(sumGet*(monthRate+(monthRate/(Math.pow((1+monthRate),periodGet)-1)))).toFixed(2);
            let generalAnnPayment=+(annPayment*periodGet).toFixed(2);
            let difference=+(generalAnnPayment-sumGet).toFixed(2);
            let differenceInPercents=+(((generalAnnPayment-sumGet)/sumGet)*100).toFixed(2);

            for_output_sum.innerHTML=sumGet+"  BYN";
            for_output_sum_to_pay.innerHTML=generalAnnPayment +"  BYN";
            for_output_overpaying.innerHTML=difference +"  BYN";
            for_output_percent_overpaying.innerHTML=differenceInPercents+"  %";
            for_output_month_payment.innerHTML=annPayment +"  BYN";
            let PersentPayment=(generalAnnPayment-sumGet);
            table.innerHTML="<table><tr><th>Дата расчета</th><th>Сумма месячного платежа</th><th>Погашение основного долга</th><th>Платеж по %</th><th>Остаток кредита</th></tr></table>";
            for(let i=0;i<periodGet;i++)
                {
                    table.innerHTML+=`<tr><td>${i+1} месяц</td><td>${annPayment}  BYN</td><td>${((sumGet/periodGet)).toFixed(2)}  BYN</td><td>${(PersentPayment/periodGet).toFixed(2)}  BYN</td><td>${(sumGet-(sumGet/periodGet)*i).toFixed(2)}  BYN</td></tr>`;
                }
                
            table.style.display='none';
            tableShow_btn.onclick=function()
            {
                if(amount%2 == 0)
                {
                       table.style.display='none';
                       amount--;
                       textOfBtn.innerHTML="Показать таблицу платежей";
                       tableShow_btn.style.backgroundColor="#17b817e2";
                }
                else
                {
                       table.style.removeProperty('display');
                       amount++;
                       textOfBtn.innerHTML="СКРЫТЬ";
                       tableShow_btn.style.backgroundColor="#e5240f";

                }
            }
        }
    }
    function second()
    {
        let amount = 1;
        count_btn.onclick=function()
        {
            let sumGet=Number(sum.value);
            let periodGet=Number(period.value);
            let rateGet=Number(rate.value);
            let monthRate=+((rateGet/12)/100).toFixed(6);
            let dif=0;
            let percents;
            let remainSum=sumGet;
            let mainDebt=+(sumGet/periodGet).toFixed(2);
            let mainDebtCopy=+((mainDebt+(remainSum*monthRate)).toFixed(2));
            let generalDifSum=0;
            table.innerHTML="<table><tr><th>Дата расчета</th><th>Сумма месячного платежа</th><th>Погашение основного долга</th><th>Платеж по %</th><th>Остаток кредита</th></tr></table>";
            for(let i=0;i<periodGet;i++)
            {
                percents=+(remainSum*monthRate).toFixed(2);
                remainSum=(remainSum-mainDebt).toFixed(2);
                dif=percents+mainDebt;
                table.innerHTML+=`<tr><td>${i+1} месяц</td><td>${(mainDebt+percents).toFixed(2)}</td><td>${mainDebt.toFixed(2)}</td><td>${percents.toFixed(2)}</td><td>${remainSum}</td></tr>`;
                generalDifSum+=percents+mainDebt;
            }

            table.style.display='none';

            for_output_sum.innerHTML=sumGet;
            for_output_sum_to_pay.innerHTML=(generalDifSum).toFixed(2);
            for_output_overpaying.innerHTML=(generalDifSum-sumGet).toFixed(2);
            for_output_percent_overpaying.innerHTML=+(((generalDifSum-sumGet)/sumGet)*100).toFixed(2)+" %";
            for_output_month_payment.innerHTML=mainDebtCopy.toFixed(2)+" -> "+(mainDebt+percents).toFixed(2);
                
            tableShow_btn.onclick=function()
            {
                if(amount%2 == 0)
                  {
                     
                   table.style.display='none';
                   amount--;
                   textOfBtn.innerHTML="Показать таблицу платежей";
                   tableShow_btn.style.backgroundColor="#17b817e2";
                  
                  }
               else{
                   table.style.removeProperty('display');
                   amount++;
                   textOfBtn.innerHTML="СКРЫТЬ";
                   tableShow_btn.style.backgroundColor="#e5240f";
                   table.style.transition="3s";
                   }
            }
        }  
    }    
    count_btn.onclick=function()
    {
        if(annuit.checked==false&&dif.checked==false)
        {
            alert("Выберите метод расчета!");
        }
    }
    annuit.onchange=function()
    {
        first();
    }
    dif.onchange=function()
    {
        second();
    }
    
     
   

  
 

    










