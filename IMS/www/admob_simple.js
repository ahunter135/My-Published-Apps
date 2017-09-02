var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) {
  admobid = { // for Android
    banner: 'ca-app-pub-6169385283820064/9212840698',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewardvideo: 'ca-app-pub-3940256099942544/5224354917',
  };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
  admobid = { // for iOS
    banner: 'ca-app-pub-6169385283820064/9212840698',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
    rewardvideo: 'ca-app-pub-3940256099942544/1712485313',
  };
} else {
  admobid = { // for Windows Phone
    banner: 'ca-app-pub-6169385283820064/9212840698',
    interstitial: 'ca-app-pub-6869992474017983/1355127956',
    rewardvideo: '',
  };
}
function initApp() {
  if (! AdMob ) { alert( 'admob plugin not ready' ); return; } else {
    if (window.localStorage.getItem("upgr") == false) {
    // this will create a banner on startup
    AdMob.createBanner( {
      adId: admobid.banner,
      position: AdMob.AD_POSITION.BOTTOM_CENTER,
      overlap: false,
      offsetTopBar: false,
      bgColor: 'black'
    } );
  }
  }
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}
