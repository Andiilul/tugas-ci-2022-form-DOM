let n = 1;
const showToast = (Message,toastStatus) => {
	const toastBox = document.getElementById("toasts");
	const toast = document.createElement("div");
	const toastId = `toast${n}`;
	toast.classList.add(`toast`);
  toast.classList.add(toastStatus);
  var svgLink = './Exclam.svg'
  if (toastStatus === "toastSuccess") {
    // Change the background color of the ::after pseudo-element
    const style = document.createElement("style");
    style.innerHTML = `#${toastId}::after { background-color: green; }`;
    document.head.appendChild(style);
    svgLink='./Check.svg'
  }

	toast.innerHTML = `<div style="display:flex;align-items:center;"><img src="${svgLink}" style="width:30px;">${Message} </div><button class="hideBtn" onclick="hideToast('${toastId}')">×</button>`;
	n = n + 1;
	toast.setAttribute("id", toastId);
	toastBox.appendChild(toast);
	console.log("showToast");

	setTimeout(() => {
		hideToast(toastId);
	}, 5000);
};

const hideToast = (toastId) => {
	const toast = document.getElementById(toastId);
	if (toast) {
		toast.classList.add("hide-toast");
		setTimeout(() => {
			toast.remove();
		}, 400);
	}
};

const handleEmpty = (el, alertid) => {
	const theInput = document.getElementById(el);
	const emptyAl = document.getElementById(alertid);
  theInput.value = theInput.value.trim();
	if (theInput.value.length === 0) {
		emptyAl.textContent = `${alertid} Cannot Be Empty`;
	} else {
		emptyAl.textContent = "";
	}

  
};

const submit=()=>{
  const isName = document.getElementById('InputName');
  const isEmail = document.getElementById('InputEmail');
  const isPass = document.getElementById('InputPass');
  let blankform=[]
  //Check Name
  if(isName.value.trim().length===0){
    console.log("Name Empty")    
    blankform.push('Name')
  }
  //Check Email
  if(isEmail.value.trim().length===0){
    console.log("Email Empty")
    blankform.push('Email')
  }
  if(isPass.value.trim().length===0){
    console.log("Pass Empty")
    blankform.push('Password')
  }
  console.log(blankform.length)
  if(blankform.length!==0){
    showToast(`${blankform.join(', ')} Need to be Filled!!`,'toastError')
  } else{//after all form length is not zero, check if password meet the criteria, more than 8, and must contain upper, and lowercase
    console.log('Password Validation')
    passwordValidation(isPass)
  }
}

const passwordValidation=(pass)=>{
  const isName = document.getElementById('InputName')
  const pvalue =pass.value
  let required=[]
  if(pvalue.length<8){
    showToast('Password Must Contain More Than 8 Characters','toastError')
  }else{
    if(!/[A-Z]/.test(pvalue)){
      console.log("Doesn't Have Upper")
      required.push('Uppercase')
    }
    if(!/[a-z]/.test(pvalue)){
      console.log("Doesn't Have Lower")
      required.push('Lowercase')
    }
    if(!/\d/.test(pvalue)){
      console.log("Doesn't Have Number")
      required.push('Number')
    }

    if(required.length!==0){
      showToast(`Password Must Contain : ${required.join(', ')}!!`,'toastError')
    }else{
      showToast(`Login Success!! Welcome ${isName.value.split(" ")[0]}`,'toastSuccess')
    }
  }
}