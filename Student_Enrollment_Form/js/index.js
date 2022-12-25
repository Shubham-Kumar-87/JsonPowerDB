var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stuDBName "STU_DB";
var stuRelationName = "StuDate";
var connToken = "90938287|-31949273823188971|90952680"

$("#stuid").focus();

function saveRecNo(jsonObj) {
	var lvData = JSON.parse(jsonObj.data);
	localStorage.steItem('recno',lvData.rec_no);
}

function getStuIdAsJsonObj(){
	var stuid =$("#stuid").val();
	var jsonStr = {
		id:stuid
	};
	return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
	saveRecNo(jsonObj);
	var record = JSON.parse(jsonObj.data).record;
	$("#stuid").val(record.roll);
	$("#stuname").val(record.name);
	$("#stuclass").val(record.class);
	$("#stubirth").val(record.birth);
	$("#stuadd").val(record.address);
	$("#stuenroll").val(record.enrollment);
}

function resetForm(){
	$("#stuid").val("");
	$("#stuname").val("");
	$("#stuclass").val("");
	$("#stubirth").val("");
	$("#stuadd").val("");
	$("#stuenroll").val("");
	$("#stuid").prop("disabled",false);
	$("#save").prop("disabled",true);
	$("#change").prop("disabled",true);
	$("#reset").prop("disabled",true);
	$("#stuid").focus();
}

function validateData(){
	var stuid, stuname, stuclass, stubirth, stuadd, stuenroll;
	stuid =$("#stuid").val();
	stuname =$("#stuname").val();
	stuclass =$("#stuclass").val();
	stubirth =$("#stubirth").val();
	stuadd =$("#stuadd").val();
	stuenroll =$("#stuenroll").val();

	if (stuid === "") {
		alert('Student Roll no missing');
		$("#stuid").focus();
		return "";
	}
	if (stuname === "") {
		alert('Student Name missing');
		$("#stuname").focus();
		return "";
	}
	if (stuclass === "") {
		alert('Student Class missing');
		$("#stuclass").focus();
		return "";
	}
	if (stubirth === "") {
		alert('Student Birth Date missing');
		$("#stubirth").focus();
		return "";
	}
	if (stuadd === "" {
		alert('Student Address missing');
		$("#stuadd").focus();
		return "";
	}
	if (stuenroll ==="") {
		alert('Student Enrollnment no missing');
		$("#stuenroll").focus();
		return "";
	}

	var jsonStrObj = {
		id: stuid,
		name: stuname,
		class: stuclass,
		birth: stubirth,
		address: stuadd,
		enrollment: stuenroll
	};
	return JSON.stringify(jsonStrObj);

}

functiong getEmp(){
	var stuIdJsonObj = getStuIdJsonObj();
	var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, empIdJsonObj);
	jQuery.ajaxSetup({async: false});
	var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL, jpdbIRL);
	jQuery.ajaxSetup({async: true});

	if (resJsonObj.status === 400) {
		$("#save").prop("disabled", false);
		$("#reset").prop("disabled", false);
		$("#stuname").focus();
	}
	else if (resJsonObj.status === 200) {
		$("#stuid").prop("disabled",true);
		fillData(resJsonObj);


		$("#change").prop("disabled",false);
		$("#reset").prop("disabled",false);
		$("#stuname").focus();
	}
}




function saveData() {
	var jsonStrObj = validateData();
	if (jsonStrObj === "") {
		return "";
	}

	var putRequest= createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
	jQuery.ajaxSetup({async: false});
	var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL, jpdbIML);
	jQuery.ajaxSetup({async: true});
	resetForm();
	$("#stuid").focus();
}


function changeData(){
	$("#change").prop("disabled",true);
	jsonChg = validateData();

	var updateRequest= createUPDATERecordRequest(connToken,jsonChg, stuDBName, stuRelationName, localStorage.getItem('recno'));
	jQuery.ajaxSetup({async: false});
	var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL, jpdbIML);
	jQuery.ajaxSetup({async: true});
	console.log(resJsonObj);
	resetForm();
	$("#stuid").focus();

}
