<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
			<title>MySQL Connect</title>
</head>
<body>
<?php # Script 9.2 - mysqli_connect.php

// This file contains the database access information
// This file also establishes a connection to MySQL,
// Selects the database, and encoding.

// Set the database access information as constants:
DEFINE ('DB_USER', 'Trey');
DEFINE ('DB_PASSWORD', 'Wakinyan1');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'display');

// Make the connection
$dbc = @mysqli_connect ('DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME') OR die ('Could not connect to MySQL: ' .mysqli_connect_error());

// Set the encoding
mysqli_set_charset($dbc, 'utf8');

$result = mysql_query("SELECT screen FROM display");

while($row = mysql_fetch_array($result))
  {
  echo $row['screen'];
  }
	
echo $screen


?>
</body>
</html>
