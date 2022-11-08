import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WebView, WebViewProps } from "react-native-webview";

const sharedProps: Partial<WebViewProps> = {
  setSupportMultipleWindows: true,
  allowsInlineMediaPlayback: true,
  cacheEnabled: true,
  geolocationEnabled: false,
  javaScriptEnabled: true,
  javaScriptCanOpenWindowsAutomatically: true,
  mediaPlaybackRequiresUserAction: false,
  mixedContentMode: "compatibility",
};

const App = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [popupUrl, setPopupUrl] = useState<string | null>(null);

  function handleClick() {
    console.log("handle click");
    setLoading(true);
    fetch("http://localhost:9987/createPaymentIntent")
      .then((res) => res.json())
      .then((res) => {
        setClientSecret(res.client_secret);
      });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {!clientSecret && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.heading}>trustshare React Native example</Text>
            <Button
              disabled={loading}
              title="Create Payment Intent"
              onPress={handleClick}
            ></Button>
          </View>
        )}
        {clientSecret && (
          <View
            style={{
              flex: 1,
              zIndex: 1,
              elevation: 1,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <WebView
              onMessage={(event) => {
                if (event.nativeEvent.data === "trustshare::close_popup") {
                  setPopupUrl(null);
                }
              }}
              onShouldStartLoadWithRequest={(req) => {
                if (req.mainDocumentURL !== req.url) return true;
                if (!req.url.includes(".nope.sh")) {
                  setPopupUrl(req.url);
                  return false;
                }
                return true;
              }}
              source={{
                uri: `https://checkout.nope.sh/process?s=${clientSecret}&st=0`,
              }}
              {...sharedProps}
            />
          </View>
        )}

        {popupUrl && (
          <View
            style={{
              flex: 1,
              zIndex: 2,
              elevation: 2,
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
            }}
          >
            <WebView
              source={{
                uri: popupUrl,
              }}
              {...sharedProps}
            />
          </View>
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
    flexDirection: "column",
  },
});

export default App;
