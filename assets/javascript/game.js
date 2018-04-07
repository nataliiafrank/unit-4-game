var kittyCollector = {
    score: 0,
    wins: 0,
    losses: 0,
    userScore: 0,
    catsValues: [],
    buttonsActive: true,

    randomNumber: function (min, max) {
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        return random;
    },

    crystals: function () {
        var crystalValues = [];

        while (crystalValues.length < 4) {
            var a = this.randomNumber(1, 12);
            if (crystalValues.indexOf(a) === -1) {
                crystalValues.push(a);
            }
        };
        return crystalValues;
    },

    //Genarates a randome number for Score
    gameStart: function () {
        this.score = this.randomNumber(19, 120);
        console.log(this.score)

        this.catsValues = this.crystals();
        console.log(this.catsValues)

        this.render();

        this.whenClick();
    },

    clickHandler: function (id, v) {
        var _this = this;
        $(id).click(function () {
            if (this.buttonsActive !== true) {
                return false;
            }

            this.userScore += v;
            console.log(v);
            console.log(this.userScore);
            $("#userScoreDiv").text(this.userScore);

            if (this.userScore === this.score) {
                this.wins++;
                $("#winsDiv").text(this.wins);
                this.popUpWindow("Won");
            } else if (this.userScore > this.score) {
                this.losses++;
                $("#lossesDiv").text(this.losses);
                this.popUpWindow("Lost");
            }
        }.bind(this)); // Click is called by window so 'this' equal 'window'. But we want 'this' to equal kittyCollector so we need to bind 'this' to the click function
    },

    whenClick: function () {
        this.clickHandler("#head1", this.catsValues[0]);
        this.clickHandler("#head2", this.catsValues[1]);
        this.clickHandler("#head3", this.catsValues[2]);
        this.clickHandler("#head4", this.catsValues[3]);
    },

    render: function () {
        $("#gameScore").text(this.score);
        $("#winsDiv").text(this.wins);
        $("#lossesDiv").text(this.losses);
        $("#userScoreDiv").text(this.userScore);
    },

    reset: function () {
        this.gameStart();
        this.userScore = 0;
    },

    popUpWindow: function(status) {
        $(".message").addClass("show");
        $(".message #status").text(status);
        this.buttonsActive = false;
        this.render();

        setTimeout(function() {
            $(".message").removeClass("show");
            this.buttonsActive = true;
            this.reset();
            this.render();
        }.bind(this), 3000);
    }
};

kittyCollector.gameStart();