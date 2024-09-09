const runtimeData = (function () {

    return {

        // Basic information.
        companyName: "TappaniaGames",
        productName: "YCC",
        productVersion: "1.17.13",
        sdkVersion: "3.17.15",
        productDescription: "",

        // File references.
        buildURL: "bin",
        loaderURL: "bin/CC_Web_PlayDeck.loader.js",
        dataURL: "bin/CC_Web_PlayDeck.data.unityweb",
        frameworkURL: "bin/CC_Web_PlayDeck.framework.js.unityweb",
        workerURL: "",
        codeURL: "bin/CC_Web_PlayDeck.wasm.unityweb",
        symbolsURL: "",
        streamingURL: "streaming",

        // Visual information.
        logoType: "None",
        iconTextureName: "256.png",
        backgroundTextureName: "background_1280x720.png",

        // Aspect ratio.
        desktopAspectRatio: -1,
        mobileAspectRatio: -1,

        // Debug mode.
        debugMode: false,

        // Prefs.
        prefsContainerTags: [ "json-data" ],

        // Platform specific scripts.
        wrapperScript: "playdeckWrapper.js",

        // YandexGames.
        yandexGamesSDK: "/sdk.js",

        // Yandex Ads Network.
        yandexGameId: "",
        yandexBannerId: "",
        yandexInterstitialDesktopId: "",
        yandexInterstitialMobileId: "",
        yandexRewardedDesktopId: "",
        yandexRewardedMobileId: "",

        // GameDistribution.
        gameDistributionId: "",
        gameDistributionPrefix: "mirragames_",

    }

})();