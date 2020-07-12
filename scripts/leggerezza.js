var histper, interper, cognper, crossper, otherper;
var Common = {
    init: function () {
        $(document).on("change", 'input[type="radio"]', Common.setView);
        $(document).on("click", "#highlight", Common.highlightExample);
        $(document).on("click", "#cross", Common.crossExample);
        $(document).on("click", "#interp", Common.interpExample);
        $(document).on("click", "#hist", Common.histExample);
        $(document).on("click", "#cogn", Common.cognExample);
        $(document).on("click", "#levels", Common.setColor);
        $(document).on("click", "#percentage", Common.setColor.getPer);
    },

    setView: function () {
        if ($(this).val() == 'highlight') {
            $("#highlight").show();
            $("#interp").hide();
            $("#hist").hide();
            $("#cross").hide();
            $("#cogn").hide();
            $("#levels").hide();
        }
        else {
            $("#highlight").hide();
            $("#interp").show();
            $("#hist").show();
            $("#cross").show();
            $("#cogn").show();
            $("#levels").show();
          }
      },

    highlightExample: function () {
        $("#highlight").hide();
        var searchvalues = $.trim($("#searchText").val()).split(" ");
        // the trim() method is used to remove whitespace from both sides of a string:
        var initialString = $("#content").html();
        var response = Common.highlightAll(initialString, searchvalues);
        $("#content").html(response);
    },

    highlightAll: function (initialString, searchvalues) {
        var values = searchvalues.join("|");
        if ($.trim(values) != '') {
            return initialString.replace(new RegExp(values, 'gi'), function (x) {
                // The gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string.
                return "<mark style='background-color:#C82A27;'>" + x + "</mark>";
            });
        }
    },

    // highlight all words with attribute ana="#interp"
    interpExample: function () {
        $("#interp").css("background-color", "#646A90");
        var searchvalues = $("[ana='#interp']").css("background-color", "#646A90");
    },

    histExample: function () {
        $("#hist").css("background-color", "#E1CFCB");
        var searchvalues = $("[ana='#hist']").css("background-color", "#E1CFCB");
    },

    crossExample: function () {
        $("#cross").css("background-color", "#F0C442");
        var searchvalues = $("[ana='#cross-ref']").css("background-color", "#F0C442");
    },

    cognExample: function () {
        $("#cogn").css("background-color", "#A6C4CF");
        var searchvalues = $("[ana='#cogn']").css("background-color", "#A6C4CF");
    },

    setColor: function () {

      var parent = document.getElementsByTagName("p");
      l = parent.length;
      for (var i = 0; i < l; i++) {
          x = parent[i]
          var interplen = $(x).children("[ana='#interp']").length;
          var histlen = $(x).children("[ana='#hist']").length;
          var crosslen = $(x).children("[ana='#cross-ref']").length;
          var cognlen = $(x).children("[ana='#cogn']").length;

          var themax = Math.max.apply(null, [interplen, histlen, crosslen, cognlen]);
          if (themax == interplen) {
            var colorp = $(x).css("background-color", "#ABAEC4");
            var interpclass = x.classList.add("interpclass");
          }
          else if (themax == histlen) {
            var colorp = $(x).css("background-color", "#F1E7E4");
            var histclass = x.classList.add("histclass");
          }
          else if (themax == crosslen) {
            var colorp = $(x).css("background-color", "#F7E2A1");
            var crossclass = x.classList.add("crossclass");
          }
          else if (themax == cognlen) {
            var colorp = $(x).css("background-color", "#D7E4EA");
            var cognclass = x.classList.add("cognclass");
          }
          else {
            var colorp = $(x).css("background-color", "white");
            var other = x.classList.add("other");
          }
        }


        tot = parent.length;
        var i = document.getElementsByClassName("interpclass")
        var h = document.getElementsByClassName("histclass")
        var c = document.getElementsByClassName("crossclass")
        var g = document.getElementsByClassName("cognclass")
        var o = document.getElementsByClassName("other")

        var totinterp = i.length;
        var tothist = h.length;
        var totcogn = g.length;
        var totcross = c.length;
        var totother = o.length;

        var histper = (tothist*100)/tot;
        var interper = (totinterp*100)/tot;
        var cognper = (totcogn*100)/tot;
        var crossper = (totcross*100)/tot;
        var otherper = (totother*100)/tot;

        document.getElementById("hper").innerHTML = "History: "+Math.round(histper)+"%";
        document.getElementById("iper").innerHTML = "Interpretation: "+Math.round(interper)+"%";
        document.getElementById("cper").innerHTML = "Cross-referencing: "+Math.round(crossper)+"%";
        document.getElementById("gper").innerHTML = "Cognition: "+Math.round(cognper)+"%";
        document.getElementById("oper").innerHTML = "Other: "+Math.round(otherper)+"%";
    },
};

$(function () {
    Common.init();
});
