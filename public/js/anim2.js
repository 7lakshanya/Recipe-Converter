var animation = bodymovin.loadAnimation({
  container: document.getElementById('anim2'), // Required
  path: 'https://assets2.lottiefiles.com/packages/lf20_uwfxaf6y.json',
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true
});

for(var i=0;i<document.getElementsByClassName("animation").length;i++){
  document.getElementsByClassName("animation")[i].addEventListener("mouseover",function(event){
  document.getElementsByClassName("animation")[0].children[0].classList.remove("attribute");
  });
  document.getElementsByClassName("attri-link")[i].addEventListener("mouseout",function(event){
    document.getElementsByClassName("animation")[0].children[0].classList.add("attribute");
  });
}
