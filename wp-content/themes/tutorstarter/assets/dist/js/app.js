!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}({0:function(e,t,n){n("qGtB"),n("jxXz"),n("cWzd"),n("RkYc"),e.exports=n("1P/x")},"1P/x":function(e,t){},Mugk:function(e,t){!function(){var e=document.querySelector(".tutor-signup-form");if(null!==e){e.addEventListener("submit",(function(e){e.preventDefault();var t=new XMLHttpRequest,n=tutorstarter_vars.ajaxurl,r=tutorstarter_vars.authRedirectUrl,o=document.querySelector(".signup-status"),u=new FormData,a=document.querySelector("#fullname").value,i=document.querySelector("#email").value,c=document.querySelector("#password").value,l=document.querySelector("#confirm-password").value,s=document.querySelector("#signup-nonce").value;u.append("username",a),u.append("email",i),u.append("password",c),u.append("confirm_password",l),u.append("action","ajaxregister"),u.append("signupNonce",s),t.open("POST",n),t.onreadystatechange=function(){if(4===this.readyState&&200===this.status){var e=JSON.parse(this.responseText);o.style.visibility="visible",1==e.loggedin?(o.style.color="#4285F4",o.innerText=e.message,window.location.replace(r)):(o.style.color="#dc3545",o.innerText=e.message)}},t.send(u)}))}}()},RkYc:function(e,t){},cWzd:function(e,t){},jxXz:function(e,t){},qGtB:function(e,t,n){"use strict";n.r(t);n("vr5C"),n("Mugk"),n("wcBj")},vr5C:function(e,t){function n(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}!function(){var e=document.querySelector(".navbar-toggler"),t=document.querySelector(".navbar-nav"),r=document.querySelector(".btn-nav-close"),o=document.querySelector(".search-field-popup .close-btn"),u=window.matchMedia("(max-width: 991px)"),a=n(document.querySelectorAll("#menu-all-pages li"));a=a[a.length-1],null!==e&&e.addEventListener("click",(function(){t.classList.add("active")})),null!==r&&r.addEventListener("click",(function(){t.classList.remove("active")}));var i=document.querySelectorAll(".menu-item");null!==i&&i.forEach((function(e){null!==e.querySelector(".sub-menu")&&e.classList.add("icon")})),window.addEventListener("scroll",(function(){var e=document.querySelector(".header-sticky");null!==e&&e.classList.toggle("sticky-on",window.scrollY>200)}));var c=document.querySelector(".navbar-utils .btn-search"),l=document.querySelector(".search-field-popup");null!==c&&c.addEventListener("click",(function(){null!==l&&l.classList.toggle("show")})),null!==o&&o.addEventListener("click",(function(e){e.preventDefault(),l.classList.remove("show")}));var s=document.querySelector(".navbar-toggler");function d(e){e.preventDefault(),r.focus()}window.addEventListener("resize",(function(){u.matches?s.addEventListener("click",(function(e){a.addEventListener("keydown",d,!1),r.addEventListener("click",(function(){document.querySelector("header + div a").focus()}))})):a.removeEventListener("keydown",d,!1)}))}()},wcBj:function(e,t){!function(){var e=document.querySelector(".tutor-signin-form");if(null!==e){e.addEventListener("submit",(function(e){e.preventDefault();var t=new XMLHttpRequest,n=tutorstarter_vars.ajaxurl,r=tutorstarter_vars.authRedirectUrl,o=document.querySelector(".signup-status"),u=new FormData,a=document.querySelector("#login_email").value,i=document.querySelector("#login_password").value,c=document.querySelector("#signin-nonce").value;u.append("email",a),u.append("password",i),u.append("action","ajaxlogin"),u.append("signinNonce",c),t.open("POST",n),t.onreadystatechange=function(){if(4===this.readyState&&200===this.status){var e=JSON.parse(this.responseText);o.style.visibility="visible",1==e.loggedin?(o.style.color="#4285F4",o.innerText=e.message,window.location.replace(r)):(o.style.color="#dc3545",o.innerText=e.message)}},t.send(u)}))}}()}});