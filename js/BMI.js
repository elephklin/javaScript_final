let bodyDataH = document.querySelector('.bodyData_H');
let bodyDataW = document.querySelector('.bodyData_W');
let resultBMI = document.querySelector('.count');
let recordList = document.querySelector('.bmiList');
let bmiAry = JSON.parse(localStorage.getItem('record')) || [];
let showBmi = document.querySelector('.calculate');

//未計算前先載入 localStorage
updateBmiList(bmiAry);



//BMI 函式計算
function countBMI(h, w) {
   let height = h / 100;
   let bmi = w / (height * height);
   bmi = bmi.toFixed(1);
   return bmi;
}

//BMI 狀態判斷
function judgeBMI(bmiData) {
   let borderColor = '';
   let bmiStatus = '';
   if (bmiData < 18.5) {
      borderColor = '#31BAF9';
      bmiStatus = '過輕';
   } else if (bmiData >= 18.5 && bmiData < 25) {
      borderColor = '#86D73F';
      bmiStatus = '理想';
   } else if (bmiData >= 25 && bmiData < 30) {
      borderColor = '#FF982D';
      bmiStatus = '過重';
   } else if (bmiData >= 30 && bmiData < 35) {
      borderColor = '#FF6C02';
      bmiStatus = '輕度肥胖';
   } else if (bmiData >= 35 && bmiData < 40) {
      borderColor = '#FF6C02';
      bmiStatus = '中度肥胖';
   } else {
      borderColor = '#FF1200';
      bmiStatus = '重度肥胖';
   }
   return [borderColor, bmiStatus];
}

//更新 BMI 紀錄
function updateBmiList(record){
   let str = '';
   for (let i = 0; i < record.length; i++) {
      let recordStr = `
         <li class="bmiItem d-flex justify-content-between bg-white" style="border-left:7px solid ${record[i].bmiColor};">
            <span>${record[i].bmiStr}</span>
            <span>BMI <strong>${record[i].bmi}</strong> </span>
            <span>weight <strong>${record[i].weight}</strong> </span>
            <span>height <strong>${record[i].height}</strong> </span>
            <span>${record[i].today}</span>
            <a href="#" data-index="${i}" class="bmiList_dele">刪除</a>
         </li>
      `
      str = str + recordStr;
   }
   recordList.innerHTML = str;
}


//改變計算 BMI 的按鈕
function btnChange(record){
   let j = bmiAry.length - 1;
   showBmi.innerHTML = `
      <div class="btnStatus" style="color: ${record[j].bmiColor}; border: ${record[j].bmiColor} 3px solid;">
         <p class="my-0 btnStatus_value">${record[j].bmi}</p>
         <p class="my-0 btnStatus_bmi">BMI</p>
         <a href="#" class="btnStatus_icon" style="background-color: ${record[j].bmiColor};">
         </a>
      </div>
      <span class="textResult" style="color: ${record[j].bmiColor};">${record[j].bmiStr}</span>
   `
}



//刪除 BMI 紀錄
function deleList(e){
   e.preventDefault();
   if(e.target.nodeName !== 'A'){return;}
   let indexNum = e.target.dataset.index;
   bmiAry.splice(indexNum,1);
   updateBmiList(bmiAry);
   localStorage.setItem('record',JSON.stringify(bmiAry));
}

//執行 BMI 計算並顯示結果
function answer() {
   let hValue = bodyDataH.value;
   let wValue = bodyDataW.value;

   if(hValue==''||wValue==''){
      alert('請輸入身高或體重');
      return;
   }

   let bmiValue = countBMI(hValue, wValue);
   let [color, status] = judgeBMI(bmiValue);
   //console.log(color, status);
   let date = new Date().getFullYear() + ' 年 ' + (new Date().getMonth() + 1) + ' 月 ' + new Date().getDate() + ' 日 ';
   let bmiRecord = {
      bmiColor: color,
      bmiStr: status,
      bmi: bmiValue,
      weight: wValue,
      height: hValue,
      today: date
   }
   bmiAry.push(bmiRecord);
   //console.log(bmiAry[0].bmiStr);
   updateBmiList(bmiAry);
   localStorage.setItem('record',JSON.stringify(bmiAry));
   btnChange(bmiAry);
}


resultBMI.addEventListener('click', answer, false);
recordList.addEventListener('click', deleList, false);