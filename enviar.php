<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars($_POST['phone']);
    $mensaje = htmlspecialchars($_POST['message']);

    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo "Error: Campos obligatorios vacíos.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP para Outlook/Hotmail
        $mail->isSMTP();
        $mail->Host = 'smtp-mail.outlook.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'x-elite123@hotmail.com'; // Tu correo
        $mail->Password = 'klzyqchphqlhgclj'; // Tu contraseña
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Configuración del correo
        $mail->setFrom('x-elite123@hotmail.com', 'Logísticas Castro');
        $mail->addAddress('230103@gmail.com'); // Correo destino
        $mail->Subject = 'Nuevo mensaje de contacto';
        $mail->Body = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMensaje: $mensaje";

        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "Error al enviar: " . $mail->ErrorInfo;
    }
} else {
    echo "Método no permitido.";
}
?>