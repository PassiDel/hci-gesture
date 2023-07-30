import{w as we,a as fe,b as ye,c as Ee,d as x,h as be,G as ve}from"./vendor-beb33912.js";(async()=>{(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();const K="/hci-gesture/assets/gesture_recognizer-a8aa4ac1.task";function Q(t,e,n){return t<e?e:t>n?n:t}function C(t,e,n,o,r){const i=(t-e)*(r-o)/(n-e)+o;return Q(i,o,r)}let Y=!1;async function Z(){return Y}async function X(){return await Z()?{wasmLoaderPath:we,wasmBinaryPath:fe}:{wasmLoaderPath:ye,wasmBinaryPath:Ee}}const ee=window.drawConnectors||x.drawConnectors,te=window.drawLandmarks||x.drawLandmarks,T=window.drawRectangle||x.drawRectangle,ne=window.HAND_CONNECTIONS||be.HAND_CONNECTIONS;let w="none",g={x:0,y:0},l="none";function oe(t){l=t}function re(t,e){g={x:t,y:e},ie(),se()}function ie(){const t=l!==w;let e;const n=document.elementsFromPoint(g.x,g.y);n.length>1&&n[1]instanceof HTMLButtonElement&&(e=n[1]);const o={...g,target:e};t&&(document.dispatchEvent(new CustomEvent(`hand:${w}`,{detail:{...o,type:w,state:!1,new:!1}})),document.dispatchEvent(new CustomEvent(`hand:${l}`,{detail:{...o,type:l,state:!0,new:!0}}))),document.dispatchEvent(new CustomEvent("hand",{detail:{...o,type:l,state:!0,new:t}}))}function se(){({...g},w=l)}["paper","none","rock","scissors"].forEach(t=>document.addEventListener(`hand:${t}`,e=>{const n=e.detail;n.state&&console.log(t,n)}));const ce=document.getElementsByClassName("draggable");for(let t of ce)t.draggable=!0,t.addEventListener("dragend",e=>{t.style.top=`${e.y}px`,t.style.left=`${e.x}px`});document.addEventListener("hand:rock",t=>{const{target:e,state:n,new:o}=t.detail;!e||!n||!o||!e.classList.contains("clickable")||(e.click(),e.style.backgroundColor="green",setTimeout(()=>{e.style.backgroundColor=""},100))});let p=null;document.addEventListener("hand:rock",t=>{const{state:e,target:n}=t.detail;e&&n&&n.classList.contains("draggable")&&(p=n)}),document.addEventListener("hand",t=>{const{x:e,y:n,type:o}=t.detail;p&&(p.style.top=`${n}px`,p.style.left=`${e}px`,o==="none"&&(p=null))});const ae=document.getElementById("numpad"),de=document.getElementById("quest"),le=document.getElementById("entered"),b=document.getElementById("start"),ue=document.getElementById("print"),me=5;let v=!1,O=0;const u=[],s=[],m=[],B=[],N=new Array(9).fill(0).map((t,e)=>{const n=document.createElement("button");return n.classList.add("clickable"),n.innerText=`${e+1}`,n.disabled=!0,n.addEventListener("click",()=>{s.push(e+1),console.error("clicked",e+1),f()}),ae.appendChild(n),n});function I(){const t=m.reduce((o,r)=>o+(r.correct?1:0),0)/m.length;console.log("Done",t,JSON.stringify(m,void 0,2));const e=m.splice(0),n=e.reduce((o,r)=>o+r.duration,0);B.push({hand:window.prediction,history:e,total:n,per:n/e.length,now:Date.now()}),b.innerText="Start",u.splice(0),s.splice(0),v=!1,N.forEach(o=>o.disabled=!0),f()}function $(){if(m.length>=me){I();return}v=!0,N.forEach(t=>t.disabled=!1),b.innerText="Stop",O=Date.now(),u.splice(0),s.splice(0),u.push(...new Array(4).fill(0).map(()=>Math.floor(Math.random()*9)+1)),f()}function D(t,e){const n=[...t.map(r=>r.toString()),...new Array(4-t.length).fill("_")];e.innerHTML="";const o=n.map(r=>{const i=document.createElement("p");return i.innerText=r,i});return e.append(...o),o}function f(){if(s.length>4){const e=s.pop();s.splice(0),s.push(e)}D(u,de);const t=D(s,le);if(s.length===4){let e=!0;t.forEach((o,r)=>{const i=s[r]===u[r];o.style.color=i?"green":"red",i||(e=!1)});const n={correct:e,entered:s.join(""),quest:u.join(""),duration:Date.now()-O};console.log(n),m.push(n),setTimeout($,1e3)}}b.addEventListener("click",()=>{v?I():$()}),ue.addEventListener("click",()=>{const t=document.createElement("a");t.download="result_"+Date.now()+".json",t.href=URL.createObjectURL(new Blob([JSON.stringify(B,null,2)])),t.click()}),f();const he=[0,5,9,13,17],M=await X(),P=await ve.createFromOptions(M,{baseOptions:{modelAssetPath:K,delegate:"GPU"},numHands:1,runningMode:"VIDEO"});console.log(M,P);const A=document.getElementById("enable-video"),c=document.getElementById("video"),d=document.getElementById("output_canvas"),y=document.getElementById("result"),h=document.getElementById("marker"),a=d.getContext("2d");window.prediction=!1,A.addEventListener("click",()=>{if(window.prediction=!window.prediction,A.innerText=window.prediction?"Disable Video":"Enable Video",!window.prediction){setTimeout(()=>{c.pause(),c.srcObject.getTracks()[0].stop(),c.srcObject=null,S()},100);return}const t={video:!0};navigator.mediaDevices.getUserMedia(t).then(function(e){c.srcObject=e,console.log(e,e.getVideoTracks()),c.addEventListener("loadeddata",j)})});function F(t){switch(t){case"rock":return"red";case"paper":return"green";case"scissors":return"blue";default:return"white"}}function S(){a.save(),a.clearRect(0,0,d.width,d.height),a.restore(),y.innerText="none",y.style.color="white",h.style.visibility="hidden",h.style.backgroundColor="white"}async function j(){const t=Date.now();let e={landmarks:[],worldLandmarks:[],handednesses:[],gestures:[]},n=-1;function o(){if(c.currentTime===n)return;if(n=c.currentTime,e=P.recognizeForVideo(c,t),e.gestures.length<=0){S();return}h.style.visibility="visible";const r=e.gestures[0][0].categoryName||"none";if(y.style.color=F(r),y.innerText=r,h.style.backgroundColor=F(r),d.style.height=`${c.clientHeight}px`,d.style.width=`${c.clientWidth}px`,a.save(),a.clearRect(0,0,d.width,d.height),e.landmarks){const i=e.landmarks[0];ee(a,i,ne,{color:"#00FF00",lineWidth:5}),te(a,i,{color:"#FF0000",lineWidth:2});const H=i.filter((E,pe)=>he.includes(pe)),R=H.map(E=>E.x),_=H.map(E=>E.y),[k,V]=[Math.min(...R),Math.max(...R)],[L,q]=[Math.min(..._),Math.max(..._)],U=(V-k)/2+k,W=(q-L)/2+L,z=(1-C(U,.1,.9,0,1))*window.innerWidth;h.style.left=`${z}px`;const G=C(W,.1,.9,0,1)*window.innerHeight;h.style.top=`${G}px`,re(z,G);const J={xCenter:U,yCenter:W,height:q-L,width:V-k,rotation:0},ge={...J,height:.1,width:.1};T(a,J,{fillColor:"#00000000",color:"#f00"}),T(a,ge,{fillColor:"#0000ff",color:"#00000000"})}oe(r),a.restore()}o(),window.prediction&&window.requestAnimationFrame(j)}})();