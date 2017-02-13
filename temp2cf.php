<?php
//File to read
$file = '/sys/devices/w1_bus_master1/28-0316624a1eff/w1_slave';
$file2 = '/sys/devices/w1_bus_master1/28-03166241fcff/w1_slave';

//Read the file line by line
$lines = file($file);
$lines2 = file($file2);

//Get the temp from second line
$temp = explode('=', $lines[1]);
$temp2 = explode('=', $lines2[1]);

//Setup some nice formatting (i.e. 21,3)
$temp_c = number_format($temp[1] / 1000, 1, '.', '');
$temp_f = ($temp_c * 9.0) / 5.0 + 32.0;
$temp_c2 = number_format($temp2[1] / 1000, 1, '.', '');
$temp_f2 = ($temp_c2 * 9.0) / 5.0 + 32.0;

if ($_GET['format'] === 'json') {
    $jsonArray = [
        'temp_c'  => $temp_c,
        'temp_f'  => $temp_f,
        'temp_c2' => $temp_c2,
        'temp_f2' => $temp_f2,
    ];
    echo json_encode($jsonArray);
} else {
    ?>
    <head>
        <meta http-equiv="refresh" content="1"/>
        <style>
            .title {
                font-family: calibri sans-serif;
                font-size: 25pt;
                font-weight: bold
            }

            .temp {
                font-family: arial sans-serif;
                font-size: 33pt;
            }

            .celsius {
                color: blue
            }

            .fahrenheit {
                color: green
            }
        </style>
    </head>

    <p class="title">
        The current outside temperature is<br/>
        <span class="temp celsius"><?= $temp_c ?> C</span><br/>
        <span class="temp fahrenheit"><?= $temp_f ?> F</span><br/>
    </p>
    <p class="title">
        The current indoor temperature is<br/>
        <span class="temp celsius"><?= $temp_c2 ?> C</span><br/>
        <span class="temp fahrenheit"><?= $temp_f2 ?> F</span><br/>
    </p>
    <a href="http://192.168.1.41/123.html">
        <button>Back</button>
    </a>
    <?php
}