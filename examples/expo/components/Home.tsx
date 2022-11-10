import React from 'react';
import { Button, SafeAreaView, View, StyleSheet } from 'react-native';
import { Checkout } from '@trustshare/react-native-sdk';
import { Verify } from '@trustshare/react-native-sdk';

export const HomeScreen = () => {
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
            onCancel={() => {
              console.log('Payment cancelled');
            }}
            onComplete={(args) => {
              console.log('Payment complete!');
              console.log(args.checkout_id);
              console.log(args.project_id);
              setPaymentClientSecret(null);
            }}
          />
        )}
        {verificationClientSecret && (
          <Verify
            options={{ __BASE_URL: '.nope.sh' }}
            clientSecret={verificationClientSecret}
            onComplete={(args) => {
              console.log('Verification complete!');
              console.log(args.verification_id);
              setVerificationClientSecret(null);
            }}
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
};

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
