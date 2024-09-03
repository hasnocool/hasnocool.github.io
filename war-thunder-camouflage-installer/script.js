document.addEventListener('DOMContentLoaded', () => {
    let allowTilt = true;

    // Class Menu.
    class Menu {
        constructor(el) {
            this.DOM = {el: el};
            this.DOM.openCtrl = document.querySelector('.action--menu');
            this.DOM.closeCtrl = document.querySelector('.action--close');
            this.DOM.openCtrl.addEventListener('click', () => this.open());
            this.DOM.closeCtrl.addEventListener('click', () => this.close());

            this.DOM.items = Array.from(this.DOM.el.querySelectorAll('.menu__item'));
            this.itemsTotal = this.DOM.items.length;

            this.DOM.mainLinks = this.DOM.el.querySelectorAll('.mainmenu > a.mainmenu__item');
            this.DOM.sidemenuLinks = this.DOM.el.querySelectorAll('.sidemenu span.sidemenu__item-inner');
            this.DOM.menulink = this.DOM.el.querySelector('.menu__item-link');

            this.addMenuItemListeners();
        }

        addMenuItemListeners() {
            this.DOM.mainLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = link.textContent.toLowerCase();
                    this.handleMenuAction(action);
                });
            });

            this.DOM.sidemenuLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const action = link.textContent.toLowerCase();
                    this.handleMenuAction(action);
                });
            });

            if (this.DOM.menulink) {
                this.DOM.menulink.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleMenuAction('menulink');
                });
            }
        }

        handleMenuAction(action) {
            console.log(`Menu action: ${action}`);
            switch(action) {
                case 'features':
                    showFeatures();
                    break;
                case 'screenshots':
                    showScreenshots();
                    break;
                case 'download':
                    initiateDownload();
                    break;
                case 'about':
                    showAbout();
                    break;
                case 'one-click install':
                    showOneClickInstall();
                    break;
                case 'extensive library':
                    showExtensiveLibrary();
                    break;
                case 'auto-updates':
                    showAutoUpdates();
                    break;
                case 'user-friendly':
                    showUserFriendly();
                    break;
                case 'compatibility check':
                    showCompatibilityCheck();
                    break;
                case 'backup & restore':
                    showBackupRestore();
                    break;
                case 'menulink':
                    handleMenuLink();
                    break;
                default:
                    console.log('Unknown action');
            }
            this.close();
        }
        
        open() {
            this.toggle('open');
        }

        close() {
            this.toggle('close');
        }

        toggle(action) {
            if (this.isAnimating) return;
            allowTilt = action === 'open' ? false : true;
            this.isAnimating = true;
            
            this.DOM.el.classList[action === 'open' ? 'add' : 'remove']('menu--open');
            
            const animationEnd = (pos) => {
                if (pos === this.itemsTotal - 1) {
                    this.isAnimating = false;
                }
            };
            
            this.DOM.items.forEach((el, pos) => {
                const innerEl = el.querySelector('.menu__item-inner');
                
                const config = {};
                const configInner = {};
                const direction = el.dataset.direction;
                
                if (direction === 'bt') {
                    config.y = '101%';
                    configInner.y = '-101%';
                    configInner.x = '0%';
                } else if (direction === 'tb') {
                    config.y = '-101%';
                    configInner.y = '101%';
                    configInner.x = '0%';
                } else if (direction === 'lr') {
                    config.x = '-101%';
                    configInner.x = '101%';
                } else if (direction === 'rl') {
                    config.x = '101%';
                    configInner.x = '-101%';
                } else {
                    config.x = '101%';
                    config.y = '101%';
                    configInner.x = '-101%';
                    configInner.y = '-101%';
                }
                
                if (action === 'open') {
                    gsap.set(el, config);
                    gsap.set(innerEl, configInner);

                    gsap.to([el,innerEl], {
                        duration: 0.9,
                        ease: "power3.inOut",
                        x: '0%',
                        y: '0%',
                        onComplete: () => animationEnd(pos)
                    });
                } else {
                    gsap.to(el, {
                        duration: 0.6,
                        ease: "power3.inOut",
                        x: config.x || 0,
                        y: config.y || 0
                    });
                    gsap.to(innerEl, {
                        duration: 0.6,
                        ease: "power3.inOut",
                        x: configInner.x || 0,
                        y: configInner.y || 0,
                        onComplete: () => animationEnd(pos)
                    });
                }
            });

            gsap.to(this.DOM.closeCtrl, {
                duration: 0.6,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                startAt: action === 'open' ? {rotation: 0} : null,
                opacity: action === 'open' ? 1 : 0,
                rotation: action === 'open' ? 180 : 270
            });
            gsap.to(this.DOM.openCtrl, {
                duration: action === 'open' ? 0.6 : 0.3,
                delay: action === 'open' ? 0 : 0.3,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                opacity: action === 'open' ? 0 : 1
            });

            gsap.to(this.DOM.mainLinks, {
                duration: action === 'open' ? 0.9 : 0.2,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                startAt: action === 'open' ? {y: '50%', opacity: 0} : null,
                y: action === 'open' ? '0%' : '50%',
                opacity: action === 'open' ? 1 : 0,
                stagger: action === 'open' ? 0.1 : -0.1
            });

            gsap.to(this.DOM.sidemenuLinks, {
                duration: action === 'open' ? 0.5 : 0.2,
                ease: action === 'open' ? "power3.inOut" : "power3.in",
                startAt: action === 'open' ? {y: '100%'} : null,
                y: action === 'open' ? '0%' : '100%',
                stagger: action === 'open' ? 0.05 : -0.05
            });

            if (this.DOM.menulink) {
                gsap.to(this.DOM.menulink, {
                    duration: action === 'open' ? 0.9 : 0.6,
                    ease: action === 'open' ? "power3.inOut" : "power3.in",
                    startAt: action === 'open' ? {x: '10%'} : null,
                    x: action === 'open' ? '0%' : '10%'
                });
            }
        }
    }

    class TiltFx {
        constructor() {
            this.DOM = {main: document.querySelector('.background')};
            this.layersTotal = 4;
            this.layout();
            this.initEvents();
        }

        layout() {
            let inner = '';
            for (let i = 0; i < this.layersTotal; ++i) {
                inner += '<div class="background__copy"></div>';
            }
            this.DOM.main.innerHTML = inner;
            this.DOM.layers = Array.from(this.DOM.main.querySelectorAll('.background__copy'));
        }

        initEvents() {
            this.mousemoveFn = ev => requestAnimationFrame(() => this.tilt(ev));
            document.body.addEventListener('mousemove', this.mousemoveFn);
        }

        tilt(ev) {
            if (!allowTilt) return;
            const mousepos = getMousePos(ev);
            const bounds = this.DOM.main.getBoundingClientRect();
            const relmousepos = {
                x : (mousepos.x - bounds.left) / bounds.width,
                y : (mousepos.y - bounds.top) / bounds.height
            };
            this.DOM.layers.forEach((layer, pos) => {
                const totalMovement = (pos + 1) * 30;
                const rotationX = relmousepos.y * 2 - 1;
                const rotationY = relmousepos.x * 2 - 1;
                gsap.to(layer, {
                    duration: 1.2,
                    ease: 'power3.out',
                    x: rotationY * totalMovement,
                    y: rotationX * totalMovement,
                    rotationX: rotationX * 5,
                    rotationY: rotationY * 5,
                    scale: 1 + (pos * 0.05)
                });
            });
        }
    }

    const getMousePos = (ev) => {
        return {
            x : ev.clientX,
            y : ev.clientY
        };
    }

    const menu = new Menu(document.querySelector('nav.menu'));
    const tilt = new TiltFx();

    imagesLoaded(document.querySelector('.background'), {background: true}, () => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });

    function showFeatures() {
        console.log('Showing features');
        // Implement feature showcase logic
    }

    function showScreenshots() {
        console.log('Showing screenshots');
        // Implement screenshot gallery logic
    }

    function initiateDownload() {
        console.log('Initiating download');
        // Implement download logic
    }

    function showAbout() {
        console.log('Showing about information');
        // Implement about section logic
    }

    function showOneClickInstall() {
        console.log('Showing one-click install info');
        // Implement one-click install showcase
    }

    function showExtensiveLibrary() {
        console.log('Showing extensive library');
        // Implement library showcase
    }

    function showAutoUpdates() {
        console.log('Showing auto-updates info');
        // Implement auto-updates info
    }

    function showUserFriendly() {
        console.log('Showing user-friendly features');
        // Implement user-friendly features showcase
    }

    function showCompatibilityCheck() {
        console.log('Showing compatibility check');
        // Implement compatibility check logic
    }

    function showBackupRestore() {
        console.log('Showing backup & restore info');
        // Implement backup & restore info
    }

    function handleMenuLink() {
        console.log('Handling menu link click');
        // Implement menu link action
    }

    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 5000);
});