var animation = bodymovin.loadAnimation({
  container: document.getElementById('anim'), // Required
  path: 'https://assets6.lottiefiles.com/packages/lf20_ofl7t7o5.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true
});

setTimeout(function () {
     // after 2 seconds
     window.location = "/result";
  }, 4000)
