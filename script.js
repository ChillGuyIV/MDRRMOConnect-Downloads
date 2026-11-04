const API_URL =
    "https://api.github.com/repos/ChillGuyIV/MDRRMOConnect-Downloads/releases/latest";

const installButton = document.getElementById("installButton");
const installText = document.getElementById("installText");
const versionElement = document.getElementById("version");
const messageElement = document.getElementById("downloadMessage");

async function loadLatestRelease() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Accept: "application/vnd.github+json"
            },
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Unable to retrieve the latest release.");
        }

        const release = await response.json();

        const apk = release.assets.find(asset =>
            asset.name.toLowerCase().endsWith(".apk")
        );

        if (!apk) {
            throw new Error("No APK file was found in the latest release.");
        }

        versionElement.textContent =
            "Version " + release.tag_name;

        installButton.href = apk.browser_download_url;
        installButton.classList.remove("disabled");
        installButton.removeAttribute("aria-disabled");

        installButton.setAttribute(
            "download",
            apk.name
        );

        installText.textContent = "INSTALL NOW";

        messageElement.textContent =
            "Latest APK available • " +
            (apk.size / (1024 * 1024)).toFixed(1) +
            " MB";

    } catch (error) {
        console.error(error);

        versionElement.textContent = "Download unavailable";
        installText.textContent = "DOWNLOAD UNAVAILABLE";

        messageElement.textContent =
            "The APK could not be loaded. Please try again later.";

        installButton.classList.add("disabled");
        installButton.setAttribute("aria-disabled", "true");
        installButton.removeAttribute("href");
    }
}

loadLatestRelease();
