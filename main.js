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

    for (let i = 1; i <= 7; i++) {
        eval('let C_Image' + i + '="image/block' + i + '.png"');
        eval('game.preload([C_Image' + i + ']);');
    }

    game.onload = function() {
        //ロードが終わった後にこの関数が呼び出されるので、
        // この関数の中にゲームのプログラムを書く。

        //==========グローバル変数=========//
        let Time = 0;
        let Second;
        let Minits = 0;
        let Score = 0;
        let BlockAry = [];
        let now_block;
        let shoot_frag = 1;
        let S_FirstPos_now;
        let Stage = 1;
        //=============================//

        let S_MAIN = new Scene();
        game.pushScene(S_MAIN);
        //S_MAINシーンオブジェクトを画面に設置
        S_MAIN.backgroundColor = "grey";

        let S_Text = new Label();

        S_Text.font = "20px Meiryo";
        S_Text.color = 'rgba(255,255,255,1)';
        S_Text.width = 400;
        S_Text.moveTo(0, 30);
        S_MAIN.addChild(S_Text);
        //S_MAINにこの画像を埋め込む
        S_Text.text = "現在:" + Score;

        let S_table = new Sprite(25, 25);
        S_table.image = game.assets[C_Image4];
        S_table.moveTo(190, 475);
        S_MAIN.addChild(S_table);


        //初期化用関数
        function init() {

            Time = 0;
            Second = 0;
            Minits = 0;
            Score = 0;
            Stage = 1;
            shoot_frag = 1;
            now_block = S_table;
            //画面のスライムを全て削除する
            for (let i = 0; i < BlockAry.length; i++) {
                if (BlockAry[i] != null) {
                    BlockAry[i].parentNode.removeChild(BlockAry[i]);
                    //画面にスライムが残っていれば削除する
                }
            }
            BlockAry = [];
        }
        init();


        //===========メインループ============
        S_MAIN.onenterframe = function() {
            if (Second < 10 && Minits < 10) {
                S_Text.text = "現在 Score:" + Score + "" + "Time:" + "0" + Minits + ":" + "0" + Second + ":" + Time;
            } else if (Second < 10) {
                S_Text.text = "現在 Score:" + Score + "" + "Time:" + Minits + ":" + "0" + Second + ":" + Time;
            } else if (Minits < 10) {
                S_Text.text = "現在 Score:" + Score +
                    "" + "Time:" + "0" + Minits + ":" + Second + ":" + Time;
            } else {
                S_Text.text = "現在 Score:" + Score + "" + "Time:" + Minits + ":" + Second + ":" + Time;
            }

            Time++;
            //毎フレームカウントを1増やす

            if (Time == 59) {
                Time = 0;
                Second++;
            }
            if (Second == 59) {
                Second = 0;
                Minits++;
            }

            if (Score <= 2) {
                Stage = 1;
            } else if (Score <= 4) {
                Stage = 2;
            } else if (Score <= 6) {
                Stage = 3;
            } else if (Score <= 8) {
                Stage = 4;
            } else if (Score <= 10) {
                Stage = 5;
            } else if (Score <= 12) {
                Stage = 6;
            } else if (Score <= 14) {
                Stage = 7;
            } else {
                Stage = 8;
            }
            if (shoot_frag == 1 && S_FirstPos_now == null) {
                let S_FirstPos = new Sprite(25, 25);
                S_FirstPos.image = game.assets[C_Image1];
                S_FirstPos.x = S_Hero.x,
                    S_FirstPos.y = S_Hero.y + 30
                S_MAIN.addChild(S_FirstPos);
            }

        }
    }
}