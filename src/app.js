const Base_url=" https://open.er-api.com/v6/latest";

const dropdowns= document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msgtext")

// --- all the country code and the curr code---//
const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
  };


// --- this will handle the dropdown---//
for(let select of dropdowns){

  // Iterate over the keys of the countryList object.
    for (let currCode of Object.keys(countryList)) {
         // Create a new option element for the dropdown.
         let newOption = document.createElement("option");
         newOption.innerText= currCode;
         newOption.value= currCode;
         // Append the new option to the dropdown
         select.append(newOption);
      }
      select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
      })
}
//---  update the flag according to the name  ---//
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc='https://flagsapi.com/'+countryCode+'/shiny/64.png';
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}




//--- MAIN PART OF THE CODE ---//
const updateExchange=async()=>{
  let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==""||amtVal<1){
        amtVal=1;
        amount.value="1";
    };
    const URL= Base_url+'/'+fromcurr.value;
    //i have put this whole code in the try...catch to see if someting wrong or not.
    try{
    let response=await fetch(URL)
  //    if (!response.ok) {
  //     throw new Error('Network response was not ok');
  // }else{console.log("thik h kuch or garbar h")}
     

    let data=await response.json(); // it will provide the json data all  the data
    //console.log(data.rates.INR);

    let rate=Object.fromEntries(
      Object.entries(data.rates).filter(([key,value]) => key==tocurr.value)
    );// in this part of the code we have FILTER THE DATA. in this case we need the rates from the data and give a condition that key has to equal to the tocurr.value and then stored in the rate. 
    console.log(tocurr.value)

    let exchangeValue=Math.floor(Object.values(rate)) // in htis code only the value of object and hen converted it to floor value and stored it into he exchangeValue
    let finalAmount=amtVal*exchangeValue;// this will give us the amount we need
    msg.innerText= amtVal + ' ' + fromcurr.value + ' = ' + finalAmount + ' ' + tocurr.value;
    }catch (error){
      console.log("kuch to garbar h",error);
    }
}



btn.addEventListener("click" ,(evt)=>{
    evt.preventDefault();
    updateExchange();
    
});//this will put a eventlistener to the btn when click

