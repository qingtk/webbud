function _(id) {
    if (id == null) return document.body;
    if(Number.isInteger(id)) return document.body.children[id];
    return document.getElementById(id)
}

function $(sel) {
    return document.querySelector(sel);
}

var table1 = _('table1');
var btn = $('#export-btn1');
var export1 = $('#export1');

$('.table-add').onclick=(function () {

  var tr1 = $('#table1 tr.hide').cloneNode(deep=true);
  tr1.classList.remove("hide", "table-line");
  $('#table1 tbody').appendChild(tr1);
});



$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});


btn.click(function () {
  var $rows = table1.find('tr:not(:hidden)');
  var headers = [];
  var data = [];
  
  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });
  
  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};
    
    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();   
    });
    
    data.push(h);
  });
  
  // Output the result
  export1.text(JSON.stringify(data));
});