// Put the whole game iside kittyCollector object
var kittyCollector = {
    score: 0,
    wins: 0,
    losses: 0,
    userScore: 0,
    catsValues: [],
    buttonsActive: true,

    // A function for generating a random number
    randomNumber: function (min, max) {
        var random = Math.floor(Math.random() * (max - min + 1) + min);
        return random;
    },

    // Creates an array of 4 random numbers
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

    // Genarates a randome number for Score and Cats, renders everything to the page and gives each cat a value
    gameStart: function () {
        this.score = this.randomNumber(19, 120);

        this.catsValues = this.crystals();

        this.render();

        this.whenClick();
    },

    clickHandler: function (id, v) {
        $(id).click(function () {
            // Making sure user can't prass buttons while Win/Lose window is showing
            if (this.buttonsActive !== true) {
                return false;
            }

            this.userScore += v;
    
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

    // Shows You Won/ You Lost window
    popUpWindow: function(status) {
        $(".message").addClass("show");
        $(".message #status").text(status);
        // Making sure user can't click buttons while window is being shown
        this.buttonsActive = false;
        // Renders final total score 
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