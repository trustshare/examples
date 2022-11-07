import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  console.log('HELLO WORLD');

  useEffect(() => {
    console.log('effect');
  }, []);
  function handleClick() {
    console.log('handle click');
    setLoading(true);
    fetch('http://localhost:9987/createPaymentIntent')
      .then((res) => res.json())
      .then((res) => {
        setClientSecret(res.client_secret);
      });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>trustshare React Native example</Text>
        <Button
          disabled={loading}
          title="Create Payment Intent"
          onPress={handleClick}
        ></Button>
        {clientSecret && (
          <WebView
            allowsInlineMediaPlayback={true}
            cacheEnabled={true}
            geolocationEnabled={false}
            javaScriptEnabled
            javaScriptEnabledAndroid={true}
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode={'compatibility'}
            source={{
              uri: `https://checkout.trustshare.io/process?s=${clientSecret}&st=0`,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
