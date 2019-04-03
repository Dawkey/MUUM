export class class_song{
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.name_add = data.alia;
        this.singer = data.ar.map((val) => {
            return {id: val.id, name: val.name}
        });

        let al = data.al;
        this.album = {id: al.id, name: al.name, pic_url: al.picUrl};

        let time = data.dt;
        this.time = {second: time, minute: time_minute(time)}

        this.audio = {src: "", exp: -1}
    }
}

function time_minute(time){
    time = Math.floor(time / 1000);
    let minute = Math.floor(time / 60);
    let second = time % 60;
    let str_minute = minute < 10 ? ("0"+minute) : minute;
    let str_second = second < 10 ? ("0"+second) : second;
    return str_minute + ":" + str_second;
}
