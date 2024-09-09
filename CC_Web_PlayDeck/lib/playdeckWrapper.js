class PlaydeckWrapper {

	constructor(readyCallback) {
		this.wrapperSDK = null;
		this.readyCallback = readyCallback;
		// Advertisement fields.
		this.bannerVisible = false;
		this.interstitialVisible = false;
		this.rewardedVisible = false;
		// Payments fields.
		this.wrapperPayments = null;
		this.cacheProductsData = "";
		this.cachePaymentsData = "";
		// Prefs fields.
		this.jsonContainers = runtimeData.prefsContainerTags;
		this.cacheContainers = {};
		// Wrapper initialization.
		console.log("Wrapper initialization started.");
		try {
			const { parent } = window;
			// Creating an event listener playdeck.
			window.addEventListener('message', ({ data }) => {
				if (!message || !data['playdeck']) return;
				pdData = data['playdeck'];
				// By default, playdeck sends "{ playdeck: { method: "play" }}" 
				// after pressing the play button in the playdeck - menu.
				if (pdData.method === 'play') {
					if (runner.crashed && runner.gameOverPanel) {
						runner.restart();
					} else {
						var e = new KeyboardEvent('keydown', { keyCode: 32, which: 32 });
						document.dispatchEvent(e);
					}
				}
				// Getting the playdeck-menu status, after using the getPlaydeckState method.
				if (pdData.method === 'isOpen') {
					window.playdeckIsOpen = data.value;
				}
				this.onAdsEvent(data);
				this.onProfileEvent(data);
				this.onPrefsEvent(data);
			});
			// Start initialization after prefs callback.
			this.initialPrefsResolve = true;
			resolveSaves();
		}
		catch (exception) {
			// Initiate application loading anyway.
			console.error("Wrapper initialization failed.", exception);
			readyCallback();
		}
	}

	// Event handlers.

	onAdsEvent(data) {
		const playdeck = data?.playdeck;
		if (!playdeck) return;
		// Playdeck event callbacks.
		if (playdeck.method === 'rewardedAd') {
			// User has watched ad.
			console.log(playdeck.value);
			this.rewardedVisible = false;
			application.publishEvent("OnRewardedEvent", "Close");
			application.publishEvent("OnRewardedEvent", "Success");
		}
		if (playdeck.method === 'errAd') {
			// Something went wrong at advert provider.
			console.log(playdeck.value);
			this.rewardedVisible = false;
			application.publishEvent("OnRewardedEvent", "Error");
		}
		if (playdeck.method === 'skipAd') {
			// User skipped the ad.
			console.log(playdeck.value);
			this.rewardedVisible = false;
			application.publishEvent("OnRewardedEvent", "Close");
		}
		if (playdeck.method === 'notFoundAd') {
			// Advert provider doesn't return any ad.
			console.log(playdeck.value);
			this.rewardedVisible = false;
			application.publishEvent("OnRewardedEvent", "Error");
		}
		if (playdeck.method === 'startAd') {
			// User started watching ad.
			console.log(playdeck.value);
			this.isRewardedVisible = true;
			application.publishEvent("OnRewardedEvent", "Begin");
		}
	}

	onProfileEvent(data) {
		const playdeck = data?.playdeck;
		if (!playdeck) return;
		// Playdeck event callbacks.
		if (playdeck.method === 'getUserProfile') {
			// Profile.
			let profile = playdeck.value;

		}
	}

	onPrefsEvent(data) {
		const playdeck = data?.playdeck;
		if (!playdeck) return;
		// Playdeck event callbacks.
		if (playdeck.method === 'getData') {
			this.jsonContainers[playdeck.key] = playdeck.value;
			console.log(`Container ${playdeck.key} resolving success.`);
			// Start game loading after resolving the saves.
			if (this.initialPrefsResolve == true) {
				this.readyCallback();
				this.initialPrefsResolve = false;
			}
			application.publishEvent("OnResolveSaves", "Success");
		}
	}

	// Advertisement support.
	
	isBannerVisible() {
		return this.bannerVisible;
	}

	invokeBanner() { }

	disableBanner() { }

	isInterstitialVisible() {
		return this.interstitialVisible;
	}

	invokeInterstitial() { }

	isRewardedVisible() {
        return this.rewardedVisible;
    }
	
	invokeRewarded() {
		console.log("Invoke rewarded called.");
		try {
			parent.postMessage({ playdeck: { method: "showAd" } }, '*');
		}
		catch (exception) {
			console.error("Invoke rewarded failed.", exception);
			application.publishEvent("OnRewardedEvent", "Error");
		}
	}

	// Prefs support.

	resolveSaves() {
		console.log("Resolve saves called.");
		try {
			for (let x = 0; x < this.jsonContainers.length; x++) {
				parent.postMessage({
					playdeck: {
						method: 'getData',
						key: this.jsonContainers[x]
					},
				}, '*');
			}
		}
		catch (exception) {
			console.error("Saves resolving failed.", exception);
			application.publishEvent("OnResolveSaves", "Error");
		}
	}

	writeSaves() {
		console.log("Write saves called.");
		try {
			for (let x = 0; x < this.jsonContainers.length; x++) {
				parent.postMessage({
					playdeck: {
						method: "setData", key: this.jsonContainers[x],
						value: this.cacheContainers[this.jsonContainers[x]]
					}
				}, '*');
			}
			console.log("Saves written successfully.");
			application.publishEvent("OnWriteSaves", "Success");
		}
		catch (exception) {
			console.error("Write saves failed.", exception);
			application.publishEvent("OnWriteSaves", "Error");
		}
	}

	resolveCacheSaves(containerTag) {
		console.log("Resolve cache saves called.");
		let containerJSON = this.cacheContainers[containerTag];
		if (containerJSON == null) {
			return "Empty";
		}
		return containerJSON;
	}

	writeCacheSaves(containerTag, json) {
		console.log("Write cache saves called.");
		try {
			this.cacheContainers[containerTag] = json;
			console.log("Cache saves written successfully.");
		}
		catch (exception) {
			console.error("Cache saves write failed.", exception);
		}
	}

	// Analytics support.

	gameIsReady() {
		parent.postMessage({ playdeck: { method: 'loading', value: 100 } }, '*');
	}

}

export function initialize(readyCallback) {
	if (typeof window !== 'undefined') {
		window.playdeckWrapper = new PlaydeckWrapper(readyCallback);
	}
}