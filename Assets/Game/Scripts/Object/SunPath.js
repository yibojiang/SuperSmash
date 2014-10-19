#pragma strict

var time:float;
var radius:float=50;


function UpdateTime(_time:float){
	transform.localPosition.x=-radius*Mathf.Cos(_time*Mathf.PI+Mathf.PI);
	transform.localPosition.y=-radius*Mathf.Sin(_time*Mathf.PI+Mathf.PI);
}
