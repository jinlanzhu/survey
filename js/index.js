







/**
 * 显示
 */
function showNumber() {
  var tbody = document.getElementsByTagName('tbody')[0];
  tbody.className = "";
}
/**
 * 显示
 */
function showRadio() {
  var tbody = document.getElementsByTagName('tbody')[1];
  tbody.className = "";
}

/**
 * 显示
 */
function showCheckbox() {
  var tbody = document.getElementsByTagName('tbody')[2];
  tbody.className = "";
}

/**
 * 隐藏所有的tbody
 */
function hideAll() {
  var hideArr = document.querySelectorAll('tbody');
  for(var i = 0; i < hideArr.length; i++) {
    hideArr[i].classList.add('hide');
  }
}

/**
 * 选择问题的类型
 */
function selectType() {
  var questionType = document.querySelector("#question-type").value;
  hideAll();
  console.log(questionType);
  if(questionType === 'number') {
    showNumber();
  }
  if(questionType === 'radio') {
    showRadio();
  }
  if (questionType === 'checkbox') {
    showCheckbox();
  }
}

/**
 * 新增问题按钮
 */
function addQuestion() {

  // 问题类型
  var questionType = document.querySelector("#question-type").value;
  // 存放内容的框框
  var questionList = document.querySelector("#panel");
  // 存放内容的框框的外层div
  var listDiv = document.createElement("div");
  listDiv.setAttribute("class", "question-list-box");
  // 获取题目的内容
  var questionCont =  document.querySelector("#question-content").value;
  console.log(questionCont);
  var up = document.createElement("button");
  up.innerHTML = "向上";
  up.setAttribute("class", "layui-btn layui-btn-sm");
  up.setAttribute("onclick", "shilfUp(this)");
  var down = document.createElement("button");
  down.innerHTML = "向下";
  down.setAttribute("class", "layui-btn layui-btn-sm");
  down.setAttribute("onclick", "shilfDown(this)");
  var del = document.createElement("button");
  del.innerHTML = "删除";
  del.setAttribute("class", "layui-btn layui-btn-sm");
  del.setAttribute("onclick", "delBtn(this)");

  var p = document.createElement("p");
  p.innerHTML = questionCont;
  listDiv.appendChild(p);
  listDiv.appendChild(up);
  listDiv.appendChild(down);
  listDiv.appendChild(del);
  var isRequired = document.querySelector("#isRequired");
  var span = "<span>*</span>";
  if(isRequired.checked === true) {
    p.innerHTML += span;
  }
  var title = document.querySelector("#question-content");
  var spanI = document.createElement("span");
  spanI.innerHTML = '<i class="layui-icon layui-icon-tips"></i>';
  spanI.innerHTML += "请输入题目名称";
  // var i = document.createElement("i");
  // i.setAttribute("class", "layui-icon layui-icon-tips");
  // spanI.appendChild(i);
  var td = title.parentNode;
  if(questionCont === null || questionCont === "") {
    td.appendChild(spanI);
    return 0;
  }
  questionList.appendChild(listDiv);
  var inputBox;
  if(questionType === "text") {
    var writeBox = document.createElement("input");
    writeBox.name = "answer-input";
    writeBox.class = "answer-input";
    writeBox.type = "text";
    listDiv.appendChild(writeBox);
  }
  if(questionType === "password") {
    var writeBox = document.createElement("input");
    writeBox.name = "answer-input";
    writeBox.class = "answer-input";
    writeBox.type = "password";
    listDiv.appendChild(writeBox);
  }
  if (questionType === "number") {
    var writeBox = document.createElement("input");
    writeBox.name = "answer-input";
    writeBox.class = "answer-input";
    writeBox.type = "number";
    listDiv.appendChild(writeBox);
  }
  if (questionType === "textarea") {
    var writeBox = document.createElement("textarea");
    writeBox.name = "answer-input";
    writeBox.setAttribute("class", 'answer-input');
    writeBox.cols = "80";
    writeBox.rows = "5";
    listDiv.appendChild(writeBox);
  }
  if (questionType === "radio") {
    inputBox = getInputCont(questionType);
    listDiv.appendChild(inputBox);
  }
  if (questionType === "checkbox") {
    inputBox = getInputCont(questionType);
    listDiv.appendChild(inputBox);
  }
  console.log(inputBox);
  questionList.appendChild(listDiv);
  // listDiv.appendChild(inputBox);
}

