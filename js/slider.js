$( document ).ready(function() {
    $('#sliderMass').on("change", function() {
        $("#pendulumMass").html($("#sliderMass").val()/100.0);
    });
    $('#sliderStrength').on("change", function() {
        $("#magnetStrength").html($("#sliderStrength").val()/10.0*1e5);
    });
    $('#sliderFriction').on("change", function() {
        $("#friction").html($("#sliderFriction").val()/10.0);
    });
    $('#sliderGravity').on("change", function() {
        $("#gravity").html($("#sliderGravity").val()/10.0);
    });
    $('#sliderHeight').on("change", function() {
        $("#pendulumHeight").html($("#sliderHeight").val()/100.0);
    });
    $('#sliderMagnets').on("change", function() {
        $("#initialMagnets").html($("#sliderMagnets").val());
	initMagnets($("#sliderMagnets").val());
	redraw();
    });
});

