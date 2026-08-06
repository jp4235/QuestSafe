<?php
session_start();

$host = "localhost";
$dbname = "gaming_database";
$username = "QuestSafe";
$password = "class";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    die("Connection failed.");
}

$username = $_POST['username'] ?? '';
$userPassword = $_POST['password'] ?? '';

$stmt = $pdo->prepare("SELECT account_id, username, password FROM gamer_accounts WHERE username = ?");
$stmt->execute([$username]);

$user = $stmt->fetch();

if ($user && password_verification($userPassword) {
    // Authentication successful
    session_regenerate_id(true);

    $_SESSION['account_id'] = $user['account'];
    $_SESSION['username'] = $user['username'];

    header("Location: dashboard.php");
    exit;
} else {
    echo "Invalid username or password.";
}
?>



