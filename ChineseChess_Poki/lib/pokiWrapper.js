class PokiWrapper {

    constructor(readyCallback) {
        // Advertisement fields.
        this.interstitialVisible = false;
        this.rewardedVisible = false;
        // Wrapper initialization.
        console.log("Wrapper initialization started.");
        try {
            let script = document.createElement("script");
            script.src = "https://game-cdn.poki.com/scripts/v2/poki-sdk.js";
            script.onload = () => {
                PokiSDK.init().then(() => {
                    console.log("Wrapper initialization completed.");
                    readyCallback();
                });
            };
            document.body.appendChild(script);
        }
        catch (exception) {
            console.error("Wrapper initialization failed.", exception);
            readyCallback();
        }
    }

    // Interstitial advertisement methods.

    isInterstitialVisible() {
        return this.interstitialVisible;
    }

    invokeInterstitial() {
        // Pause your game here if it isn't already.
        PokiSDK.commercialBreak(() => {
            console.log("Commercial break started, pausing game.");
            // You can pause any background music or other audio here.
            application.publishEvent("OnInterstitialEvent", "Begin");
            this.interstitialVisible = true;
        }).then(() => {
            // If the audio was paused you can resume it here (keep in mind that the
            // function above to pause it might not always get called).
            console.log("Commercial break finished, proceeding to game.");
            // Continue your game here.
            application.publishEvent("OnInterstitialEvent", "Close");
            this.interstitialVisible = false;
        });
    }

    // Rewarded advertisement methods.

    isRewardedVisible() {
        return this.rewardedVisible;
    }

    invokeRewarded() {
        // Pause your game here if it isn't already.
        PokiSDK.rewardedBreak(() => {
            console.log("Rewarded break started, pausing game.");
            // You can pause any background music or other audio here.
            application.publishEvent("OnRewardedEvent", "Begin");
            this.rewardedVisible = true;
        }).then((success) => {
            if (success) {
                // Video was displayed, give reward.
                application.publishEvent("OnRewardedEvent", "Success");
            }
            // If the audio was paused you can resume it here (keep in mind that the
            // function above to pause it might not always get called).
            console.log("Rewarded break finished, proceeding to game.");
            // Continue your game here.
            application.publishEvent("OnRewardedEvent", "Close");
            this.rewardedVisible = false;
        });
    }

    // Analytics methods.

    gameIsReady() {
        PokiSDK.gameLoadingFinished();
    }

    gameplayStart() {
        PokiSDK.gameplayStart();
    }

    gameplayStop() {
        PokiSDK.gameplayStop();
    }

}

export function initialize(readyCallback) {
    if (typeof window !== 'undefined') {
        window.pokiWrapper = new PokiWrapper(readyCallback);
    }
}