<?php
// API Key Xendit
$apiKey = "xnd_development_xxxxxxxxxxxxxxxxxx";

// Ambil data JSON dari request
$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
    exit;
}

// Data invoice ke Xendit
$payload = [
    "external_id" => "order-" . time(),
    "amount" => (int) $data['total'],
    "payer_email" => $data['email'],
    "description" => "Pembelian di LatteLuxe",
    "invoice_duration" => 86400, // 24 jam
    "success_redirect_url" => "https://yourwebsite.com/success",
    "failure_redirect_url" => "https://yourwebsite.com/failure"
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.xendit.co/v2/invoices");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Basic " . base64_encode("$apiKey:")
]);

$response = curl_exec($ch);
curl_close($ch);

if (!$response) {
    http_response_code(500);
    echo json_encode(["error" => "Gagal membuat invoice"]);
    exit;
}

$invoice = json_decode($response, true);
echo json_encode(["invoice_url" => $invoice["invoice_url"]]);
?>
