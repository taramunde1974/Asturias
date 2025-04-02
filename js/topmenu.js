function change(name){
//	als name nur bildname ohne dateiendung übergeben
	var allImg =  document.images;
	for(var i = 0; i < allImg.length; i++){
		if(allImg[i].src.indexOf(name) != -1){
			if(allImg[i].src.indexOf("-a.gif") != -1){
				j = allImg[i].src.indexOf("-a.gif");
				s1 = allImg[i].src.substring(0, j);
				s1 += ".gif";
				allImg[i].src = s1;
				break;
			}else{
				j = allImg[i].src.indexOf(".gif");
				s1 = allImg[i].src.substring(0, j);
				s1 += "-a.gif";
				allImg[i].src = s1;
				break;
			}
		}
	}
}
function open_window(url) {
	mywin = window.open(url,"win",'toolbar=0,location=0,directories=0,status=0,menubar=0,width=400,height=400');
	}
	
	var vorder = '#C6E7BD';
	var hinter = '#010101';

	function tabelle_drueber(quelle) {
	quelle.style.cursor = 'hand';
	quelle.bgColor = hinter;
	quelle.children.tags('A')[0].style.color = vorder;
	}

	function tabelle_raus(quelle) {
	quelle.style.cursor = 'hand';
	quelle.bgColor = vorder;
	quelle.children.tags('A')[0].style.color = hinter;
	}

	function tabelle_klick(quelle) {
	quelle.children.tags('A')[0].click();
	}

document.write('<style type="text/css"> html { overflow: -moz-scrollbars-vertical; } </style> ');
