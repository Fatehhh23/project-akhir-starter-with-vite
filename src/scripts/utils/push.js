export async function initPushNotification(registration) {
  try {
    // 1. Minta izin notifikasi
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('🔒 Izin notifikasi tidak diberikan.');
      return;
    }

    // 2. Subscribe ke PushManager dengan VAPID
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('<VAPID_PUBLIC_KEY>'), // Ganti dengan key asli
    };

    const subscription = await registration.pushManager.subscribe(subscribeOptions);
    console.log('📬 Subscription:', subscription);

    // 3. Kirim ke backend (untuk disimpan dan dikirimi notifikasi nanti)
    await fetch('<API_ENDPOINT_SUBSCRIPTION>', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer <token>' // jika pakai otentikasi
      },
      body: JSON.stringify(subscription),
    });

    console.log('✅ Subscription berhasil dikirim ke server.');
  } catch (error) {
    console.error('❌ Gagal inisialisasi push notification:', error);
  }
}

// Fungsi helper VAPID Key base64 → Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}
