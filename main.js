enchant();

window.onload = function() {
    let game = new Game(400, 500); //画面サイズを400*500にする
    game.fps = 60;
    let url = "https://jorugame.jorublog.site/tower/index.html";
    url = encodeURL(url); //きちんとURLがツイート画面に反映されるようにエンコードする。

    for (let i = 1; i <= 6; i++) {
        eval('let B_Image' + i + '="image/image' + i + '.png"');
        // eval関数を使ってimage / image〜 のURLを取得して、変数B_Imageに格納
        eval('game.preload([B_Image' + i + ']);');
        //プリロード
    }
}