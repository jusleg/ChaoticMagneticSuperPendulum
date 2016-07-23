$('#sliderMass').on("change mousemove", function() {
    $("#pendulumMass").html($("#sliderMass").val()/100.0);
});
$('#sliderStrength').on("change mousemove", function() {
    $("#magnetStrength").html($("#sliderStrength").val()/10.0*1e5);
});
$('#sliderFriction').on("change mousemove", function() {
    $("#friction").html($("#sliderFriction").val()/10.0);
});
$('#sliderGravity').on("change mousemove", function() {
    $("#gravity").html($("#sliderGravity").val()/10.0);
});
$('#sliderHeight').on("change mousemove", function() {
    $("#pendulumHeight").html($("#sliderHeight").val()/100.0);
});
$('#sliderMagnets').on("change", function() {
    $("#initialMagnets").html($("#sliderMagnets").val());
    canvas.totalMagnets = $("#sliderMagnets").val();
    canvas.initMagnets();
    canvas.renderMagnets();
});