/**
 * 获取选项内的内容
 * @param questionType
 * @returns {HTMLDivElement}
 */
function getInputCont(questionType) {
  var listDiv = document.createElement("div");
  if(questionType === "radio") {
    var inputCont = document.querySelectorAll(".input-radioCont");
  } else if(questionType === "checkbox") {
    var inputCont = document.querySelectorAll(".input-checkboxCont");
  }
  var optionInput = document.createElement("input");
  for(var i = 0; i < inputCont.length; i++) {
    var optionInput = document.createElement("input");
    optionInput.setAttribute("class", "opt-input");
    var inValue = inputCont[i].value;
    console.log(inValue);
    optionInput.setAttribute("type", questionType);
    var spanValue = document.createElement("span");
    spanValue.innerHTML = inValue;
    listDiv.appendChild(optionInput);
    listDiv.appendChild(spanValue);
  }
  console.log(inputCont);
  return listDiv;
}


/**
 * 新增单选框选项按钮
 * @param obj
 */
function addRadioOptions(obj) {
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  var radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "add-radio";
  radio.setAttribute("class","");

  var input = document.createElement("input");
  input.type = "text";
  input.name = "enter";
  // input.setAttribute("class", '');
  input.setAttribute("class", 'enter input-radioCont inps');
  input.placeholder = "请输入选项名称";
  // input.setAttribute("onfocus","addOptionRadio(this)");
  obj.parentNode.parentNode.parentNode.appendChild(tr);
  tr.appendChild(td);
  var tda = document.createElement("td");
  tr.appendChild(tda);
  tda.appendChild(radio);
  tda.appendChild(input);
  obj.setAttribute("placeholder","") ;
  // obj.removeAttribute("onfocus");
  var delSpan = '<span><a href="#" class="layui-btn layui-btn-sm" onclick="delRadio(this)">删除 </a></span>';
  tda.innerHTML += delSpan;
  console.log(delSpan);
}

/**
 * 新增多选框选项按钮
 * @param obj
 */
function addCheckboxOptions(obj) {
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  var radio = document.createElement("input");
  radio.type = "checkbox";
  radio.name = "add-checkbox";
  radio.setAttribute("class","");

  var input = document.createElement("input");
  input.type = "text";
  input.name = "enter";
  // input.setAttribute("class", '');
  input.setAttribute("class", 'enter input-checkboxCont inps');
  input.placeholder = "请输入选项名称";
  // input.setAttribute("onfocus","addOptionRadio(this)");
  obj.parentNode.parentNode.parentNode.appendChild(tr);
  tr.appendChild(td);
  var tda = document.createElement("td");
  tr.appendChild(tda);
  tda.appendChild(radio);
  tda.appendChild(input);
  obj.setAttribute("placeholder","") ;
  // obj.removeAttribute("onfocus");
  var delSpan = '<span><a href="#" class="layui-btn layui-btn-sm" onclick="delCheck(this)">删除 </a></span>';
  tda.innerHTML += delSpan;
  console.log(delSpan);
}

/**
 * 选项单选框中的删除按钮
 * @param obj
 */
function delRadio(obj) {
  var tbody = document.getElementsByTagName("tbody")[1];
  var child = obj.parentNode.parentNode.parentNode;
  tbody.removeChild(child);
}

/**
 * 删除多选框的删除按钮
 * @param obj
 */
function delCheck(obj) {
  var tbody = document.getElementsByTagName("tbody")[2];
  var child = obj.parentNode.parentNode.parentNode;
  tbody.removeChild(child);
}

/**
 * 上移
 * @param obj
 */
function shilfUp(obj) {
  var panel = document.querySelector("#panel");
  var up = obj.parentNode.previousSibling;
  if(up !== null) {
    panel.insertBefore(obj.parentNode, up);
  } else {
    alert("已经是最上了！");
  }

}

/**
 * 下移
 * @param obj
 */
function shilfDown(obj) {
  var panel = document.querySelector("#panel");
  var down = obj.parentNode.nextSibling;
  if(down !== null) {
    panel.insertBefore(obj.parentNode, down.nextSibling);
  } else {
    alert("已经无法下移了！");
  }
}

/**
 * 删除
 * @param obj
 */
function delBtn(obj) {
  var panel = document.querySelector("#panel");
  var del = obj.parentNode;
  panel.removeChild(del);
}











