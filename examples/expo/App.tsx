import * as React from 'react';

import { Checkout, Verify } from '@trustshare/react-native-sdk';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';

export default function App() {
  const [paymentClientSecret, setPaymentClientSecret] = React.useState<
    string | null
  >(null);
  const [verificationClientSecret, setVerificationClientSecret] =
    React.useState<string | null>(null);

  function createPaymentIntent() {
    fetch('http://localhost:9987/createPaymentIntent')
      .then((res) => res.json())
      .then((res) => {
        setPaymentClientSecret(res.client_secret);
      });
  }

  function createVerificationIntent() {
    fetch('http://localhost:9987/createVerificationIntent')
      .then((res) => res.json())
      .then((res) => {
        setVerificationClientSecret(res.client_secret);
      });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {paymentClientSecret && (
          <Checkout
            options={{ __BASE_URL: '.nope.sh' }}
            clientSecret={paymentClientSecret}
          />
        )}
        {verificationClientSecret && (
          <Verify
            options={{ __BASE_URL: '.nope.sh' }}
            clientSecret={verificationClientSecret}
          />
        )}
        {!paymentClientSecret && !verificationClientSecret && (
          <View style={styles.wrapper}>
            <Button
              title="Create Payment Intent"
              onPress={createPaymentIntent}
            />
            <Button
              title="Create Verification Intent"
              onPress={createVerificationIntent}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
