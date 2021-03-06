/* global NexT, CONFIG, Velocity */

document.addEventListener('DOMContentLoaded', () => {

  var isRight = CONFIG.sidebar.position === 'right';
  var SIDEBAR_WIDTH = CONFIG.sidebar.width || 320;
  var SIDEBAR_DISPLAY_DURATION = 200;
  var mousePos = {};

  var sidebarToggleLines = {
    lines: document.querySelector('.sidebar-toggle'),
    init : function() {
      this.lines.classList.remove('toggle-arrow', 'toggle-close');
    },
    arrow: function() {
      this.lines.classList.remove('toggle-close');
      this.lines.classList.add('toggle-arrow');
    },
    close: function() {
      this.lines.classList.remove('toggle-arrow');
      this.lines.classList.add('toggle-close');
    }
  };

  var sidebarToggleMotion = {
    sidebarEl       : document.querySelector('.sidebar'),
    isSidebarVisible: false,
    init            : function() {
      sidebarToggleLines.init();

      window.addEventListener('mousedown', this.mousedownHandler.bind(this));
      window.addEventListener('mouseup', this.mouseupHandler.bind(this));
      document.querySelector('#sidebar-dimmer').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('click', this.clickHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('mouseenter', this.mouseEnterHandler.bind(this));
      document.querySelector('.sidebar-toggle').addEventListener('mouseleave', this.mouseLeaveHandler.bind(this));
      window.addEventListener('sidebar:show', this.showSidebar.bind(this));
      window.addEventListener('sidebar:hide', this.hideSidebar.bind(this));
    },
    mousedownHandler: function(event) {
      mousePos.X = event.pageX;
      mousePos.Y = event.pageY;
    },
    mouseupHandler: function(event) {
      var deltaX = event.pageX - mousePos.X;
      var deltaY = event.pageY - mousePos.Y;
      var clickingBlankPart = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) < 20 && event.target.matches('.main');
      if (this.isSidebarVisible && (clickingBlankPart || event.target.matches('img.medium-zoom-image, .fancybox img'))) {
        this.hideSidebar();
      }
    },
    clickHandler: function() {
      this.isSidebarVisible ? this.hideSidebar() : this.showSidebar();
    },
    mouseEnterHandler: function() {
      if (!this.isSidebarVisible) {
        sidebarToggleLines.arrow();
      }
    },
    mouseLeaveHandler: function() {
      if (!this.isSidebarVisible) {
        sidebarToggleLines.init();
      }
    },
    showSidebar: function() {
      this.isSidebarVisible = true;
      this.sidebarEl.classList.add('sidebar-active');
      if (typeof Velocity === 'function') {
        Velocity(document.querySelectorAll('.sidebar .motion-element'), isRight ? 'transition.slideRightIn' : 'transition.slideLeftIn', {
          stagger: 50,
          drag   : true
        });
      }

      sidebarToggleLines.close();
      NexT.utils.isDesktop() && window.anime(Object.assign({
        targets : document.body,
        duration: SIDEBAR_DISPLAY_DURATION,
        easing  : 'linear'
      }, isRight ? {
        'padding-right': SIDEBAR_WIDTH
      } : {
        'padding-left': SIDEBAR_WIDTH
      }));
    },
    hideSidebar: function() {
      this.isSidebarVisible = false;
      this.sidebarEl.classList.remove('sidebar-active');

      sidebarToggleLines.init();
      NexT.utils.isDesktop() && window.anime(Object.assign({
        targets : document.body,
        duration: SIDEBAR_DISPLAY_DURATION,
        easing  : 'linear'
      }, isRight ? {
        'padding-right': 0
      } : {
        'padding-left': 0
      }));
    }
  };
  sidebarToggleMotion.init();

  function updateFooterPosition() {
    var footer = document.querySelector('.footer');
    var containerHeight = document.querySelector('.header').offsetHeight + document.querySelector('.main').offsetHeight + footer.offsetHeight;
    footer.classList.toggle('footer-fixed', containerHeight <= window.innerHeight);
  }

  updateFooterPosition();
  window.addEventListener('resize', updateFooterPosition);
  window.addEventListener('scroll', updateFooterPosition);
});


 function getLongDate() {
      var time = "2020-08-23 03:26:00";
      time = time.replace(/-/g,':').replace(' ',':');
      time = time.split(':');
      var beginTime = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
    //let beginTime = new Date("2020,08,23,03,26,00");
    console.log("==========beginTime="+beginTime)
    let timeSecond = new Date().getTime() - beginTime.getTime();
    let str = secondsFormat(Math.floor(timeSecond / 1000));
    document.getElementById("nowTime").innerHTML = str;
    setTimeout(getLongDate, 1000);
  }
  function secondsFormat(s) {
    var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
    var hour = Math.floor((s - day * 24 * 3600) / 3600);
    var minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
    var second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
    return `鞠昕玥小朋友下凡已经${day}天${hour < 10 ? "0" + hour : hour}小时${
      minute < 10 ? "0" + minute : minute
    }分${second < 10 ? "0" + second : second}秒`;
  }
  getLongDate();
