<?php
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

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8'; // <-- Añade esta línea
    $mail->Encoding = 'base64'; // Opcional, para codificación segura
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'logisticasprueba@gmail.com'; 
        $mail->Password = 'ogcd zakn kzra vuhw'; // Contraseña de aplicación
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('logisticasprueba@gmail.com', 'Logísticas Castro');
        $mail->addAddress('230103@upbc.edu.mx');
        $mail->Subject = 'Nuevo mensaje de contacto';
        $mail->Body = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMensaje: $mensaje";// Si usas HTML:
        $mail->isHTML(true);
        $mail->Body = "<p>Nombre: $nombre</p><p>Email: $email</p><p>Teléfono: $telefono</p><p>Mensaje: $mensaje</p>";
        $mail->AltBody = "Nombre: $nombre\nEmail: $email\nTeléfono: $telefono\nMensaje: $mensaje"; // Versión texto plano

        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "Error al enviar: " . $mail->ErrorInfo;
    }
}
?>