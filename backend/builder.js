const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const TEMPLATE_PATH = path.join(__dirname, "../flutter_core/template_app");
const ASSETS_PATH = path.join(TEMPLATE_PATH, "assets");
const OUTPUT_APK = path.join(
  TEMPLATE_PATH,
  "build/app/outputs/flutter-apk/app-release.apk"
);

// garante pasta assets
if (!fs.existsSync(ASSETS_PATH)) {
  fs.mkdirSync(ASSETS_PATH, { recursive: true });
}

function saveHTML(html) {
  fs.writeFileSync(path.join(ASSETS_PATH, "index.html"), html);
  console.log("🔥 HTML salvo no template Flutter");
}

function buildAPK() {
  return new Promise((resolve, reject) => {
    console.log("⚡ Iniciando build Flutter...");

    exec(
      `cd ${TEMPLATE_PATH} && flutter build apk --release`,
      (err, stdout, stderr) => {
        if (err) {
          console.log("💀 erro no build:", stderr);
          return reject(err);
        }

        console.log("✅ Build finalizado FireX!");
        resolve(OUTPUT_APK);
      }
    );
  });
}

async function generateAPK(html) {
  try {
    saveHTML(html);

    const apkPath = await buildAPK();

    return apkPath;
  } catch (err) {
    console.log("💀 falhou no FireX builder:", err);
    throw err;
  }
}

module.exports = { generateAPK };