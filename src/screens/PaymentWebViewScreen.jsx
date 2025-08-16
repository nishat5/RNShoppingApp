// PaymentWebViewScreen.jsx
import React, { useMemo } from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentWebViewScreen = ({ route, navigation }) => {
  const { amount, itemName } = route.params;

  // Sandbox merchant credentials from PayFast docs
  const merchant_id = '10041054'; // Sandbox ID
  const merchant_key = 'vop7erjm8vxo5'; // Sandbox key

  // Dummy URLs for testing
  const return_url = 'https://your-domain.com/payment-success';
  const cancel_url = 'https://your-domain.com/payment-cancel';
  const notify_url = 'https://your-domain.com/payment-notify';

  // Payment form data
  const paymentData = {
    merchant_id,
    merchant_key,
    return_url,
    cancel_url,
    notify_url,
    amount: amount.toFixed(2),
    item_name: itemName,
  };

  // Build the HTML form without signature
  const paymentForm = useMemo(() => {
    const fields = Object.entries(paymentData)
      .map(
        ([key, value]) =>
          `<input type="hidden" name="${key}" value="${value}" />`,
      )
      .join('\n');

    return `
      <html>
        <body onload="document.forms[0].submit();">
          <form action="https://sandbox.payfast.co.za/eng/process" method="post">
            ${fields}
          </form>
        </body>
      </html>
    `;
  }, []);

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: paymentForm }}
      onNavigationStateChange={navState => {
        if (navState.url.includes('payment-success')) {
          Alert.alert(
            'Payment Success!',
            'Confirm Order button has been enabled. Click it to confirm your order.',
          );
          navigation.replace('ConfirmOrderScreen', { orderSuccess: true });
        } else if (navState.url.includes('payment-cancel')) {
          Alert.alert('Payment Failed!', 'Please try again later to pay now.');
          navigation.replace('ConfirmOrderScreen', { orderSuccess: false });
        }
      }}
    />
  );
};

export default PaymentWebViewScreen;
