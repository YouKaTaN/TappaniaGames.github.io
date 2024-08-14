const runtimeData = (function () {

    return {

        // Basic information.
        companyName: "TappaniaGames",
        productName: "YCC",
        productVersion: "1.17.3",
        sdkVersion: "3.17.8",
        productDescription: "",

        // File references.
        buildURL: "bin",
        loaderURL: "bin/ChineseChess_Web_VKontakte.loader.js",
        dataURL: "bin/ChineseChess_Web_VKontakte.data.unityweb",
        frameworkURL: "bin/ChineseChess_Web_VKontakte.framework.js.unityweb",
        workerURL: "",
        codeURL: "bin/ChineseChess_Web_VKontakte.wasm.unityweb",
        symbolsURL: "",
        streamingURL: "streaming",

        // Visual information.
        logoType: "None",
        iconTextureName: "256.png",
        backgroundTextureName: "background_1280x720.png",

        // Aspect ratio.
        desktopAspectRatio: 1.666667,
        mobileAspectRatio: 0.562,

        // Debug mode.
        debugMode: false,

        // Platform specific scripts.
        wrapperScript: "vkontakteWrapper.js",

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