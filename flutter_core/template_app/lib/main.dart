import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

void main() {
  runApp(const FireXApp());
}

class FireXApp extends StatelessWidget {
  const FireXApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'FireX',
      theme: ThemeData.dark(),
      home: const FireXHome(),
    );
  }
}

class FireXHome extends StatefulWidget {
  const FireXHome({super.key});

  @override
  State<FireXHome> createState() => _FireXHomeState();
}

class _FireXHomeState extends State<FireXHome> {
  late final WebViewController controller;
  bool loading = true;

  @override
  void initState() {
    super.initState();

    controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (_) {
            setState(() => loading = true);
          },
          onPageFinished: (_) {
            setState(() => loading = false);
          },
        ),
      )
      ..loadFlutterAsset('assets/index.html');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF050816),
      body: Stack(
        children: [
          WebViewWidget(controller: controller),

          if (loading)
            Container(
              color: const Color(0xFF050816),
              child: const Center(
                child: CircularProgressIndicator(),
              ),
            ),
        ],
      ),
    );
  }
}
