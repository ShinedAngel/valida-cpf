var foco = "";
var msgstatus = "";
/*************************************************
	Função que permitir digitar numeros 
**************************************************/
function EntradaNumerico(evt) {

	var key_code = evt.keyCode ? evt.keyCode :
		evt.charCode ? evt.charCode :
			evt.which ? evt.which : void 0;

	// Habilita teclas <DEL>, <TAB>, <ENTER>, <ESC> e <BACKSPACE>
	if (key_code == 8 || key_code == 9 || key_code == 13 || key_code == 27 || key_code == 46) {
		return true;
	}
	// Habilita teclas <HOME>, <END>, mais as quatros setas de navegação (cima, baixo, direta, esquerda)
	else if ((key_code >= 35) && (key_code <= 40)) {
		return true
	}
	// Habilita números de 0 a 9
	// 48 a 57 são os códigos para números
	else if ((key_code >= 48) && (key_code <= 57)) {
		return true
	}
	return false;
}

function Alertar(strMsg) {
	window.alert(strMsg)
}

function aviso(campo, msg) {
	alert(msg);
	campo.focus();
	campo.select();
	return false;
}

//Verifica se CPF é válido
function TestaCPF(strCPF) {
	var Soma, Resto, borda_original;
	Soma = 0;

	if (strCPF == "00000000000") {
		document.getElementById("txtCPF").setCustomValidity('Invalid');
		return false;
	}

	for (i = 1; i <= 9; i++) {
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
	}

	Resto = (Soma * 10) % 11;
	if ((Resto == 10) || (Resto == 11)) {
		Resto = 0;
	}

	if (Resto != parseInt(strCPF.substring(9, 10))) {
		document.getElementById("txtCPF").setCustomValidity('Invalid');
		return alert("Ei, seu CPF não bateu com nosso dados, verifique e tente novamente.");
	}

	Soma = 0;
	for (i = 1; i <= 10; i++) {
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
	}

	Resto = (Soma * 10) % 11;
	if ((Resto == 10) || (Resto == 11)) {
		Resto = 0;
	}

	if (Resto != parseInt(strCPF.substring(10, 11))) {
		document.getElementById("txtCPF").setCustomValidity('Invalid');
		return alert("Por favor, preencha o CPF com os 11 números.");
	}

	document.getElementById("txtCPF").setCustomValidity('');
	return true;
}

// Recupera uma referência ao objeto com o id especificado
// Funciona primariamente com o DOM, mas também aceita document.all
function pegaObj(id) {
	if (typeof (document.getElementById) != 'undefined')
		return document.getElementById(id);
	else if (document.all) {
		return document.all(id);
	}
}

// Função chamada no evento onKeyDown para evitar que caracteres não numéricos
// sejam inseridos no campo indicado.
// Parâmetros:
// input: referência para o objeto <input> que recebeu o evento
// e: o objeto event
function ajustar_numero(input, e) {

	var k;

	// e.which: explorer, e.keyCode: mozilla
	if (e && e.which)
		k = e.which;
	else
		k = e.keyCode;

	// No IE não essa função não consegue cancelar tabs, BS, DEL, etc, mas no mozilla sim,
	// por isso precisamos deixar passar as teclas de edição.
	// Somente aceita os caracteres 0-9, tab, enter, del e BS
	if (((k < 48) || (k > 57)) && k != 8 && k != 9 && k != 127 && k != 13 && !((k > 34) && (k < 41)) && k != 46) {
		if (e.ctrlKey && (k == 118 || k == 99)) {
			return true;
		}
		else {
			e.returnValue = false;
			return false;
		}
	}
	return true;
}

// Função específica do IE, que busca as informações do evento
// e repassa para as rotina em si "ajustar_numero" e "pular_campo"
function ajustar_numeroie() {
	e = window.event;
	input = pegaObj(e.srcElement.id);
	return ajustar_numero(input, e);
}

function validarCPF(cpf) {
	var form = pegaObj("theForm");
	if (pegaObj("id_cpf").value == "") {
		alert("Por favor, preencha o cpf a ser consultado");
		pegaObj("id_cpf").focus();
		return;
	}
}

function RemoveMask(xElement) {
	var strValue = pegaObj(xElement).value;

	strValue = strValue.replace(".", "");
	strValue = strValue.replace(".", "");
	strValue = strValue.replace("-", "");

	pegaObj(xElement).value = strValue;
}

function FG_FormatarCPF(xElement) {
	var strValor = pegaObj(xElement).value;
	var strTemp;

	strTemp = strValor.replace(".", "");
	strTemp = strTemp.replace(".", "");
	strTemp = strTemp.replace(".", "");
	strTemp = strTemp.replace("-", "");
	strTemp = strTemp.replace("-", "");

	strValor = strTemp

	if (strValor.length > 9) {
		strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3) + '.' + strValor.substr(6, 3) + '-' + strValor.substr(9, 2);
	}
	else if (strValor.length > 6) {
		strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3) + '.' + strValor.substr(6, 3);
	}
	else if (strValor.length > 3) {
		strValor = strValor.substr(0, 3) + '.' + strValor.substr(3, 3);
	}
	pegaObj(xElement).value = strValor;
}

function ValidarDados(xTipoSubmit) {
	TestaCPF(strCPF);
	var cpf = pegaObj("txtCPF").value;
	cpf = cpf.replace(/[^0-9]/g, ''); //normalizar CPF antes de fazer validação, removendo campos não numéricos

	if (cpf.length != 11) {
		alert("Por favor, preencha o CPF com os 11 números.");
		pegaObj("txtCPF").focus();
		return false;
	}
}
