
$(".button-collapse").sideNav();

var colors = new Array(
  [75,20,140],
  [97,44,161],
  [119,74,173],
  [75,0,130],
  [147,112,219],
  [94,53,177]);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgba("+r1+","+g1+","+b1+",1)";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgba("+r2+","+g2+","+b2+",1)";

$('#index-banner').css(
   {
     background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

setInterval(updateGradient,10);

(function ($) {
    $(function () {

        //initialize all modals
        $('.modal').modal();

        //now you can open modal from code


        //or by click on trigger
        $('.trigger-modal').modal();

    }); // end of document ready
})(jQuery);

setTimeout(function(){
  $('#modal1').modal('open');
}, 2000);

$(document).ready(function() {
  var max_fields      = 10;
  var add_button      = $("#add-location-btn");

  var x = 1;
  var stop = 1;
  $("#modal1 .modal-footer").on('click', '#add-location-btn', function(e){
      e.preventDefault();
      if(x < max_fields){
          x++;
          $("#tour-form form #end-row").before('<div class="row custom-stop"><div class="input-field col s10 m9"><i id="end-icon" class="prefix material-icons yellow-text text-darken-2">location_on</i><input id="end-location-input" type="text" class="validate"><label for="end-location" class="location-labels yellow-text text-darken-2">Custom Stop</label></div><a class="del-loc-btn col s2 m1 btn red accent-2">X</a></div>').hide().slideDown("slow"); //add input box
          stop++;
      }
      else
      {
        Materialize.toast('Hey, let us do some of the work!', 3000);
      }
  });

  $("#tour-form form").on('click', ".del-loc-btn", function(e){
    console.log("yuh");
    e.preventDefault();
    $(this).closest('form .custom-stop').slideUp(function() {
      $(this).remove();
    });
    x--;
  })

  Materialize.updateTextFields();

  // $(".delete-location-btn").click(function(e){
  //   console.log("clicked");
  //   e.preventDefault();
  //   $(this).closest('div').remove(); x--;
  // })
});

$('#start-date-input').pickadate({
  min: new Date()
});

$('#end-date-input').pickadate({
  min: $('#start-date-input').get('value')
});

$('.datepicker').pickadate({
selectMonths: true,//Creates a dropdown to control month
selectYears: 15,//Creates a dropdown of 15 years to control year
//The title label to use for the month nav buttons
labelMonthNext: 'Next Month',
labelMonthPrev: 'Last Month',
//The title label to use for the dropdown selectors
labelMonthSelect: 'Select Month',
labelYearSelect: 'Select Year',
//Months and weekdays
monthsFull: [ 'January', 'February', 'March', 'April', 'March', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
monthsShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
//Materialize modified
weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
//Today and clear
today: 'Today',
clear: 'Clear',
close: 'Close',
//The format to show on the `input` element
format: 'mm/dd/yyyy'
});

var from_$input = $('#start-date-input').pickadate(),
    from_picker = from_$input.pickadate('picker');

var to_$input = $('#end-date-input').pickadate(),
    to_picker = to_$input.pickadate('picker');


// Defining a function, because we're binding this to two different events
function enableEnd() {
    to_picker.attr('disabled', !this.value.length) // Enable the end input element if the first one has anything in it
       .pickadate('option', 'minDate', this.value); // Set the minimum date to the date in the first input
}

$('#start-date-input').pickadate({
    onSelect: enableEnd // Call enableEnd when a date is selected in the first datepicker
}).bind('input', enableEnd); // Do the same when something is inputted by the user

if ( from_picker.get('value') ) {
  to_picker.set('min', from_picker.get('select'))
}
if ( to_picker.get('value') ) {
  from_picker.set('max', to_picker.get('select'))
}

// When something is selected, update the “from” and “to” limits.
from_picker.on('set', function(event) {
  if ( event.select ) {
    to_picker.set('min', from_picker.get('select'))
  }
  else if ( 'clear' in event ) {
    to_picker.set('min', false)
  }
});
to_picker.on('set', function(event) {
  if ( event.select ) {
    from_picker.set('max', to_picker.get('select'))
  }
  else if ( 'clear' in event ) {
    from_picker.set('max', false)
  }
});

//Copy settings and initialization tooltipped
