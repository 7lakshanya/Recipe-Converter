var text=[];
var qty=[];

var temp;

function submitRecipe(){
  var recipe="";
  var number=document.getElementById("number").value;
  recipe=document.getElementById("recipe").value;
  recipe=recipe.replace(/(\r\n|\n|\r)/gm," ");
  
  recipe=recipe.split("teaspoon").join("tsp");
  recipe=recipe.split("teaspoons").join("tsp");
  recipe=recipe.split("tsps").join("tsp");
  recipe=recipe.split("tablespoon").join("tbsp");
  recipe=recipe.split("tablespoons").join("tbsp");
  recipe=recipe.split("tbsps").join("tbsp");


  number=>Number(number);
  var arr=recipe.split(" ");

  for(var i=0;i<arr.length;i++){
    if((/[1-9][0-9]*\/[1-9][0-9]*/g).test(arr[i])){
      if(/^[-+]?\d*\.?\d*$/.test(arr[i-1])){
          arr[i]=Number(fractionToDecimal(arr[i]))+Number(arr[i-1]);
          arr[i]=arr[i].toString()
          arr[i-1]="";
      }else{
        arr[i]=fractionToDecimal(arr[i]);
      }
    }
  }
  arr=arr.filter(el=>el!=="");
  digits=divideQuantity(arr,number);
  newRecipe=displayRecipe(arr,digits);
  //CODE FOR NEW LINE
  var frecipe='';
  for(var i=0;i<newRecipe.length;i++){
    if((newRecipe[i]===" ") && (/^[-+]?\d*\.?\d*$/.test(newRecipe[i+1]))){
        frecipe=frecipe +'\n'+ newRecipe[i];
    }else{
        frecipe=frecipe+newRecipe[i];
    }
}
  newRecipe=cupsFitUp(frecipe);
  newRecipe=newRecipe.join(" ");

  document.getElementById("resultval").value=newRecipe;
}

function fractionToDecimal(str){
  var fraction=str.split("");
  fraction=fraction[0]/fraction[2];
  return(fraction.toString());
}

function divideQuantity(arr,number){
  var digits=arr.filter(l=>l.match(/^[-+]?\d*\.?\d*$/));
  for(var k=0;k<digits.length;k++){
      digits[k]=digits[k]/number;
      digits[k]=Math.round((digits[k] + Number.EPSILON) * 100) / 100
  }
  return(digits);
}

function displayRecipe(arr,digits){
  words=arr.map(el=>el.match(/[a-zA-Z]/g));
  for(var l=0;l<words.length;l++){
    if(words[l]!==null){
      words[l]=words[l].join("");
    }
  }
  var counter=0;
  for(var a=0;a<words.length;a++){
      if(words[a]===null){
        words[a]=digits[counter];
        counter++;
    }
  }
  return(words.join(" "));
}

function cupsFitUp(recipe){
  var final="";
  arr= recipe.split(" ");
  var cups=[];
  for(var i =0;i<arr.length;i++){
    if(arr[i].includes("cup")||arr[i]==="tsp"||arr[i]==="tbsp"){
    cups.push(arr[i-1]);
    arr[i-1]=null;
    }
  }

  var nvalues=[];

  for(var j=0;j<cups.length;j++){
    var measure=cups[j];
    var frac=decimal2Fraction(measure);
    final=frac;
    nvalues.push(final);
  }

  var p=0;
  var temp=arr.length;
  for(var q=0;q<temp;q++){
    if(arr[q]==null){
      arr[q]=nvalues[p];
      p++;
    }
  }
  return(arr);
}

function decimal2Fraction(e) {
    var n, i, r, c;
    return c = Math.floor(e),
    i = e % 1,
    i > 0 && 1 > i ? (.1875 > i && (r = "1/8"),
    i >= .1875 && .292 > i && (r = "1/4"),
    i >= .292 && .417 > i && (r = "1/3"),
    i >= .417 && .583 > i && (r = "1/2"),
    i >= .583 && .708 > i && (r = "2/3"),
    i >= .708 && .875 > i && (r = "3/4"),
    i >= .875 && (r = "",
    c += 1),
    n = 0 == c ? r : 0 != c && "" == r ? c : c + " " + r) : n = e,
    n
}
