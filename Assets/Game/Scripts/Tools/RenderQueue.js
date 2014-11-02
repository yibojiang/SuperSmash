#pragma strict

private var mt:Material;
//@script ExecuteInEditMode()
var renderQueue:int=4000;

//particleSystem.renderer.sortingOrder = 2;
function Update () {
	if (mt==null){
		mt=renderer.material;
	}
	else{
		mt.renderQueue=renderQueue;
		
	}
	//renderer.sortingOrder=sortingOrder;
}