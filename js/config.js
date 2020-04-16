var sounds_config = {
    crash: { button: "E", music: "sounds/pure_wav/crash.wav", id: "Crash-Cymbol", buffer_id: "crash"},
    floor_tom: { button: "F", music: "sounds/pure_wav/floor_tom.wav", id: "Floor-Tom-Drum", buffer_id: "floor_tom"},
    tom_left: { button: "T", music: "sounds/pure_wav/left_tom_drum.wav", id: "Tom-Left-Drum", buffer_id: "tom_left"},
    kick_drum: { button: "SPACE", music: "sounds/pure_wav/kick.wav", id: "Kick-Drum", buffer_id: "kick_drum"},
    tom_right: { button: "Y", music: "sounds/pure_wav/right_tom_drum.wav", id: "Tom-Right-Drum", buffer_id: "tom_right"},
    snare_drum: { button: "J", music: "sounds/pure_wav/snare.wav", id: "Snare-Drum", buffer_id: "snare_drum"},
    hi_hat: { button: "I", music: "sounds/pure_wav/hi_hat_closed.wav", id: "Hi-Hat-plates", buffer_id: "hi_hat" }
};

function get_key_config(key) {
    let key_config = null
    let config_keys = Object.keys(sounds_config)
    config_keys.forEach(function (k) {
        if (key === sounds_config[k].button)
            key_config = sounds_config[k];
    })
    // console.log(key, " >> ", key_config)
    return key_config
}

function get_buffer_by_id(_id) {
    let _buffer = null;
    let config_keys = Object.keys(sounds_config);
    config_keys.forEach(function(k) {
        if (_id === sounds_config[k]['id'])
            _buffer = sounds_config[k]['buffer_id'];
    });
    return _buffer;
}