#pragma strict

import System.Collections.Generic;

var hpbars:List.<GameObject>;

function UpdateLayout(){
	var i:int;
	for (i=0;i<hpbars.Count;i++){
		hpbars[i].transform.localPosition.x=0;
		hpbars[i].transform.localPosition.y=i*0.3;
	}
}

function AddHPObj(_obj:GameObject){
	hpbars.Add(_obj);
	_obj.transform.parent=transform;
	UpdateLayout();
}

function RemoveHPObj(_obj:GameObject){
	hpbars.Remove(_obj);
	_obj.transform.parent=transform;
	UpdateLayout();
}