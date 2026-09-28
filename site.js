// Stacknity.ai - shared site behaviour
(function(){
  // nav scroll state
  var nav=document.getElementById('nav');
  if(nav){window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>40);},{passive:true});}

  // mobile menu
  var toggle=document.getElementById('nav-toggle'),menu=document.getElementById('mobile-menu');
  if(toggle&&menu){
    toggle.addEventListener('click',function(){
      var open=menu.classList.toggle('open');
      toggle.classList.toggle('open',open);
      document.body.style.overflow=open?'hidden':'';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){menu.classList.remove('open');toggle.classList.remove('open');document.body.style.overflow='';});
    });
  }

  // reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // duplicate marquee for seamless loop
  var mq=document.getElementById('marquee');
  if(mq){mq.innerHTML+=mq.innerHTML;}

  // neural network canvas (home hero)
  var c=document.getElementById('net');
  if(c){
    var x=c.getContext('2d'),W,H,P=[],mouse={x:-9999,y:-9999};
    function size(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;spawn();}
    function spawn(){
      P=[];
      var N=window.innerWidth<700?45:Math.min(140,Math.round(W*H/16000));
      for(var i=0;i<N;i++){P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.7+.7});}
    }
    size();window.addEventListener('resize',size);
    var hero=document.querySelector('.hero');
    if(hero){
      hero.addEventListener('mousemove',function(e){var b=c.getBoundingClientRect();mouse.x=e.clientX-b.left;mouse.y=e.clientY-b.top;});
      hero.addEventListener('mouseleave',function(){mouse.x=-9999;mouse.y=-9999;});
    }
    function tick(){
      x.clearRect(0,0,W,H);
      for(var i=0;i<P.length;i++){
        var p=P[i];
        p.x+=p.vx;p.y+=p.vy;
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
        var dx=p.x-mouse.x,dy=p.y-mouse.y,dm=Math.sqrt(dx*dx+dy*dy);
        if(dm<130&&dm>0.01){p.x+=dx/dm;p.y+=dy/dm;}
      }
      for(var i=0;i<P.length;i++){
        for(var j=i+1;j<P.length;j++){
          var dx=P[i].x-P[j].x,dy=P[i].y-P[j].y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<160){x.strokeStyle='rgba(140,255,192,'+(0.16*(1-d/160))+')';x.lineWidth=1;x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke();}
        }
      }
      for(var i=0;i<P.length;i++){var p=P[i];x.fillStyle='rgba(140,255,192,.55)';x.beginPath();x.arc(p.x,p.y,p.r,0,6.2832);x.fill();}
      requestAnimationFrame(tick);
    }
    tick();

    // hero parallax on mascot
    var visual=document.getElementById('hero-visual'),mascot=document.getElementById('mascot');
    if(visual&&mascot&&hero){
      hero.addEventListener('mousemove',function(e){
        var cx=(e.clientX/window.innerWidth-.5),cy=(e.clientY/window.innerHeight-.5);
        mascot.style.transform='translate('+(cx*22)+'px,'+(cy*18)+'px)';
      });
    }
  }

  // 3D tilt on service cards
  document.querySelectorAll('.svc').forEach(function(card){
    card.addEventListener('mousemove',function(e){
      var b=card.getBoundingClientRect();
      var rx=((e.clientY-b.top)/b.height-.5)*-7,ry=((e.clientX-b.left)/b.width-.5)*9;
      card.style.transform='perspective(900px) rotateX('+rx+'deg) rotateY('+ry+'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave',function(){card.style.transform='perspective(900px) rotateX(0deg) rotateY(0deg)';});
  });

  // contact form -> mailto compose
  var cf=document.getElementById('contact-form');
  if(cf){
    cf.addEventListener('submit',function(e){
      e.preventDefault();
      var name=document.getElementById('cf-name').value.trim();
      var company=document.getElementById('cf-company').value.trim();
      var email=document.getElementById('cf-email').value.trim();
      var msg=document.getElementById('cf-msg').value.trim();
      var subject='Website enquiry from '+name+(company?' ('+company+')':'');
      var body='Name: '+name+'\nCompany: '+(company||'-')+'\nEmail: '+email+'\n\nThe problem slowing our team down:\n'+msg;
      window.location.href='mailto:stacknity.technologies@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
    });
  }
})();
