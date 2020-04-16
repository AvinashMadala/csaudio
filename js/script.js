

$.get("imgs/drums.svg", function (resp) {
    var svg = $(resp).find("svg");
    $(".drums_holder").html(svg);
    $(".drums_holder svg").height(window.outerHeight);
    setTimeout(function () {
        play_drum_anime(".clickable_drum");
        play_plate_anime();
        play_hihat_anime();
    }, 500)
})

function play_drum_anime(drum_id) {
    d3.selectAll(drum_id)
        .transition()
        .duration(100)
        .attr("transform", "translate(0, -10)")
        .transition()
        .duration(100)
        .attr("transform", "translate(0, 10)");
}

function play_plate_anime() {
    d3.selectAll("#Crash-Cymbol path")
        .transition()
        .duration(100)
        .attr("transform-origin", "50% 50%")
        .attr("transform", "rotate(8)")
        .attr("fill", "gold")
        .transition()
        .duration(100)
        .attr("transform", "translate(10, -30)rotate(-8)")
        .transition()
        .duration(100)
        .attr("transform", "translate(0, 0)rotate(0)")
        .attr("fill", "grey");
}
function play_hihat_anime() {
    d3.selectAll(".hihat_plates path")
        .transition()
        .duration(100)
        .attr("transform-origin", "left")
        .attr("transform", "rotate(0.3)")
        .attr("fill", "gold")
        .transition()
        .duration(100)
        .attr("transform", "rotate(0)")
        .attr("fill", "grey");
}

$("body")
    .on("click", ".clickable_drum", function () {
        let drum_id =  this.getAttribute("id");
        play_drum_anime("#" + drum_id);
        let buffer_id = get_buffer_by_id(drum_id)
        playSound(buffer_id);

    })
    .on("click", ".clickable_plates", function () {
        let drum_id = this.getAttribute("id");
        play_plate_anime()
        let buffer_id = get_buffer_by_id(drum_id);
        playSound(buffer_id);
    })
    .on("click", ".hihat_plates", function () {
        let drum_id = this.getAttribute("id");
        play_hihat_anime();
        let buffer_id = get_buffer_by_id(drum_id);
        playSound(buffer_id);
    })
    .keydown(function (e) {
        let _key = e.key;
        if (_key == " ") {
            _key = "SPACE";
        }
        res = get_key_config(_key.toUpperCase());
        if (res !== null) {
            if (res.id === "Crash-Cymbol")
                play_plate_anime()
            else if (res.id === "Hi-Hat-plates")
                play_hihat_anime()
            else
                play_drum_anime("#" + res.id)
            playSound(res.buffer_id);
        }
    })


